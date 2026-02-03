import { Inject, Injectable, NotFoundException, Scope } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { EstudanteFiliacao } from '../infrastructure/entities';
import { TENANT_CONNECTION_DATABASE_PROVIDER } from '../infrastructure/tenant';
import { ServiceResponse } from '../utils';

@Injectable({ scope: Scope.REQUEST })
export class EstudanteFiliacaoService {
  private readonly repository: Repository<EstudanteFiliacao>;

  constructor(
    @Inject(TENANT_CONNECTION_DATABASE_PROVIDER)
    private readonly dataSource: DataSource,
  ) {
    this.repository = this.dataSource.getRepository(EstudanteFiliacao);
  }

  /**
   * Vincula um estudante a uma filiação
   */
  async vincularEstudanteAFiliacao(
    idEstudante: number,
    idFiliacao: number,
  ): Promise<ServiceResponse<EstudanteFiliacao>> {
    // Verificar se o vínculo já existe
    const existing = await this.repository.findOne({
      where: { idEstudante, idFiliacao },
    });

    if (existing) {
      throw new NotFoundException(
        'Vínculo já existe entre estudante e filiação',
      );
    }

    const entity = this.repository.create({
      idEstudante,
      idFiliacao,
    });

    const saved = await this.repository.save(entity);
    return new ServiceResponse('Vínculo criado com sucesso', saved);
  }

  /**
   * Remove o vínculo entre um estudante e uma filiação
   */
  async desvincularEstudanteDeFiliacao(
    idEstudante: number,
    idFiliacao: number,
  ): Promise<ServiceResponse<null>> {
    const result = await this.repository.softDelete({
      idEstudante,
      idFiliacao,
    });

    if (result.affected === 0) {
      throw new NotFoundException('Vínculo não encontrado');
    }

    return new ServiceResponse('Vínculo removido com sucesso');
  }

  /**
   * Lista todas as filiações de um estudante
   */
  async findFiliacoesByEstudante(
    idEstudante: number,
  ): Promise<ServiceResponse<EstudanteFiliacao[]>> {
    const items = await this.repository.find({
      where: { idEstudante },
      relations: { filiacao: true },
      order: { dtCriacao: 'DESC' },
    });

    return new ServiceResponse(
      'Filiações do estudante listadas com sucesso',
      items,
    );
  }

  /**
   * Lista todos os estudantes de uma filiação
   */
  async findEstudantesByFiliacao(
    idFiliacao: number,
  ): Promise<ServiceResponse<EstudanteFiliacao[]>> {
    const items = await this.repository.find({
      where: { idFiliacao },
      relations: { estudante: true },
      order: { dtCriacao: 'DESC' },
    });

    return new ServiceResponse(
      'Estudantes da filiação listados com sucesso',
      items,
    );
  }

  /**
   * Verifica se existe vínculo entre estudante e filiação
   */
  async verificarVinculo(
    idEstudante: number,
    idFiliacao: number,
  ): Promise<ServiceResponse<boolean>> {
    const exists = await this.repository.exists({
      where: { idEstudante, idFiliacao },
    });

    return new ServiceResponse('Verificação realizada com sucesso', exists);
  }
}
