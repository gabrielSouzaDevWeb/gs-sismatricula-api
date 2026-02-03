import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class AddResponsavelPagamentoToMatricula1704326900000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('matriculas');
    const columnExists = table?.columns.some(
      (col) => col.name === 'idResponsavelPagamento',
    );

    if (!columnExists) {
      await queryRunner.addColumn(
        'matriculas',
        new TableColumn({
          name: 'idResponsavelPagamento',
          type: 'int',
          isNullable: true,
        }),
      );
    }

    const foreignKeyExists = table?.foreignKeys.some(
      (fk) => fk.columnNames.indexOf('idResponsavelPagamento') !== -1,
    );

    if (!foreignKeyExists) {
      await queryRunner.createForeignKey(
        'matriculas',
        new TableForeignKey({
          columnNames: ['idResponsavelPagamento'],
          referencedColumnNames: ['id'],
          referencedTableName: 'filiacoes',
          onDelete: 'SET NULL',
        }),
      );
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('matriculas');
    if (!table) return;
    const foreignKey = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('idResponsavelPagamento') !== -1,
    );
    if (foreignKey) {
      await queryRunner.dropForeignKey('matriculas', foreignKey);
    }

    await queryRunner.dropColumn('matriculas', 'idResponsavelPagamento');
  }
}
