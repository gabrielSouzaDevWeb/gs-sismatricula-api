import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateMatriculaTable1704326800000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'matriculas',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'idEstudante',
            type: 'int',
          },
          {
            name: 'anoLetivo',
            type: 'int',
          },
          {
            name: 'idTurno',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'dataMatricula',
            type: 'date',
          },
          {
            name: 'status',
            type: 'varchar',
            length: '50',
            default: "'ativa'",
          },
          {
            name: 'valorMensalidade',
            type: 'decimal',
            precision: 10,
            scale: 2,
            isNullable: true,
          },
          {
            name: 'observacoes',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'idResponsavelPagamento',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'dtCriacao',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'dtAtualizacao',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
        ],
      }),
      true,
    );

    await queryRunner.createForeignKey(
      'matriculas',
      new TableForeignKey({
        columnNames: ['idEstudante'],
        referencedColumnNames: ['id'],
        referencedTableName: 'estudantes',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'matriculas',
      new TableForeignKey({
        columnNames: ['idTurno'],
        referencedColumnNames: ['id'],
        referencedTableName: 'turno',
        onDelete: 'SET NULL',
      }),
    );

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

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('matriculas');
    if (!table) {
      return;
    }
    const foreignKeyEstudante = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('idEstudante') !== -1,
    );

    if (!foreignKeyEstudante) {
      return;
    }
    await queryRunner.dropForeignKey('matriculas', foreignKeyEstudante);

    const foreignKeyHorario = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('idTurno') !== -1,
    );
    if (!foreignKeyHorario) {
      return;
    }
    await queryRunner.dropForeignKey('matriculas', foreignKeyHorario);

    const foreignKeyResponsavelPagamento = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('idResponsavelPagamento') !== -1,
    );
    if (foreignKeyResponsavelPagamento) {
      await queryRunner.dropForeignKey(
        'matriculas',
        foreignKeyResponsavelPagamento,
      );
    }

    await queryRunner.dropTable('matriculas');
  }
}
