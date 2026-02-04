import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class CreateMensalidadesAndAddColumnsToMatriculas1770073305000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const columnsToAdd: TableColumn[] = [];
    if (!(await queryRunner.hasColumn('matriculas', 'valor_matricula'))) {
      columnsToAdd.push(
        new TableColumn({
          name: 'valor_matricula',
          type: 'decimal',
          precision: 10,
          scale: 2,
          isNullable: true,
        }),
      );
    }
    if (
      !(await queryRunner.hasColumn('matriculas', 'quantidade_mensalidades'))
    ) {
      columnsToAdd.push(
        new TableColumn({
          name: 'quantidade_mensalidades',
          type: 'int',
          isNullable: true,
        }),
      );
    }
    if (!(await queryRunner.hasColumn('matriculas', 'dia_vencimento'))) {
      columnsToAdd.push(
        new TableColumn({
          name: 'dia_vencimento',
          type: 'int',
          isNullable: true,
        }),
      );
    }
    if (
      !(await queryRunner.hasColumn('matriculas', 'mes_inicio_mensalidade'))
    ) {
      columnsToAdd.push(
        new TableColumn({
          name: 'mes_inicio_mensalidade',
          type: 'int',
          isNullable: true,
        }),
      );
    }
    if (!(await queryRunner.hasColumn('matriculas', 'mes_fim_mensalidade'))) {
      columnsToAdd.push(
        new TableColumn({
          name: 'mes_fim_mensalidade',
          type: 'int',
          isNullable: true,
        }),
      );
    }
    if (columnsToAdd.length > 0) {
      await queryRunner.addColumns('matriculas', columnsToAdd);
    }

    const hasMensalidadesTable = await queryRunner.hasTable('mensalidades');
    if (!hasMensalidadesTable) {
      await queryRunner.createTable(
        new Table({
          name: 'mensalidades',
          columns: [
            {
              name: 'id',
              type: 'int',
              isPrimary: true,
              isGenerated: true,
              generationStrategy: 'increment',
            },
            {
              name: 'id_matricula',
              type: 'int',
            },
            {
              name: 'valor_mensalidade',
              type: 'decimal',
              precision: 10,
              scale: 2,
            },
            {
              name: 'observacao',
              type: 'text',
              isNullable: true,
            },
            {
              name: 'mes_mensalidade',
              type: 'int',
            },
            {
              name: 'data_vencimento',
              type: 'date',
            },
            {
              name: 'ano_letivo',
              type: 'int',
            },
            {
              name: 'data_pagamento',
              type: 'timestamp',
              isNullable: true,
            },
            {
              name: 'dt_criacao',
              type: 'timestamp',
              default: 'CURRENT_TIMESTAMP',
            },
            {
              name: 'dt_atualizacao',
              type: 'timestamp',
              default: 'CURRENT_TIMESTAMP',
            },
            {
              name: 'dt_deletado',
              type: 'timestamp',
              isNullable: true,
            },
          ],
        }),
        true,
      );
    }

    const mensalidades = await queryRunner.getTable('mensalidades');
    if (mensalidades) {
      const hasFk = mensalidades.foreignKeys.some((fk) =>
        fk.columnNames.includes('id_matricula'),
      );
      if (!hasFk) {
        await queryRunner.createForeignKey(
          'mensalidades',
          new TableForeignKey({
            columnNames: ['id_matricula'],
            referencedColumnNames: ['id'],
            referencedTableName: 'matriculas',
            onDelete: 'CASCADE',
          }),
        );
      }
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const mensalidades = await queryRunner.getTable('mensalidades');
    if (mensalidades) {
      const fkMatricula = mensalidades.foreignKeys.find((fk) =>
        fk.columnNames.includes('id_matricula'),
      );
      if (fkMatricula) {
        await queryRunner.dropForeignKey('mensalidades', fkMatricula);
      }
      await queryRunner.dropTable('mensalidades');
    }

    await queryRunner.dropColumns('matriculas', [
      'valor_matricula',
      'quantidade_mensalidades',
      'dia_vencimento',
      'mes_inicio_mensalidade',
      'mes_fim_mensalidade',
    ]);
  }
}
