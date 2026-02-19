import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class RemoveDataMatriculaColumn1770073166192 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('matriculas');
    const column = table?.findColumnByName('dataMatricula');

    if (column) {
      await queryRunner.dropColumn('matriculas', 'dataMatricula');
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('matriculas');
    const column = table?.findColumnByName('dataMatricula');

    if (!column) {
      await queryRunner.addColumn(
        'matriculas',
        new TableColumn({
          name: 'dataMatricula',
          type: 'date',
          isNullable: false,
        }),
      );
    }
  }
}
