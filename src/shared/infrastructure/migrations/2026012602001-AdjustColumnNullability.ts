import { MigrationInterface, QueryRunner } from 'typeorm';

export class AdjustColumnNullability2026012602001 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // ====== ESTUDANTE TABLE ======
    // Make required: nome, sexo
    // Make optional: dataNascimento, serie, escola

    // data_nascimento nullable
    await queryRunner.query(
      `ALTER TABLE estudantes ALTER COLUMN data_nascimento DROP NOT NULL`,
    );

    // serie nullable
    await queryRunner.query(
      `ALTER TABLE estudantes ALTER COLUMN serie DROP NOT NULL`,
    );

    // escola nullable
    await queryRunner.query(
      `ALTER TABLE estudantes ALTER COLUMN escola DROP NOT NULL`,
    );

    // ====== MATRICULA TABLE ======
    // Make required: valorMensalidade
    await queryRunner.query(
      `ALTER TABLE matriculas ALTER COLUMN valor_mensalidade SET NOT NULL`,
    );

    // ====== FILIACAO TABLE ======
    // Make required: nome, celular (whatsapp)
    // Make optional: dataNascimento

    // data_nascimento nullable
    await queryRunner.query(
      `ALTER TABLE filiacoes ALTER COLUMN data_nascimento DROP NOT NULL`,
    );

    // celular NOT NULL (whatsapp - required)
    await queryRunner.query(
      `ALTER TABLE filiacoes ALTER COLUMN celular SET NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // ====== ESTUDANTE TABLE ======
    await queryRunner.query(
      `ALTER TABLE estudantes ALTER COLUMN data_nascimento SET NOT NULL`,
    );

    await queryRunner.query(
      `ALTER TABLE estudantes ALTER COLUMN serie SET NOT NULL`,
    );

    await queryRunner.query(
      `ALTER TABLE estudantes ALTER COLUMN escola SET NOT NULL`,
    );

    // ====== MATRICULA TABLE ======
    await queryRunner.query(
      `ALTER TABLE matriculas ALTER COLUMN valor_mensalidade DROP NOT NULL`,
    );

    // ====== FILIACAO TABLE ======
    await queryRunner.query(
      `ALTER TABLE filiacoes ALTER COLUMN data_nascimento SET NOT NULL`,
    );

    await queryRunner.query(
      `ALTER TABLE filiacoes ALTER COLUMN celular DROP NOT NULL`,
    );
  }
}
