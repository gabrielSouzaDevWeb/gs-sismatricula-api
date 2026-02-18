import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class CreateColumnStatusPagamentoMensalidade1700733051000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'mensalidade',
      new TableColumn({
        name: 'status_pagamento',
        type: 'int',
        default: 0,
        isNullable: false,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('mensalidade', 'status_pagamento');
  }
}
