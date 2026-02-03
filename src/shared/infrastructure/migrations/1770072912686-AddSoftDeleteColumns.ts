import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddSoftDeleteColumns1770072912686 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const column = new TableColumn({
      name: 'dtDeletado',
      type: 'timestamp',
      isNullable: true,
    });

    await queryRunner.addColumn('estudantes', column.clone());
    await queryRunner.addColumn('filiacoes', column.clone());
    await queryRunner.addColumn('turno', column.clone());
    await queryRunner.addColumn('matriculas', column.clone());
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('matriculas', 'dtDeletado');
    await queryRunner.dropColumn('turno', 'dtDeletado');
    await queryRunner.dropColumn('filiacoes', 'dtDeletado');
    await queryRunner.dropColumn('estudantes', 'dtDeletado');
  }
}
