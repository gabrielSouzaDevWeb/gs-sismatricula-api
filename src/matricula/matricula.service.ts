import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
  Scope,
} from '@nestjs/common';
import { EstudanteService } from 'src/estudante/estudante.service';
import { StatusMatricula } from 'src/shared/enum/status-matricula.enum';
import { DataSource, Raw, Repository } from 'typeorm';
import {
  CreateMatriculaWithRelationsDto,
  MatriculaQueryDto,
  UpdateMatriculaDto,
} from '../shared/dtos';
import {
  Estudante,
  EstudanteFiliacao,
  Mensalidade,
} from '../shared/infrastructure/entities';
import { Matricula } from '../shared/infrastructure/entities/matricula.entity';
import { TENANT_CONNECTION_DATABASE_PROVIDER } from '../shared/infrastructure/tenant';
import { ServiceResponse } from '../shared/utils';
import { FiliacaoService } from './../filiacao/filiacao.service';
import { Filiacao } from './../shared/infrastructure/entities/filiacao.entity';

@Injectable({ scope: Scope.REQUEST })
export class MatriculaService {
  private readonly repository: Repository<Matricula>;

  constructor(
    @Inject(TENANT_CONNECTION_DATABASE_PROVIDER)
    private readonly dataSource: DataSource,
    private readonly estudanteService: EstudanteService,
    private readonly filiacaoService: FiliacaoService,
  ) {
    this.repository = this.dataSource.getRepository(Matricula);
  }

  private validarConfiguracaoMensalidade(params: {
    mesInicio: number;
    mesFim: number;
    diaVencimento: number;
    quantidadeMensalidades: number;
  }) {
    const { mesInicio, mesFim, diaVencimento, quantidadeMensalidades } = params;

    if (mesInicio < 1 || mesInicio > 12 || mesFim < 1 || mesFim > 12) {
      throw new BadRequestException(
        'O mês de início e fim da mensalidade devem estar entre 1 e 12',
      );
    }
    if (mesFim < mesInicio) {
      throw new BadRequestException(
        'O mês de fim da mensalidade não pode ser anterior ao mês de início',
      );
    }
    if (diaVencimento < 1 || diaVencimento > 31) {
      throw new BadRequestException(
        'O dia de vencimento deve estar entre 1 e 31',
      );
    }

    const quantidadeCalculada = mesFim - mesInicio + 1;
    if (quantidadeMensalidades !== quantidadeCalculada) {
      throw new BadRequestException(
        'A quantidade de mensalidades não corresponde ao período informado',
      );
    }
  }

  private criarMensalidades(params: {
    idMatricula: number;
    anoLetivo: number;
    valorMensalidade: number;
    mesInicio: number;
    mesFim: number;
    diaVencimento: number;
  }): Array<Partial<Mensalidade>> {
    const {
      idMatricula,
      anoLetivo,
      valorMensalidade,
      mesInicio,
      mesFim,
      diaVencimento,
    } = params;

    const mensalidades: Array<Partial<Mensalidade>> = [];
    for (let mes = mesInicio; mes <= mesFim; mes += 1) {
      const ultimoDiaDoMes = new Date(anoLetivo, mes, 0).getDate();
      const diaAjustado = Math.min(diaVencimento, ultimoDiaDoMes);
      const dataVencimento = new Date(anoLetivo, mes - 1, diaAjustado);

      mensalidades.push({
        idMatricula,
        anoLetivo,
        valorMensalidade,
        mesMensalidade: mes,
        dataVencimento,
      });
    }

    return mensalidades;
  }

