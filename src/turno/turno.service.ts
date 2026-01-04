import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
  Scope,
} from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { TurnoQueryDto } from '../shared/dtos';
import { Turno } from '../shared/infrastructure/entities/horario.entity';
import { TENANT_CONNECTION_DATABASE_PROVIDER } from '../shared/infrastructure/tenant';
import { ServiceResponse } from '../shared/utils';

@Injectable({ scope: Scope.REQUEST })
export class TurnoService {
  private readonly repository: Repository<Turno>;

  constructor(
    @Inject(TENANT_CONNECTION_DATABASE_PROVIDER)
    private readonly dataSource: DataSource,
  ) {
    this.repository = this.dataSource.getRepository(Turno);
  }

  async create(data: Partial<Turno>): Promise<ServiceResponse<Turno>> {
    const existingHorario = await this.repository.exists({
      where: {
        turno: data.turno,
        tipoAula: data.tipoAula,
        horaInicio: data.horaInicio,
        horaFim: data.horaFim,
      },
    });

    if (existingHorario) {
      throw new BadRequestException('Turno já existe');
    }

    const entity = this.repository.create(data);
    const saved = await this.repository.save(entity);
    return new ServiceResponse('Turno criado com sucesso', saved);
  }

  async findAll(query: TurnoQueryDto): Promise<ServiceResponse<Turno[]>> {
    const page = query.page ?? 1;
    const limit = query.limit ?? 10;

    const where: any = {};
    if (query.turno) where.turno = query.turno;
    if (query.tipoAula) where.tipoAula = query.tipoAula;

    const [items, total] = await this.repository.findAndCount({
      where,
      skip: (page - 1) * limit,
      take: limit,
      order: { turno: 'ASC', horaInicio: 'ASC' },
    });

    return new ServiceResponse('Turnos listados com sucesso', items, {
      page,
      limit,
      total,
    });
  }

  async findOne(id: string): Promise<ServiceResponse<Turno | null>> {
    const item = await this.repository.findOne({ where: { id } });
    return new ServiceResponse('Turno recuperado com sucesso', item);
  }

  async update(
    id: string,
    data: Partial<Turno>,
  ): Promise<ServiceResponse<Turno | null>> {
    // Verificar se registro existe e não está deletado
    const existing = await this.repository.findOne({ where: { id } });
    if (!existing || existing.dtDeletado) {
      throw new NotFoundException(`Turno ${id} não encontrado ou foi removido`);
    }

    await this.repository.update(id, data);
    const updated = await this.repository.findOne({ where: { id } });
    return new ServiceResponse('Turno atualizado com sucesso', updated);
  }

  async remove(id: string): Promise<ServiceResponse<null>> {
    await this.repository.softDelete(id);
    return new ServiceResponse('Turno removido com sucesso');
  }
}
