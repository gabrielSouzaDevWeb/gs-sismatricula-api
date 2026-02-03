import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class RemoveIdEstudanteFromFiliacoes1770073237507 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Verificar se a foreign key existe antes de tentar remover
    const table = await queryRunner.getTable('filiacoes');
    const foreignKey = table?.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('id_estudante') !== -1,
    );

    // Remover a foreign key se existir
    if (foreignKey) {
      await queryRunner.dropForeignKey('filiacoes', foreignKey);
    }

    // Verificar se a coluna existe antes de tentar remover
    const columnExists = table?.columns.some(
      (col) => col.name === 'id_estudante',
    );

    if (columnExists) {
      // Remover a coluna id_estudante da tabela filiacoes
      await queryRunner.dropColumn('filiacoes', 'id_estudante');
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Recriar a coluna id_estudante
    await queryRunner.addColumn(
      'filiacoes',
      new TableColumn({
        name: 'id_estudante',
        type: 'int',
        isNullable: true,
      }),
    );

    // Recriar a foreign key
    await queryRunner.createForeignKey(
      'filiacoes',
      new TableForeignKey({
        columnNames: ['id_estudante'],
        referencedColumnNames: ['id'],
        referencedTableName: 'estudantes',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );

    // Restaurar os dados da relação antiga
    await queryRunner.query(`
      UPDATE filiacoes f
      SET id_estudante = (
        SELECT ef.id_estudante 
        FROM estudantes_filiacoes ef 
        WHERE ef.id_filiacao = f.id 
        LIMIT 1
      )
      WHERE EXISTS (
        SELECT 1 
        FROM estudantes_filiacoes ef 
        WHERE ef.id_filiacao = f.id
      )
    `);
  }
}
