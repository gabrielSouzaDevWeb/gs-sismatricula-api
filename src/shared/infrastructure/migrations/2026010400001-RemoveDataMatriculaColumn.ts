import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class RemoveDataMatriculaColumn2026010400001 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('matriculas', 'dataMatricula');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
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
