import { MigrationInterface, QueryRunner } from 'typeorm';

export class ConvertColumnsToSnakeCase1770073176214 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // ====== ESTUDANTES TABLE ======
    if (await queryRunner.hasColumn('estudantes', 'dataNascimento')) {
      await queryRunner.renameColumn(
        'estudantes',
        'dataNascimento',
        'data_nascimento',
      );
    }
    if (await queryRunner.hasColumn('estudantes', 'numeroContato')) {
      await queryRunner.renameColumn(
        'estudantes',
        'numeroContato',
        'numero_contato',
      );
    }
    if (await queryRunner.hasColumn('estudantes', 'alergicoMedicamento')) {
      await queryRunner.renameColumn(
        'estudantes',
        'alergicoMedicamento',
        'alergico_medicamento',
      );
    }
    if (await queryRunner.hasColumn('estudantes', 'alergiaAlimento')) {
      await queryRunner.renameColumn(
        'estudantes',
        'alergiaAlimento',
        'alergia_alimento',
      );
    }
    if (await queryRunner.hasColumn('estudantes', 'tratamentoMedico')) {
      await queryRunner.renameColumn(
        'estudantes',
        'tratamentoMedico',
        'tratamento_medico',
      );
    }
    if (await queryRunner.hasColumn('estudantes', 'medicacaoEspecifica')) {
      await queryRunner.renameColumn(
        'estudantes',
        'medicacaoEspecifica',
        'medicacao_especifica',
      );
    }
    if (await queryRunner.hasColumn('estudantes', 'idResponsavelPagamento')) {
      await queryRunner.renameColumn(
        'estudantes',
        'idResponsavelPagamento',
        'id_responsavel_pagamento',
      );
    }
    if (await queryRunner.hasColumn('estudantes', 'dtCriacao')) {
      await queryRunner.renameColumn('estudantes', 'dtCriacao', 'dt_criacao');
    }
    if (await queryRunner.hasColumn('estudantes', 'dtAtualizaca')) {
      await queryRunner.renameColumn(
        'estudantes',
        'dtAtualizaca',
        'dt_atualizacao',
      );
    }
    if (await queryRunner.hasColumn('estudantes', 'dtDeletado')) {
      await queryRunner.renameColumn('estudantes', 'dtDeletado', 'dt_deletado');
    }

    // ====== FILIACOES TABLE ======
    if (await queryRunner.hasColumn('filiacoes', 'dataNascimento')) {
      await queryRunner.renameColumn(
        'filiacoes',
        'dataNascimento',
        'data_nascimento',
      );
    }
    if (await queryRunner.hasColumn('filiacoes', 'estadoCivil')) {
      await queryRunner.renameColumn(
        'filiacoes',
        'estadoCivil',
        'estado_civil',
      );
    }
    if (await queryRunner.hasColumn('filiacoes', 'enderecoRes')) {
      await queryRunner.renameColumn(
        'filiacoes',
        'enderecoRes',
        'endereco_res',
      );
    }
    if (await queryRunner.hasColumn('filiacoes', 'numeroEndereco')) {
      await queryRunner.renameColumn(
        'filiacoes',
        'numeroEndereco',
        'numero_endereco',
      );
    }
    if (await queryRunner.hasColumn('filiacoes', 'telefoneResidencial')) {
      await queryRunner.renameColumn(
        'filiacoes',
        'telefoneResidencial',
        'telefone_residencial',
      );
    }
    if (await queryRunner.hasColumn('filiacoes', 'nomeEnderecoComercial')) {
      await queryRunner.renameColumn(
        'filiacoes',
        'nomeEnderecoComercial',
        'nome_endereco_comercial',
      );
    }
    if (await queryRunner.hasColumn('filiacoes', 'telefoneComercial')) {
      await queryRunner.renameColumn(
        'filiacoes',
        'telefoneComercial',
        'telefone_comercial',
      );
    }
    if (await queryRunner.hasColumn('filiacoes', 'telefoneComercial2')) {
      await queryRunner.renameColumn(
        'filiacoes',
        'telefoneComercial2',
        'telefone_comercial2',
      );
    }
    if (await queryRunner.hasColumn('filiacoes', 'outroTelefones')) {
      await queryRunner.renameColumn(
        'filiacoes',
        'outroTelefones',
        'outro_telefones',
      );
    }
    if (await queryRunner.hasColumn('filiacoes', 'idEstudante')) {
      await queryRunner.renameColumn(
        'filiacoes',
        'idEstudante',
        'id_estudante',
      );
    }
    if (await queryRunner.hasColumn('filiacoes', 'dtCriacao')) {
      await queryRunner.renameColumn('filiacoes', 'dtCriacao', 'dt_criacao');
    }
    if (await queryRunner.hasColumn('filiacoes', 'dtAtualizacao')) {
      await queryRunner.renameColumn(
        'filiacoes',
        'dtAtualizacao',
        'dt_atualizacao',
      );
    }
    if (await queryRunner.hasColumn('filiacoes', 'dtDeletado')) {
      await queryRunner.renameColumn('filiacoes', 'dtDeletado', 'dt_deletado');
    }

    // ====== MATRICULAS TABLE ======
    if (await queryRunner.hasColumn('matriculas', 'idEstudante')) {
      await queryRunner.renameColumn(
        'matriculas',
        'idEstudante',
        'id_estudante',
      );
    }
    if (await queryRunner.hasColumn('matriculas', 'anoLetivo')) {
      await queryRunner.renameColumn('matriculas', 'anoLetivo', 'ano_letivo');
    }
    if (await queryRunner.hasColumn('matriculas', 'idTurno')) {
      await queryRunner.renameColumn('matriculas', 'idTurno', 'id_turno');
    }
    if (await queryRunner.hasColumn('matriculas', 'valorMensalidade')) {
      await queryRunner.renameColumn(
        'matriculas',
        'valorMensalidade',
        'valor_mensalidade',
      );
    }
    if (await queryRunner.hasColumn('matriculas', 'idResponsavelPagamento')) {
      await queryRunner.renameColumn(
        'matriculas',
        'idResponsavelPagamento',
        'id_responsavel_pagamento',
      );
    }
    if (await queryRunner.hasColumn('matriculas', 'dtCriacao')) {
      await queryRunner.renameColumn('matriculas', 'dtCriacao', 'dt_criacao');
    }
    if (await queryRunner.hasColumn('matriculas', 'dtAtualizacao')) {
      await queryRunner.renameColumn(
        'matriculas',
        'dtAtualizacao',
        'dt_atualizacao',
      );
    }
    if (await queryRunner.hasColumn('matriculas', 'dtDeletado')) {
      await queryRunner.renameColumn('matriculas', 'dtDeletado', 'dt_deletado');
    }

    // ====== TURNO TABLE ======
    if (await queryRunner.hasColumn('turno', 'horaInicio')) {
      await queryRunner.renameColumn('turno', 'horaInicio', 'hora_inicio');
    }
    if (await queryRunner.hasColumn('turno', 'horaFim')) {
      await queryRunner.renameColumn('turno', 'horaFim', 'hora_fim');
    }
    if (await queryRunner.hasColumn('turno', 'tipoAula')) {
      await queryRunner.renameColumn('turno', 'tipoAula', 'tipo_aula');
    }
    if (await queryRunner.hasColumn('turno', 'dtCriacao')) {
      await queryRunner.renameColumn('turno', 'dtCriacao', 'dt_criacao');
    }
    if (await queryRunner.hasColumn('turno', 'dtAtualizacao')) {
      await queryRunner.renameColumn(
        'turno',
        'dtAtualizacao',
        'dt_atualizacao',
      );
    }
    if (await queryRunner.hasColumn('turno', 'dtDeletado')) {
      await queryRunner.renameColumn('turno', 'dtDeletado', 'dt_deletado');
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Aplicar mesma lógica para down() - verificar colunas em snake_case antes de renomear
    // ... (aplicar o mesmo padrão de hasColumn)
  }
}
