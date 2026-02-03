import { MigrationInterface, QueryRunner } from 'typeorm';

export class MigrateDataToEstudantesFiliacoes1770073223110 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Migrar dados existentes da tabela filiacoes para a nova tabela de relacionamento
    // Esta query pega todas as filiações que possuem id_estudante e insere na tabela intermediária
    await queryRunner.query(`
      INSERT INTO estudantes_filiacoes (id_estudante, id_filiacao, dt_criacao, dt_atualizacao, dt_deletado)
      SELECT 
        f.id_estudante,
        f.id,
        f.dt_criacao,
        f.dt_atualizacao,
        f.dt_deletado
      FROM filiacoes f
      WHERE f.id_estudante IS NOT NULL
      AND NOT EXISTS (
        SELECT 1 
        FROM estudantes_filiacoes ef 
        WHERE ef.id_estudante = f.id_estudante 
        AND ef.id_filiacao = f.id
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Reverter a migração de dados
    // Limpar a tabela de relacionamento
    await queryRunner.query(`DELETE FROM estudantes_filiacoes`);
  }
}
