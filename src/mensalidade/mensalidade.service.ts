import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
  Scope,
} from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import {
  CreateMensalidadeDto,
  GerarMensalidadesDto,
  MensalidadeQueryDto,
  PaginationDto,
  RegistrarPagamentoDto,
  UpdateMensalidadeDto,
} from '../shared/dtos';
import { Matricula, Mensalidade } from '../shared/infrastructure/entities';
import { TENANT_CONNECTION_DATABASE_PROVIDER } from '../shared/infrastructure/tenant';
import { ServiceResponse } from '../shared/utils';

@Injectable({ scope: Scope.REQUEST })
export class MensalidadeService {
  private readonly repository: Repository<Mensalidade>;
  private readonly matriculaRepository: Repository<Matricula>;

  constructor(
    @Inject(TENANT_CONNECTION_DATABASE_PROVIDER)
    private readonly dataSource: DataSource,
  ) {
    this.repository = this.dataSource.getRepository(Mensalidade);
    this.matriculaRepository = this.dataSource.getRepository(Matricula);
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
    data: CreateMensalidadeDto,
  ): Promise<ServiceResponse<Mensalidade>> {
    const matricula = await this.matriculaRepository.findOne({
      where: { id: data.idMatricula },
    });
    if (!matricula || matricula.dtDeletado) {
      throw new NotFoundException('Matrícula não encontrada');
    }

    const entity = this.repository.create({
      ...data,
      dataPagamento: data.dataPagamento ?? null,
    });
    const saved = await this.repository.save(entity);
    return new ServiceResponse('Mensalidade criada com sucesso', saved);
  }

  async findAll(
    query: MensalidadeQueryDto,
  ): Promise<ServiceResponse<Mensalidade[]>> {
    const page = query.page ?? 1;
    const limit = query.perPage ?? 10;

    const where: any = {};
    if (query.idMatricula) where.idMatricula = query.idMatricula;
    if (query.mesMensalidade) where.mesMensalidade = query.mesMensalidade;
    if (query.anoLetivo) where.anoLetivo = query.anoLetivo;

    const [items, total] = await this.repository.findAndCount({
      where,
      relations: { matricula: false },
      skip: (page - 1) * limit,
      take: limit,
      order: { dataVencimento: 'ASC' },
    });

    return new ServiceResponse('Mensalidades listadas com sucesso', items, {
      page,
      limit,
      total,
    });
  }

  async findByMatricula(
    idMatricula: number,
    query: PaginationDto,
  ): Promise<ServiceResponse<Mensalidade[]>> {
    const page = query.page ?? 1;
    const limit = query.perPage ?? 10;

    const [items, total] = await this.repository.findAndCount({
      where: { idMatricula },
      relations: { matricula: false },
      skip: (page - 1) * limit,
      take: limit,
      order: { dataVencimento: 'ASC' },
    });

    return new ServiceResponse(
      'Mensalidades da matrícula listadas com sucesso',
      items,
      { page, limit, total },
    );
  }

  async findOne(id: number): Promise<ServiceResponse<Mensalidade | null>> {
    const item = await this.repository.findOne({
      where: { id },
      relations: { matricula: true },
    });
    return new ServiceResponse('Mensalidade recuperada com sucesso', item);
  }

  async update(
    id: number,
    data: UpdateMensalidadeDto,
  ): Promise<ServiceResponse<Mensalidade | null>> {
    const existing = await this.repository.findOne({ where: { id } });
    if (!existing || existing.dtDeletado) {
      throw new NotFoundException(
        `Mensalidade ${id} não encontrada ou foi removida`,
      );
    }

    if (data.idMatricula) {
      const matricula = await this.matriculaRepository.findOne({
        where: { id: data.idMatricula },
      });
      if (!matricula || matricula.dtDeletado) {
        throw new NotFoundException('Matrícula não encontrada');
      }
    }

    await this.repository.update(id, data);
    const updated = await this.repository.findOne({
      where: { id },
      relations: { matricula: true },
    });
    return new ServiceResponse('Mensalidade atualizada com sucesso', updated);
  }

  async remove(id: number): Promise<ServiceResponse<null>> {
    const existing = await this.repository.findOne({ where: { id } });
    if (!existing || existing.dtDeletado) {
      throw new NotFoundException(
        `Mensalidade ${id} não encontrada ou já foi removida`,
      );
    }

    await this.repository.softDelete(id);
    return new ServiceResponse('Mensalidade removida com sucesso', null);
  }

  async gerarMensalidades(
    idMatricula: number,
    data: GerarMensalidadesDto,
  ): Promise<ServiceResponse<Mensalidade[]>> {
    const result = await this.dataSource.transaction(async (manager) => {
      const matriculaRepo = manager.getRepository(Matricula);
      const mensalidadeRepo = manager.getRepository(Mensalidade);

      const matricula = await matriculaRepo.findOne({
        where: { id: idMatricula },
      });
      if (!matricula || matricula.dtDeletado) {
        throw new NotFoundException('Matrícula não encontrada');
      }

      if (
        data.valorMensalidade === undefined ||
        data.mesInicio === undefined ||
        data.mesFim === undefined ||
        data.dataVencimento === undefined
      ) {
        throw new BadRequestException(
          'É necessário informar valor da mensalidade, mês de início, mês de fim e data de vencimento no body',
        );
      }

      const parsedDataVencimento = new Date(data.dataVencimento);
      if (Number.isNaN(parsedDataVencimento.getTime())) {
        throw new BadRequestException('A data de vencimento é inválida');
      }

      const diaVencimento = parsedDataVencimento.getDate();
      const quantidadeMensalidades = data.mesFim - data.mesInicio + 1;

      this.validarConfiguracaoMensalidade({
        mesInicio: data.mesInicio,
        mesFim: data.mesFim,
        diaVencimento,
        quantidadeMensalidades,
      });

      const existentes = await mensalidadeRepo.find({
        where: { idMatricula },
      });
      const possuiPagamento = existentes.some((item) => item.dataPagamento);
      if (possuiPagamento) {
        throw new BadRequestException(
          'Não é possível gerar mensalidades porque existem pagamentos registrados',
        );
      }

      if (existentes.length > 0) {
        await mensalidadeRepo.softDelete({ idMatricula });
      }

      const payload = this.criarMensalidades({
        idMatricula,
        anoLetivo: matricula.anoLetivo,
        valorMensalidade: data.valorMensalidade,
        mesInicio: data.mesInicio,
        mesFim: data.mesFim,
        diaVencimento,
      });

      return mensalidadeRepo.save(mensalidadeRepo.create(payload));
    });

    return new ServiceResponse('Mensalidades geradas com sucesso', result);
  }

  async registrarPagamento(
    id: number,
    data: RegistrarPagamentoDto,
  ): Promise<ServiceResponse<Mensalidade | null>> {
    const existing = await this.repository.findOne({ where: { id } });
    if (!existing || existing.dtDeletado) {
      throw new NotFoundException(
        `Mensalidade ${id} não encontrada ou foi removida`,
      );
    }

    if (existing.dataPagamento) {
      throw new BadRequestException('Pagamento já registrado');
    }

    const dataPagamento = data.dataPagamento
      ? new Date(data.dataPagamento)
      : new Date();

    await this.repository.update(id, { dataPagamento });
    const updated = await this.repository.findOne({
      where: { id },
      relations: { matricula: true },
    });

    return new ServiceResponse('Pagamento registrado com sucesso', updated);
  }
}