  async create(
    data: CreateMatriculaWithRelationsDto,
  ): Promise<ServiceResponse<Matricula | null>> {
    const result = await this.dataSource.transaction(async (manager) => {
      const estudanteRepo = manager.getRepository(Estudante);
      const filiacaoRepo = manager.getRepository(Filiacao);
      const matriculaRepo = manager.getRepository(Matricula);
      const mensalidadeRepo = manager.getRepository(Mensalidade);

      // Validar que existe exatamente 1 responsável pelo pagamento
      const responsaveis = data.filiacoes.filter(
        (f) => f.isResponsavelPagamento === true,
      );
      if (responsaveis.length === 0) {
        throw new BadRequestException(
          'É necessário marcar uma filiação como responsável pelo pagamento',
        );
      }
      if (responsaveis.length > 1) {
        throw new BadRequestException(
          'Apenas uma filiação pode ser marcada como responsável pelo pagamento',
        );
      }
      // Validar que estudante não existe com mesmo nome e data de nascimento
      const estudanteExistente = await estudanteRepo.findOne({
        where: {
          nome: data.estudante.nome,
          dataNascimento: data.estudante.dataNascimento,
          matriculas: {
            anoLetivo: data.anoLetivo,
            status: StatusMatricula.ATIVA,
          },
        },
      });
      if (estudanteExistente) {
        throw new BadRequestException(
          'Já existe um estudante cadastrado com este nome e data de nascimento',
        );
      }
      const estudanteEntity = estudanteRepo.create(data.estudante);
      const estudanteSaved = await estudanteRepo.save(estudanteEntity);

      // Criar filiações sem o campo idEstudante (removido do modelo)
      const filiacaoEntities = (data.filiacoes ?? []).map((filiacao) => {
        const { isResponsavelPagamento, ...filiacaoData } = filiacao;
        return filiacaoRepo.create(filiacaoData);
      });
      const filiacoesSaved = await filiacaoRepo.save(filiacaoEntities);

      // Criar vínculos na tabela intermediária estudantes_filiacoes
      const estudanteFiliacaoRepo = manager.getRepository(EstudanteFiliacao);
      const vinculosEntities = filiacoesSaved.map((filiacao) =>
        estudanteFiliacaoRepo.create({
          idEstudante: estudanteSaved.id,
          idFiliacao: filiacao.id,
        }),
      );
      await estudanteFiliacaoRepo.save(vinculosEntities);

      // Pegar ID da filiação responsável pelo pagamento
      const indexResponsavel = data.filiacoes.findIndex(
        (f) => f.isResponsavelPagamento === true,
      );
      const idResponsavelPagamento = filiacoesSaved[indexResponsavel].id;
      if (!idResponsavelPagamento) {
        throw new BadRequestException(
          'Erro ao identificar responsável pelo pagamento',
        );
      }
      if (
        data.valorMensalidade === undefined ||
        data.valorMatricula === undefined ||
        data.quantidadeMensalidades === undefined ||
        data.diaVencimento === undefined ||
        data.mesInicioMensalidade === undefined ||
        data.mesFimMensalidade === undefined
      ) {
        throw new BadRequestException(
          'É necessário informar valor da matrícula, valor da mensalidade, quantidade de mensalidades, dia de vencimento e período das mensalidades',
        );
      }

      this.validarConfiguracaoMensalidade({
        mesInicio: data.mesInicioMensalidade,
        mesFim: data.mesFimMensalidade,
        diaVencimento: data.diaVencimento,
        quantidadeMensalidades: data.quantidadeMensalidades,
      });

      const matriculaEntity = matriculaRepo.create({
        anoLetivo: Number(data.anoLetivo),
        status: data.status ?? StatusMatricula.ATIVA,
        valorMatricula: data.valorMatricula,
        valorMensalidade: data.valorMensalidade,
        quantidadeMensalidades: data.quantidadeMensalidades,
        diaVencimento: data.diaVencimento,
        mesInicioMensalidade: data.mesInicioMensalidade,
        mesFimMensalidade: data.mesFimMensalidade,
        observacoes: data.observacoes,
        idEstudante: estudanteSaved.id,
        idTurno: data.idTurno,
        idResponsavelPagamento,
      });
      const matriculaSaved = await matriculaRepo.save(matriculaEntity);

      const mensalidadesPayload = this.criarMensalidades({
        idMatricula: matriculaSaved.id,
        anoLetivo: matriculaSaved.anoLetivo,
        valorMensalidade: matriculaSaved.valorMensalidade,
        mesInicio: matriculaSaved.mesInicioMensalidade,
        mesFim: matriculaSaved.mesFimMensalidade,
        diaVencimento: matriculaSaved.diaVencimento,
      });
      await mensalidadeRepo.save(mensalidadeRepo.create(mensalidadesPayload));

      return { matriculaSaved };
    });

    const matriculaWithRelations = await this.repository.findOne({
      where: { id: result.matriculaSaved.id },
      relations: {
        estudante: {
          estudantesFiliacoes: { filiacao: true },
        },
        turno: true,
        responsavelPagamento: true,
        mensalidades: true,
      },
    });

    return new ServiceResponse(
      'Matrícula criada com sucesso',
      matriculaWithRelations,
    );
  }

  async findAll(
    query: MatriculaQueryDto,
  ): Promise<ServiceResponse<Matricula[]>> {
    const page = query.page ?? 1;
    const limit = query.perPage ?? 10;

    const where: any = {};
    if (query.idEstudante) where.idEstudante = query.idEstudante;
    if (query.idTurno) where.idTurno = query.idTurno;
    if (query.anoLetivo) where.anoLetivo = query.anoLetivo;
    if (query.status) where.status = query.status;

    if (query['estudante.nome']) {
      where.estudante = where.estudante ?? {};
      where.estudante.nome = Raw(
        (alias) => `unaccent(${alias}) ILIKE unaccent(:nome)`,
        { nome: `%${query['estudante.nome']}%` },
      );
    }

    const [items, total] = await this.repository.findAndCount({
      where,
      relations: {
        estudante: {
          estudantesFiliacoes: { filiacao: true },
        },
        turno: true,
        responsavelPagamento: true,
        mensalidades: true,
      },
      skip: (page - 1) * limit,
      take: limit,
      order: { dtCriacao: 'DESC' },
    });

    return new ServiceResponse('Matrículas listadas com sucesso', items, {
      page,
      limit,
      total,
    });
  }

