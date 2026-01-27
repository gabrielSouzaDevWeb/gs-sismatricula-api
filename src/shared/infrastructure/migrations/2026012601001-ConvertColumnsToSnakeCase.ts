import { MigrationInterface, QueryRunner } from 'typeorm';

export class ConvertColumnsToSnakeCase2026012601001 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // ====== ESTUDANTES TABLE ======
    await queryRunner.renameColumn(
      'estudantes',
      'dataNascimento',
      'data_nascimento',
    );
    await queryRunner.renameColumn(
      'estudantes',
      'numeroContato',
      'numero_contato',
    );
    await queryRunner.renameColumn(
      'estudantes',
      'alergicoMedicamento',
      'alergico_medicamento',
    );
    await queryRunner.renameColumn(
      'estudantes',
      'alergiaAlimento',
      'alergia_alimento',
    );
    await queryRunner.renameColumn(
      'estudantes',
      'tratamentoMedico',
      'tratamento_medico',
    );
    await queryRunner.renameColumn(
      'estudantes',
      'medicacaoEspecifica',
      'medicacao_especifica',
    );
    await queryRunner.renameColumn(
      'estudantes',
      'idResponsavelPagamento',
      'id_responsavel_pagamento',
    );
    await queryRunner.renameColumn('estudantes', 'dtCriacao', 'dt_criacao');
    await queryRunner.renameColumn(
      'estudantes',
      'dtAtualizaca',
      'dt_atualizacao',
    );
    await queryRunner.renameColumn('estudantes', 'dtDeletado', 'dt_deletado');

    // ====== FILIACOES TABLE ======
    await queryRunner.renameColumn(
      'filiacoes',
      'dataNascimento',
      'data_nascimento',
    );
    await queryRunner.renameColumn('filiacoes', 'estadoCivil', 'estado_civil');
    await queryRunner.renameColumn('filiacoes', 'enderecoRes', 'endereco_res');
    await queryRunner.renameColumn(
      'filiacoes',
      'numeroEndereco',
      'numero_endereco',
    );
    await queryRunner.renameColumn(
      'filiacoes',
      'telefoneResidencial',
      'telefone_residencial',
    );
    await queryRunner.renameColumn('filiacoes', 'profissao', 'profissao');
    await queryRunner.renameColumn(
      'filiacoes',
      'nomeEnderecoComercial',
      'nome_endereco_comercial',
    );
    await queryRunner.renameColumn(
      'filiacoes',
      'telefoneComercial',
      'telefone_comercial',
    );
    await queryRunner.renameColumn(
      'filiacoes',
      'telefoneComercial2',
      'telefone_comercial2',
    );
    await queryRunner.renameColumn(
      'filiacoes',
      'outroTelefones',
      'outro_telefones',
    );
    await queryRunner.renameColumn('filiacoes', 'idEstudante', 'id_estudante');
    await queryRunner.renameColumn('filiacoes', 'dtCriacao', 'dt_criacao');
    await queryRunner.renameColumn(
      'filiacoes',
      'dtAtualizacao',
      'dt_atualizacao',
    );
    await queryRunner.renameColumn('filiacoes', 'dtDeletado', 'dt_deletado');

    // ====== MATRICULAS TABLE ======
    await queryRunner.renameColumn('matriculas', 'idEstudante', 'id_estudante');
    await queryRunner.renameColumn('matriculas', 'anoLetivo', 'ano_letivo');
    await queryRunner.renameColumn('matriculas', 'idTurno', 'id_turno');
    await queryRunner.renameColumn(
      'matriculas',
      'valorMensalidade',
      'valor_mensalidade',
    );
    await queryRunner.renameColumn(
      'matriculas',
      'idResponsavelPagamento',
      'id_responsavel_pagamento',
    );
    await queryRunner.renameColumn('matriculas', 'dtCriacao', 'dt_criacao');
    await queryRunner.renameColumn(
      'matriculas',
      'dtAtualizacao',
      'dt_atualizacao',
    );
    await queryRunner.renameColumn('matriculas', 'dtDeletado', 'dt_deletado');

    // ====== TURNO TABLE ======
    await queryRunner.renameColumn('turno', 'horaInicio', 'hora_inicio');
    await queryRunner.renameColumn('turno', 'horaFim', 'hora_fim');
    await queryRunner.renameColumn('turno', 'tipoAula', 'tipo_aula');
    await queryRunner.renameColumn('turno', 'dtCriacao', 'dt_criacao');
    await queryRunner.renameColumn('turno', 'dtAtualizacao', 'dt_atualizacao');
    await queryRunner.renameColumn('turno', 'dtDeletado', 'dt_deletado');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // ====== ESTUDANTES TABLE ======
    await queryRunner.renameColumn(
      'estudantes',
      'data_nascimento',
      'dataNascimento',
    );
    await queryRunner.renameColumn(
      'estudantes',
      'numero_contato',
      'numeroContato',
    );
    await queryRunner.renameColumn(
      'estudantes',
      'alergico_medicamento',
      'alergicoMedicamento',
    );
    await queryRunner.renameColumn(
      'estudantes',
      'alergia_alimento',
      'alergiaAlimento',
    );
    await queryRunner.renameColumn(
      'estudantes',
      'tratamento_medico',
      'tratamentoMedico',
    );
    await queryRunner.renameColumn(
      'estudantes',
      'medicacao_especifica',
      'medicacaoEspecifica',
    );
    await queryRunner.renameColumn(
      'estudantes',
      'id_responsavel_pagamento',
      'idResponsavelPagamento',
    );
    await queryRunner.renameColumn('estudantes', 'dt_criacao', 'dtCriacao');
    await queryRunner.renameColumn(
      'estudantes',
      'dt_atualizacao',
      'dtAtualizaca',
    );
    await queryRunner.renameColumn('estudantes', 'dt_deletado', 'dtDeletado');

    // ====== FILIACOES TABLE ======
    await queryRunner.renameColumn(
      'filiacoes',
      'data_nascimento',
      'dataNascimento',
    );
    await queryRunner.renameColumn('filiacoes', 'estado_civil', 'estadoCivil');
    await queryRunner.renameColumn('filiacoes', 'endereco_res', 'enderecoRes');
    await queryRunner.renameColumn(
      'filiacoes',
      'numero_endereco',
      'numeroEndereco',
    );
    await queryRunner.renameColumn(
      'filiacoes',
      'telefone_residencial',
      'telefoneResidencial',
    );
    await queryRunner.renameColumn(
      'filiacoes',
      'nome_endereco_comercial',
      'nomeEnderecoComercial',
    );
    await queryRunner.renameColumn(
      'filiacoes',
      'telefone_comercial',
      'telefoneComercial',
    );
    await queryRunner.renameColumn(
      'filiacoes',
      'telefone_comercial2',
      'telefoneComercial2',
    );
    await queryRunner.renameColumn(
      'filiacoes',
      'outro_telefones',
      'outroTelefones',
    );
    await queryRunner.renameColumn('filiacoes', 'id_estudante', 'idEstudante');
    await queryRunner.renameColumn('filiacoes', 'dt_criacao', 'dtCriacao');
    await queryRunner.renameColumn(
      'filiacoes',
      'dt_atualizacao',
      'dtAtualizacao',
    );
    await queryRunner.renameColumn('filiacoes', 'dt_deletado', 'dtDeletado');

    // ====== MATRICULAS TABLE ======
    await queryRunner.renameColumn('matriculas', 'id_estudante', 'idEstudante');
    await queryRunner.renameColumn('matriculas', 'ano_letivo', 'anoLetivo');
    await queryRunner.renameColumn('matriculas', 'id_turno', 'idTurno');
    await queryRunner.renameColumn(
      'matriculas',
      'valor_mensalidade',
      'valorMensalidade',
    );
    await queryRunner.renameColumn(
      'matriculas',
      'id_responsavel_pagamento',
      'idResponsavelPagamento',
    );
    await queryRunner.renameColumn('matriculas', 'dt_criacao', 'dtCriacao');
    await queryRunner.renameColumn(
      'matriculas',
      'dt_atualizacao',
      'dtAtualizacao',
    );
    await queryRunner.renameColumn('matriculas', 'dt_deletado', 'dtDeletado');

    // ====== TURNO TABLE ======
    await queryRunner.renameColumn('turno', 'hora_inicio', 'horaInicio');
    await queryRunner.renameColumn('turno', 'hora_fim', 'horaFim');
    await queryRunner.renameColumn('turno', 'tipo_aula', 'tipoAula');
    await queryRunner.renameColumn('turno', 'dt_criacao', 'dtCriacao');
    await queryRunner.renameColumn('turno', 'dt_atualizacao', 'dtAtualizacao');
    await queryRunner.renameColumn('turno', 'dt_deletado', 'dtDeletado');
  }
}
