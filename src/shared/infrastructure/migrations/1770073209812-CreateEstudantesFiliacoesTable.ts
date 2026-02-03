import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
  TableIndex,
} from 'typeorm';

export class CreateEstudantesFiliacoesTable1770073209812 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Criar tabela de relacionamento many-to-many
    await queryRunner.createTable(
      new Table({
        name: 'estudantes_filiacoes',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'id_estudante',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'id_filiacao',
            type: 'int',
            isNullable: false,
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
            onUpdate: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'dt_deletado',
            type: 'timestamp',
            isNullable: true,
            default: null,
          },
        ],
      }),
      true,
    );

    // Criar foreign key para estudantes
    await queryRunner.createForeignKey(
      'estudantes_filiacoes',
      new TableForeignKey({
        columnNames: ['id_estudante'],
        referencedColumnNames: ['id'],
        referencedTableName: 'estudantes',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );

    // Criar foreign key para filiacoes
    await queryRunner.createForeignKey(
      'estudantes_filiacoes',
      new TableForeignKey({
        columnNames: ['id_filiacao'],
        referencedColumnNames: ['id'],
        referencedTableName: 'filiacoes',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );

    // Criar índices para melhorar performance de consultas
    await queryRunner.createIndex(
      'estudantes_filiacoes',
      new TableIndex({
        name: 'IDX_ESTUDANTES_FILIACOES_ID_ESTUDANTE',
        columnNames: ['id_estudante'],
      }),
    );

    await queryRunner.createIndex(
      'estudantes_filiacoes',
      new TableIndex({
        name: 'IDX_ESTUDANTES_FILIACOES_ID_FILIACAO',
        columnNames: ['id_filiacao'],
      }),
    );

    // Criar índice único para evitar duplicatas
    await queryRunner.createIndex(
      'estudantes_filiacoes',
      new TableIndex({
        name: 'IDX_ESTUDANTES_FILIACOES_UNIQUE',
        columnNames: ['id_estudante', 'id_filiacao'],
        isUnique: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Remover índices
    await queryRunner.dropIndex(
      'estudantes_filiacoes',
      'IDX_ESTUDANTES_FILIACOES_UNIQUE',
    );
    await queryRunner.dropIndex(
      'estudantes_filiacoes',
      'IDX_ESTUDANTES_FILIACOES_ID_FILIACAO',
    );
    await queryRunner.dropIndex(
      'estudantes_filiacoes',
      'IDX_ESTUDANTES_FILIACOES_ID_ESTUDANTE',
    );

    // Remover tabela (as foreign keys serão removidas automaticamente)
    await queryRunner.dropTable('estudantes_filiacoes');
  }
}