  async findOne(id: number): Promise<ServiceResponse<Matricula | null>> {
    const item = await this.repository.findOne({
      where: { id },
      relations: {
        estudante: {
          estudantesFiliacoes: { filiacao: true },
        },
        turno: true,
        responsavelPagamento: true,
        mensalidades: true,
      },
    });
    return new ServiceResponse('Matrícula recuperada com sucesso', item);
  }

  async update(
    id: number,
    data: UpdateMatriculaDto,
  ): Promise<ServiceResponse<Matricula | null>> {
    const result = await this.dataSource.transaction(async (manager) => {
      const estudanteRepo = manager.getRepository(Estudante);
      const filiacaoRepo = manager.getRepository(Filiacao);
      const matriculaRepo = manager.getRepository(Matricula);

      const existing = await matriculaRepo.findOne({ where: { id } });
      if (!existing || existing.dtDeletado) {
        throw new NotFoundException(
          `Matrícula ${id} não encontrada ou foi removida`,
        );
      }

      if (data.estudante) {
        await estudanteRepo.update(existing.idEstudante, data.estudante);
      }
      if (data.filiacoes && data.filiacoes.length > 0) {
        const estudanteFiliacaoRepo = manager.getRepository(EstudanteFiliacao);

        for (const filiacao of data.filiacoes) {
          const { isResponsavelPagamento, ...filiacaoData } = filiacao;

          if (!filiacao.id) {
            // Nova filiação - criar filiação e depois o vínculo
            const novaFiliacao = await filiacaoRepo.save(filiacaoData);

            // Criar vínculo na tabela intermediária
            await estudanteFiliacaoRepo.save({
              idEstudante: existing.idEstudante,
              idFiliacao: novaFiliacao.id,
            });

            if (isResponsavelPagamento) {
              await matriculaRepo.update(id, {
                idResponsavelPagamento: novaFiliacao.id,
              });
            }
          } else {
            // Atualizar filiação existente
            await filiacaoRepo.update(filiacao.id, filiacaoData);

            if (isResponsavelPagamento) {
              await matriculaRepo.update(id, {
                idResponsavelPagamento: filiacao.id,
              });
            }
          }
        }
      }

      // Extrair apenas campos da matrícula para atualizar
      const { estudante, filiacoes, ...matriculaData } = data;

      // Atualizar matrícula apenas se houver campos para atualizar
      if (Object.keys(matriculaData).length > 0) {
        await matriculaRepo.update(id, matriculaData);
      }

      const deveRegenerarMensalidades = [
        'valorMensalidade',
        'mesInicioMensalidade',
        'mesFimMensalidade',
        'diaVencimento',
        'quantidadeMensalidades',
        'anoLetivo',
      ].some((campo) => campo in matriculaData);

      if (deveRegenerarMensalidades) {
        const matriculaAtualizada = await matriculaRepo.findOne({
          where: { id },
        });
        if (matriculaAtualizada) {
          this.validarConfiguracaoMensalidade({
            mesInicio: matriculaAtualizada.mesInicioMensalidade,
            mesFim: matriculaAtualizada.mesFimMensalidade,
            diaVencimento: matriculaAtualizada.diaVencimento,
            quantidadeMensalidades: matriculaAtualizada.quantidadeMensalidades,
          });

          const mensalidadeRepo = manager.getRepository(Mensalidade);
          await mensalidadeRepo.softDelete({ idMatricula: id });
          const mensalidadesPayload = this.criarMensalidades({
            idMatricula: id,
            anoLetivo: matriculaAtualizada.anoLetivo,
            valorMensalidade: matriculaAtualizada.valorMensalidade,
            mesInicio: matriculaAtualizada.mesInicioMensalidade,
            mesFim: matriculaAtualizada.mesFimMensalidade,
            diaVencimento: matriculaAtualizada.diaVencimento,
          });
          await mensalidadeRepo.save(
            mensalidadeRepo.create(mensalidadesPayload),
          );
        }
      }

      const updated = await matriculaRepo.findOne({
        where: { id },
        relations: {
          estudante: {
            estudantesFiliacoes: { filiacao: true },
          },
          turno: true,
          responsavelPagamento: true,
          mensalidades: true,
        },
      });
      return new ServiceResponse('Matrícula atualizada com sucesso', updated);
    });

    return result;
    // Atualizar dados do estudante se fornecidos

    // Atualizar dados das filiações se fornecidas
  }

  async remove(id: number): Promise<ServiceResponse<null>> {
    await this.repository.softDelete(id);
    return new ServiceResponse('Matrícula removida com sucesso');
  }
}
