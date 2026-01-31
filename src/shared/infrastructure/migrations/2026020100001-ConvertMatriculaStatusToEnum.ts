import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class ConvertMatriculaStatusToEnum2026020100001 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Criar coluna temporária para armazenar valores numéricos
    await queryRunner.addColumn(
      'matriculas',
      new TableColumn({
        name: 'status_temp',
        type: 'int',
        isNullable: true,
        default: 1, // ATIVA
      }),
    );

    // Mapear valores de string para números do enum
    await queryRunner.query(
      `UPDATE matriculas 
       SET status_temp = CASE 
         WHEN status = 'ativa' THEN 1
         WHEN status = 'cancelada' THEN 2
         WHEN status = 'trancada' THEN 3
         WHEN status = 'concluida' THEN 4
         ELSE 1
       END`,
    );

    // Remover coluna antiga
    await queryRunner.dropColumn('matriculas', 'status');

    // Renomear coluna temporária
    await queryRunner.renameColumn('matriculas', 'status_temp', 'status');

    // Alterar tipo e default
    await queryRunner.changeColumn(
      'matriculas',
      'status',
      new TableColumn({
        name: 'status',
        type: 'int',
        default: 1, // ATIVA
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Criar coluna temporária para armazenar valores string
    await queryRunner.addColumn(
      'matriculas',
      new TableColumn({
        name: 'status_temp',
        type: 'varchar',
        length: '50',
        isNullable: true,
        default: "'ativa'",
      }),
    );

    // Mapear números de volta para strings
    await queryRunner.query(
      `UPDATE matriculas 
       SET status_temp = CASE 
         WHEN status = 1 THEN 'ativa'
         WHEN status = 2 THEN 'cancelada'
         WHEN status = 3 THEN 'trancada'
         WHEN status = 4 THEN 'concluida'
         ELSE 'ativa'
       END`,
    );

    // Remover coluna numérica
    await queryRunner.dropColumn('matriculas', 'status');

    // Renomear coluna temporária
    await queryRunner.renameColumn('matriculas', 'status_temp', 'status');

    // Alterar tipo e default
    await queryRunner.changeColumn(
      'matriculas',
      'status',
      new TableColumn({
        name: 'status',
        type: 'varchar',
        length: '50',
        default: "'ativa'",
      }),
    );
  }
}
