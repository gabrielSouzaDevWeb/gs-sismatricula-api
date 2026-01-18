import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateHorarioTable1704326700000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'turno',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'turno',
            type: 'varchar',
            length: '50',
          },
          {
            name: 'horaInicio',
            type: 'time',
          },
          {
            name: 'horaFim',
            type: 'time',
          },
          {
            name: 'descricao',
            type: 'varchar',
            length: '100',
            isNullable: true,
          },
          {
            name: 'tipoAula',
            type: 'varchar',
            length: '50',
            default: "'reforco'",
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
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('turno');
  }
}
