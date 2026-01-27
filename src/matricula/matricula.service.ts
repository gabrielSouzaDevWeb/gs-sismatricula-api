import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
  Scope,
} from '@nestjs/common';
import { EstudanteService } from 'src/estudante/estudante.service';
import { DataSource, Raw, Repository } from 'typeorm';
import {
  CreateMatriculaWithRelationsDto,
  MatriculaQueryDto,
  UpdateMatriculaDto,
} from '../shared/dtos';
import { Estudante } from '../shared/infrastructure/entities';
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

  async create(
    data: CreateMatriculaWithRelationsDto,
  ): Promise<ServiceResponse<Matricula | null>> {
    const result = await this.dataSource.transaction(async (manager) => {
      const estudanteRepo = manager.getRepository(Estudante);
      const filiacaoRepo = manager.getRepository(Filiacao);
      const matriculaRepo = manager.getRepository(Matricula);

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
        },
      });
      if (estudanteExistente) {
        throw new BadRequestException(
          'Já existe um estudante cadastrado com este nome e data de nascimento',
        );
      }
      const estudanteEntity = estudanteRepo.create(data.estudante);
      const estudanteSaved = await estudanteRepo.save(estudanteEntity);

      const filiacaoEntities = (data.filiacoes ?? []).map((filiacao) =>
        filiacaoRepo.create({ ...filiacao, idEstudante: estudanteSaved.id }),
      );
      const filiacoesSaved = await filiacaoRepo.save(filiacaoEntities);

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
      const matriculaEntity = matriculaRepo.create({
        anoLetivo: Number(data.anoLetivo),
        status: String(data.status ?? 'ativa'),
        valorMensalidade: data.valorMensalidade,
        observacoes: data.observacoes,
        idEstudante: estudanteSaved.id,
        idTurno: data.idTurno,
        idResponsavelPagamento,
      });
      const matriculaSaved = await matriculaRepo.save(matriculaEntity);

      return { matriculaSaved };
    });

    const matriculaWithRelations = await this.repository.findOne({
      where: { id: result.matriculaSaved.id },
      relations: { estudante: { filiacoes: true }, turno: true },
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
        estudante: { filiacoes: true },
        turno: true,
        responsavelPagamento: true,
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
      relations: { estudante: { filiacoes: true }, turno: true },
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
        for (const filiacao of data.filiacoes) {
          delete filiacao.isResponsavelPagamento;
          if (!filiacao.id) {
            filiacao.idEstudante = existing.idEstudante;
            await filiacaoRepo.save(filiacao);
          }

          await filiacaoRepo.update(filiacao.id!, filiacao);
          //remove campo temporário
        }
      }

      // Extrair apenas campos da matrícula para atualizar
      const { estudante, filiacoes, ...matriculaData } = data;

      // Atualizar matrícula apenas se houver campos para atualizar
      if (Object.keys(matriculaData).length > 0) {
        await this.repository.update(id, matriculaData);
      }

      const updated = await this.repository.findOne({
        where: { id },
        relations: {
          estudante: { filiacoes: true },
          turno: true,
          responsavelPagamento: true,
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
