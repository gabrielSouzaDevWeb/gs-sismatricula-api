import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export class AddResponsavelPagamentoFK1704326600000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createForeignKey(
      'estudantes',
      new TableForeignKey({
        columnNames: ['idResponsavelPagamento'],
        referencedColumnNames: ['id'],
        referencedTableName: 'filiacoes',
        onDelete: 'SET NULL',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('estudantes');
    if (!table) {
      return;
    }
    const foreignKey = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('idResponsavelPagamento') !== -1,
    );

    if (!foreignKey) {
      return;
    }
    await queryRunner.dropForeignKey('estudantes', foreignKey);
  }
}
