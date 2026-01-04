import { Inject, Injectable, NotFoundException, Scope } from '@nestjs/common';
import { CreateFiliacaoDto, FiliacaoQueryDto } from 'src/shared/dtos';
import { DataSource, ILike, Repository } from 'typeorm';
import { Filiacao } from '../shared/infrastructure/entities/filiacao.entity';
import { TENANT_CONNECTION_DATABASE_PROVIDER } from '../shared/infrastructure/tenant';
import { ServiceResponse } from '../shared/utils';

@Injectable({ scope: Scope.REQUEST })
export class FiliacaoService {
  private readonly repository: Repository<Filiacao>;

  constructor(
    @Inject(TENANT_CONNECTION_DATABASE_PROVIDER)
    private readonly dataSource: DataSource,
  ) {
    this.repository = this.dataSource.getRepository(Filiacao);
  }

  async create(data: CreateFiliacaoDto): Promise<ServiceResponse<Filiacao>> {
    const entity = this.repository.create(data);
    const saved = await this.repository.save(entity);
    return new ServiceResponse('Filiação criada com sucesso', saved);
  }

  async findAll(query: FiliacaoQueryDto): Promise<ServiceResponse<Filiacao[]>> {
    const page = query.page ?? 1;
    const limit = query.limit ?? 10;

    const where: any = {};
    if (query.nome) where.nome = ILike(`%${query.nome}%`);
    if (query.cpf) where.cpf = ILike(`%${query.cpf}%`);

    const [items, total] = await this.repository.findAndCount({
      where,
      relations: { estudante: true },
      skip: (page - 1) * limit,
      take: limit,
      order: { nome: 'ASC' },
    });

    return new ServiceResponse('Filiacões listadas com sucesso', items, {
      page,
      limit,
      total,
    });
  }

  async findOne(id: string): Promise<ServiceResponse<Filiacao | null>> {
    const item = await this.repository.findOne({
      where: { id },
      relations: { estudante: true },
    });
    return new ServiceResponse('Filiação recuperada com sucesso', item);
  }

  async update(
    id: string,
    data: Partial<Filiacao>,
  ): Promise<ServiceResponse<Filiacao | null>> {
    // Verificar se registro existe e não está deletado
    const existing = await this.repository.findOne({ where: { id } });
    if (!existing || existing.dtDeletado) {
      throw new NotFoundException(
        `Filiação ${id} não encontrada ou foi removida`,
      );
    }

    await this.repository.update(id, data);
    const updated = await this.repository.findOne({
      where: { id },
      relations: { estudante: true },
    });
    return new ServiceResponse('Filiação atualizada com sucesso', updated);
  }

  async remove(id: string): Promise<ServiceResponse<null>> {
    await this.repository.softDelete(id);
    return new ServiceResponse('Filiação removida com sucesso');
  }
}
