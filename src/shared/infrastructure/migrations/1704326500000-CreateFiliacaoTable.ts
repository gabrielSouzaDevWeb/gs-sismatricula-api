import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateFiliacaoTable1704326500000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'filiacoes',
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
            name: 'rg',
            type: 'varchar',
            length: '20',
            isNullable: true,
          },
          {
            name: 'cpf',
            type: 'varchar',
            length: '14',
            isNullable: true,
          },
          {
            name: 'estadoCivil',
            type: 'varchar',
            length: '50',
            isNullable: true,
          },
          {
            name: 'enderecoRes',
            type: 'varchar',
            length: '255',
            isNullable: true,
          },
          {
            name: 'numeroEndereco',
            type: 'varchar',
            length: '10',
            isNullable: true,
          },
          {
            name: 'bairro',
            type: 'varchar',
            length: '100',
            isNullable: true,
          },
          {
            name: 'cep',
            type: 'varchar',
            length: '10',
            isNullable: true,
          },
          {
            name: 'complemento',
            type: 'varchar',
            length: '255',
            isNullable: true,
          },
          {
            name: 'telefoneResidencial',
            type: 'varchar',
            length: '20',
            isNullable: true,
          },
          {
            name: 'celular',
            type: 'varchar',
            length: '20',
            isNullable: true,
          },
          {
            name: 'profissao',
            type: 'varchar',
            length: '100',
            isNullable: true,
          },
          {
            name: 'nomeEnderecoComercial',
            type: 'varchar',
            length: '255',
            isNullable: true,
          },
          {
            name: 'telefoneComercial',
            type: 'varchar',
            length: '20',
            isNullable: true,
          },
          {
            name: 'telefoneComercial2',
            type: 'varchar',
            length: '20',
            isNullable: true,
          },
          {
            name: 'outroTelefones',
            type: 'varchar',
            length: '20',
            isNullable: true,
          },
          {
            name: 'email',
            type: 'varchar',
            length: '255',
            isNullable: true,
          },
          {
            name: 'idEstudante',
            type: 'int',
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
      'filiacoes',
      new TableForeignKey({
        columnNames: ['idEstudante'],
        referencedColumnNames: ['id'],
        referencedTableName: 'estudantes',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('filiacoes');
    if (!table) {
      return;
    }
    const foreignKey = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('idEstudante') !== -1,
    );

    if (!foreignKey) {
      return;
    }
    await queryRunner.dropForeignKey('filiacoes', foreignKey);
    await queryRunner.dropTable('filiacoes');
  }
}
