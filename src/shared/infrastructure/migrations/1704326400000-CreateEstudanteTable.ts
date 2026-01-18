import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateEstudanteTable1704326400000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'estudantes',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'nome',
            type: 'varchar',
            length: '255',
          },
          {
            name: 'dataNascimento',
            type: 'date',
          },
          {
            name: 'sexo',
            type: 'varchar',
            length: '1',
          },
          {
            name: 'serie',
            type: 'varchar',
            length: '100',
          },
          {
            name: 'escola',
            type: 'varchar',
            length: '255',
          },
          {
            name: 'numeroContato',
            type: 'varchar',
            length: '20',
            isNullable: true,
          },
          {
            name: 'alergicoMedicamento',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'alergiaAlimento',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'tratamentoMedico',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'medicacaoEspecifica',
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
            name: 'dtAtualizaca',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('estudantes');
  }
}
