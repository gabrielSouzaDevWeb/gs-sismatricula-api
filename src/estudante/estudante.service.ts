import { Inject, Injectable, NotFoundException, Scope } from '@nestjs/common';
import { CreateEstudanteDto, EstudanteQueryDto } from 'src/shared/dtos';
import { DataSource, ILike, Repository } from 'typeorm';
import { Estudante } from '../shared/infrastructure/entities';
import { TENANT_CONNECTION_DATABASE_PROVIDER } from '../shared/infrastructure/tenant';
import { ServiceResponse } from '../shared/utils';

@Injectable({ scope: Scope.REQUEST })
export class EstudanteService {
  private readonly repository: Repository<Estudante>;

  constructor(
    @Inject(TENANT_CONNECTION_DATABASE_PROVIDER)
    private readonly dataSource: DataSource,
  ) {
    this.repository = this.dataSource.getRepository(Estudante);
  }

  async create(
    data: Partial<CreateEstudanteDto>,
  ): Promise<ServiceResponse<Estudante>> {
    const entity = this.repository.create(data);
    const saved = await this.repository.save(entity);
    return new ServiceResponse('Estudante criado com sucesso', saved);
  }

  async findAll(
    query: EstudanteQueryDto,
  ): Promise<ServiceResponse<Estudante[]>> {
    const page = query.page ?? 1;
    const limit = query.perPage ?? 10;

    const where: any = {};
    if (query.nome) where.nome = ILike(`%${query.nome}%`);
    if (query.serie) where.serie = ILike(`%${query.serie}%`);
    if (query.escola) where.escola = ILike(`%${query.escola}%`);

    const [items, total] = await this.repository.findAndCount({
      where,
      relations: { filiacoes: true, matriculas: true },
      skip: (page - 1) * limit,
      take: limit,
      order: { nome: 'ASC' },
    });

    return new ServiceResponse('Estudantes listados com sucesso', items, {
      page,
      limit,
      total,
    });
  }

  async findOne(id: number): Promise<ServiceResponse<Estudante | null>> {
    const item = await this.repository.findOne({
      where: { id },
      relations: { filiacoes: true, matriculas: true },
    });
    return new ServiceResponse('Estudante recuperado com sucesso', item);
  }

  async update(
    id: number,
    data: Partial<Estudante>,
  ): Promise<ServiceResponse<Estudante | null>> {
    // Verificar se registro existe e não está deletado
    const existing = await this.repository.findOne({ where: { id } });
    if (!existing || existing.dtDeletado) {
      throw new NotFoundException(
        `Estudante ${id} não encontrado ou foi removido`,
      );
    }

    await this.repository.update(id, data);
    const updated = await this.repository.findOne({
      where: { id },
      relations: { filiacoes: true, matriculas: true },
    });
    return new ServiceResponse('Estudante atualizado com sucesso', updated);
  }

  async remove(id: number): Promise<ServiceResponse<null>> {
    await this.repository.softDelete(id);
    return new ServiceResponse('Estudante removido com sucesso');
  }
}
