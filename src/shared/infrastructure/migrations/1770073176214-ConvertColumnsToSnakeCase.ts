import { MigrationInterface, QueryRunner } from 'typeorm';

export class ConvertColumnsToSnakeCase1770073176214 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // ====== ESTUDANTES TABLE ======
    if (
      (await queryRunner.hasColumn('estudantes', 'dataNascimento')) &&
      !(await queryRunner.hasColumn('estudantes', 'data_nascimento'))
    ) {
      await queryRunner.renameColumn(
        'estudantes',
        'dataNascimento',
        'data_nascimento',
      );
    }
    if (
      (await queryRunner.hasColumn('estudantes', 'numeroContato')) &&
      !(await queryRunner.hasColumn('estudantes', 'numero_contato'))
    ) {
      await queryRunner.renameColumn(
        'estudantes',
        'numeroContato',
        'numero_contato',
      );
    }
    if (
      (await queryRunner.hasColumn('estudantes', 'alergicoMedicamento')) &&
      !(await queryRunner.hasColumn('estudantes', 'alergico_medicamento'))
    ) {
      await queryRunner.renameColumn(
        'estudantes',
        'alergicoMedicamento',
        'alergico_medicamento',
      );
    }
    if (
      (await queryRunner.hasColumn('estudantes', 'alergiaAlimento')) &&
      !(await queryRunner.hasColumn('estudantes', 'alergia_alimento'))
    ) {
      await queryRunner.renameColumn(
        'estudantes',
        'alergiaAlimento',
        'alergia_alimento',
      );
    }
    if (
      (await queryRunner.hasColumn('estudantes', 'tratamentoMedico')) &&
      !(await queryRunner.hasColumn('estudantes', 'tratamento_medico'))
    ) {
      await queryRunner.renameColumn(
        'estudantes',
        'tratamentoMedico',
        'tratamento_medico',
      );
    }
    if (
      (await queryRunner.hasColumn('estudantes', 'medicacaoEspecifica')) &&
      !(await queryRunner.hasColumn('estudantes', 'medicacao_especifica'))
    ) {
      await queryRunner.renameColumn(
        'estudantes',
        'medicacaoEspecifica',
        'medicacao_especifica',
      );
    }
    if (
      (await queryRunner.hasColumn('estudantes', 'idResponsavelPagamento')) &&
      !(await queryRunner.hasColumn('estudantes', 'id_responsavel_pagamento'))
    ) {
      await queryRunner.renameColumn(
        'estudantes',
        'idResponsavelPagamento',
        'id_responsavel_pagamento',
      );
    }
    if (
      (await queryRunner.hasColumn('estudantes', 'dtCriacao')) &&
      !(await queryRunner.hasColumn('estudantes', 'dt_criacao'))
    ) {
      await queryRunner.renameColumn('estudantes', 'dtCriacao', 'dt_criacao');
    }
    if (
      (await queryRunner.hasColumn('estudantes', 'dtAtualizaca')) &&
      !(await queryRunner.hasColumn('estudantes', 'dt_atualizacao'))
    ) {
      await queryRunner.renameColumn(
        'estudantes',
        'dtAtualizaca',
        'dt_atualizacao',
      );
    }
    if (
      (await queryRunner.hasColumn('estudantes', 'dtDeletado')) &&
      !(await queryRunner.hasColumn('estudantes', 'dt_deletado'))
    ) {
      await queryRunner.renameColumn('estudantes', 'dtDeletado', 'dt_deletado');
    }

    // ====== FILIACOES TABLE ======
    if (
      (await queryRunner.hasColumn('filiacoes', 'dataNascimento')) &&
      !(await queryRunner.hasColumn('filiacoes', 'data_nascimento'))
    ) {
      await queryRunner.renameColumn(
        'filiacoes',
        'dataNascimento',
        'data_nascimento',
      );
    }
    if (
      (await queryRunner.hasColumn('filiacoes', 'estadoCivil')) &&
      !(await queryRunner.hasColumn('filiacoes', 'estado_civil'))
    ) {
      await queryRunner.renameColumn(
        'filiacoes',
        'estadoCivil',
        'estado_civil',
      );
    }
    if (
      (await queryRunner.hasColumn('filiacoes', 'enderecoRes')) &&
      !(await queryRunner.hasColumn('filiacoes', 'endereco_res'))
    ) {
      await queryRunner.renameColumn(
        'filiacoes',
        'enderecoRes',
        'endereco_res',
      );
    }
    if (
      (await queryRunner.hasColumn('filiacoes', 'numeroEndereco')) &&
      !(await queryRunner.hasColumn('filiacoes', 'numero_endereco'))
    ) {
      await queryRunner.renameColumn(
        'filiacoes',
        'numeroEndereco',
        'numero_endereco',
      );
    }
    if (
      (await queryRunner.hasColumn('filiacoes', 'telefoneResidencial')) &&
      !(await queryRunner.hasColumn('filiacoes', 'telefone_residencial'))
    ) {
      await queryRunner.renameColumn(
        'filiacoes',
        'telefoneResidencial',
        'telefone_residencial',
      );
    }
    if (
      (await queryRunner.hasColumn('filiacoes', 'nomeEnderecoComercial')) &&
      !(await queryRunner.hasColumn('filiacoes', 'nome_endereco_comercial'))
    ) {
      await queryRunner.renameColumn(
        'filiacoes',
        'nomeEnderecoComercial',
        'nome_endereco_comercial',
      );
    }
    if (
      (await queryRunner.hasColumn('filiacoes', 'telefoneComercial')) &&
      !(await queryRunner.hasColumn('filiacoes', 'telefone_comercial'))
    ) {
      await queryRunner.renameColumn(
        'filiacoes',
        'telefoneComercial',
        'telefone_comercial',
      );
    }
    if (
      (await queryRunner.hasColumn('filiacoes', 'telefoneComercial2')) &&
      !(await queryRunner.hasColumn('filiacoes', 'telefone_comercial2'))
    ) {
      await queryRunner.renameColumn(
        'filiacoes',
        'telefoneComercial2',
        'telefone_comercial2',
      );
    }
    if (
      (await queryRunner.hasColumn('filiacoes', 'outroTelefones')) &&
      !(await queryRunner.hasColumn('filiacoes', 'outro_telefones'))
    ) {
      await queryRunner.renameColumn(
        'filiacoes',
        'outroTelefones',
        'outro_telefones',
      );
    }
    if (
      (await queryRunner.hasColumn('filiacoes', 'idEstudante')) &&
      !(await queryRunner.hasColumn('filiacoes', 'id_estudante'))
    ) {
      await queryRunner.renameColumn(
        'filiacoes',
        'idEstudante',
        'id_estudante',
      );
    }
    if (
      (await queryRunner.hasColumn('filiacoes', 'dtCriacao')) &&
      !(await queryRunner.hasColumn('filiacoes', 'dt_criacao'))
    ) {
      await queryRunner.renameColumn('filiacoes', 'dtCriacao', 'dt_criacao');
    }
    if (
      (await queryRunner.hasColumn('filiacoes', 'dtAtualizacao')) &&
      !(await queryRunner.hasColumn('filiacoes', 'dt_atualizacao'))
    ) {
      await queryRunner.renameColumn(
        'filiacoes',
        'dtAtualizacao',
        'dt_atualizacao',
      );
    }
    if (
      (await queryRunner.hasColumn('filiacoes', 'dtDeletado')) &&
      !(await queryRunner.hasColumn('filiacoes', 'dt_deletado'))
    ) {
      await queryRunner.renameColumn('filiacoes', 'dtDeletado', 'dt_deletado');
    }

    // ====== MATRICULAS TABLE ======
    if (
      (await queryRunner.hasColumn('matriculas', 'idEstudante')) &&
      !(await queryRunner.hasColumn('matriculas', 'id_estudante'))
    ) {
      await queryRunner.renameColumn(
        'matriculas',
        'idEstudante',
        'id_estudante',
      );
    }
    if (
      (await queryRunner.hasColumn('matriculas', 'anoLetivo')) &&
      !(await queryRunner.hasColumn('matriculas', 'ano_letivo'))
    ) {
      await queryRunner.renameColumn('matriculas', 'anoLetivo', 'ano_letivo');
    }
    if (
      (await queryRunner.hasColumn('matriculas', 'idTurno')) &&
      !(await queryRunner.hasColumn('matriculas', 'id_turno'))
    ) {
      await queryRunner.renameColumn('matriculas', 'idTurno', 'id_turno');
    }
    if (
      (await queryRunner.hasColumn('matriculas', 'valorMensalidade')) &&
      !(await queryRunner.hasColumn('matriculas', 'valor_mensalidade'))
    ) {
      await queryRunner.renameColumn(
        'matriculas',
        'valorMensalidade',
        'valor_mensalidade',
      );
    }
    if (
      (await queryRunner.hasColumn('matriculas', 'idResponsavelPagamento')) &&
      !(await queryRunner.hasColumn('matriculas', 'id_responsavel_pagamento'))
    ) {
      await queryRunner.renameColumn(
        'matriculas',
        'idResponsavelPagamento',
        'id_responsavel_pagamento',
      );
    }
    if (
      (await queryRunner.hasColumn('matriculas', 'dtCriacao')) &&
      !(await queryRunner.hasColumn('matriculas', 'dt_criacao'))
    ) {
      await queryRunner.renameColumn('matriculas', 'dtCriacao', 'dt_criacao');
    }
    if (
      (await queryRunner.hasColumn('matriculas', 'dtAtualizacao')) &&
      !(await queryRunner.hasColumn('matriculas', 'dt_atualizacao'))
    ) {
      await queryRunner.renameColumn(
        'matriculas',
        'dtAtualizacao',
        'dt_atualizacao',
      );
    }
    if (
      (await queryRunner.hasColumn('matriculas', 'dtDeletado')) &&
      !(await queryRunner.hasColumn('matriculas', 'dt_deletado'))
    ) {
      await queryRunner.renameColumn('matriculas', 'dtDeletado', 'dt_deletado');
    }

    // ====== TURNO TABLE ======
    if (
      (await queryRunner.hasColumn('turno', 'horaInicio')) &&
      !(await queryRunner.hasColumn('turno', 'hora_inicio'))
    ) {
      await queryRunner.renameColumn('turno', 'horaInicio', 'hora_inicio');
    }
    if (
      (await queryRunner.hasColumn('turno', 'horaFim')) &&
      !(await queryRunner.hasColumn('turno', 'hora_fim'))
    ) {
      await queryRunner.renameColumn('turno', 'horaFim', 'hora_fim');
    }
    if (
      (await queryRunner.hasColumn('turno', 'tipoAula')) &&
      !(await queryRunner.hasColumn('turno', 'tipo_aula'))
    ) {
      await queryRunner.renameColumn('turno', 'tipoAula', 'tipo_aula');
    }
    if (
      (await queryRunner.hasColumn('turno', 'dtCriacao')) &&
      !(await queryRunner.hasColumn('turno', 'dt_criacao'))
    ) {
      await queryRunner.renameColumn('turno', 'dtCriacao', 'dt_criacao');
    }
    if (
      (await queryRunner.hasColumn('turno', 'dtAtualizacao')) &&
      !(await queryRunner.hasColumn('turno', 'dt_atualizacao'))
    ) {
      await queryRunner.renameColumn(
        'turno',
        'dtAtualizacao',
        'dt_atualizacao',
      );
    }
    if (
      (await queryRunner.hasColumn('turno', 'dtDeletado')) &&
      !(await queryRunner.hasColumn('turno', 'dt_deletado'))
    ) {
      await queryRunner.renameColumn('turno', 'dtDeletado', 'dt_deletado');
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // ====== TURNO TABLE ======
    if (
      (await queryRunner.hasColumn('turno', 'dt_deletado')) &&
      !(await queryRunner.hasColumn('turno', 'dtDeletado'))
    ) {
      await queryRunner.renameColumn('turno', 'dt_deletado', 'dtDeletado');
    }
    if (
      (await queryRunner.hasColumn('turno', 'dt_atualizacao')) &&
      !(await queryRunner.hasColumn('turno', 'dtAtualizacao'))
    ) {
      await queryRunner.renameColumn(
        'turno',
        'dt_atualizacao',
        'dtAtualizacao',
      );
    }
    if (
      (await queryRunner.hasColumn('turno', 'dt_criacao')) &&
      !(await queryRunner.hasColumn('turno', 'dtCriacao'))
    ) {
      await queryRunner.renameColumn('turno', 'dt_criacao', 'dtCriacao');
    }
    if (
      (await queryRunner.hasColumn('turno', 'tipo_aula')) &&
      !(await queryRunner.hasColumn('turno', 'tipoAula'))
    ) {
      await queryRunner.renameColumn('turno', 'tipo_aula', 'tipoAula');
    }
    if (
      (await queryRunner.hasColumn('turno', 'hora_fim')) &&
      !(await queryRunner.hasColumn('turno', 'horaFim'))
    ) {
      await queryRunner.renameColumn('turno', 'hora_fim', 'horaFim');
    }
    if (
      (await queryRunner.hasColumn('turno', 'hora_inicio')) &&
      !(await queryRunner.hasColumn('turno', 'horaInicio'))
    ) {
      await queryRunner.renameColumn('turno', 'hora_inicio', 'horaInicio');
    }

    // ====== MATRICULAS TABLE ======
    if (
      (await queryRunner.hasColumn('matriculas', 'dt_deletado')) &&
      !(await queryRunner.hasColumn('matriculas', 'dtDeletado'))
    ) {
      await queryRunner.renameColumn('matriculas', 'dt_deletado', 'dtDeletado');
    }
    if (
      (await queryRunner.hasColumn('matriculas', 'dt_atualizacao')) &&
      !(await queryRunner.hasColumn('matriculas', 'dtAtualizacao'))
    ) {
      await queryRunner.renameColumn(
        'matriculas',
        'dt_atualizacao',
        'dtAtualizacao',
      );
    }
    if (
      (await queryRunner.hasColumn('matriculas', 'dt_criacao')) &&
      !(await queryRunner.hasColumn('matriculas', 'dtCriacao'))
    ) {
      await queryRunner.renameColumn('matriculas', 'dt_criacao', 'dtCriacao');
    }
    if (
      (await queryRunner.hasColumn('matriculas', 'id_responsavel_pagamento')) &&
      !(await queryRunner.hasColumn('matriculas', 'idResponsavelPagamento'))
    ) {
      await queryRunner.renameColumn(
        'matriculas',
        'id_responsavel_pagamento',
        'idResponsavelPagamento',
      );
    }
    if (
      (await queryRunner.hasColumn('matriculas', 'valor_mensalidade')) &&
      !(await queryRunner.hasColumn('matriculas', 'valorMensalidade'))
    ) {
      await queryRunner.renameColumn(
        'matriculas',
        'valor_mensalidade',
        'valorMensalidade',
      );
    }
    if (
      (await queryRunner.hasColumn('matriculas', 'id_turno')) &&
      !(await queryRunner.hasColumn('matriculas', 'idTurno'))
    ) {
      await queryRunner.renameColumn('matriculas', 'id_turno', 'idTurno');
    }
    if (
      (await queryRunner.hasColumn('matriculas', 'ano_letivo')) &&
      !(await queryRunner.hasColumn('matriculas', 'anoLetivo'))
    ) {
      await queryRunner.renameColumn('matriculas', 'ano_letivo', 'anoLetivo');
    }
    if (
      (await queryRunner.hasColumn('matriculas', 'id_estudante')) &&
      !(await queryRunner.hasColumn('matriculas', 'idEstudante'))
    ) {
      await queryRunner.renameColumn(
        'matriculas',
        'id_estudante',
        'idEstudante',
      );
    }

    // ====== FILIACOES TABLE ======
    if (
      (await queryRunner.hasColumn('filiacoes', 'dt_deletado')) &&
      !(await queryRunner.hasColumn('filiacoes', 'dtDeletado'))
    ) {
      await queryRunner.renameColumn('filiacoes', 'dt_deletado', 'dtDeletado');
    }
    if (
      (await queryRunner.hasColumn('filiacoes', 'dt_atualizacao')) &&
      !(await queryRunner.hasColumn('filiacoes', 'dtAtualizacao'))
    ) {
      await queryRunner.renameColumn(
        'filiacoes',
        'dt_atualizacao',
        'dtAtualizacao',
      );
    }
    if (
      (await queryRunner.hasColumn('filiacoes', 'dt_criacao')) &&
      !(await queryRunner.hasColumn('filiacoes', 'dtCriacao'))
    ) {
      await queryRunner.renameColumn('filiacoes', 'dt_criacao', 'dtCriacao');
    }
    if (
      (await queryRunner.hasColumn('filiacoes', 'id_estudante')) &&
      !(await queryRunner.hasColumn('filiacoes', 'idEstudante'))
    ) {
      await queryRunner.renameColumn(
        'filiacoes',
        'id_estudante',
        'idEstudante',
      );
    }
    if (
      (await queryRunner.hasColumn('filiacoes', 'outro_telefones')) &&
      !(await queryRunner.hasColumn('filiacoes', 'outroTelefones'))
    ) {
      await queryRunner.renameColumn(
        'filiacoes',
        'outro_telefones',
        'outroTelefones',
      );
    }
    if (
      (await queryRunner.hasColumn('filiacoes', 'telefone_comercial2')) &&
      !(await queryRunner.hasColumn('filiacoes', 'telefoneComercial2'))
    ) {
      await queryRunner.renameColumn(
        'filiacoes',
        'telefone_comercial2',
        'telefoneComercial2',
      );
    }
    if (
      (await queryRunner.hasColumn('filiacoes', 'telefone_comercial')) &&
      !(await queryRunner.hasColumn('filiacoes', 'telefoneComercial'))
    ) {
      await queryRunner.renameColumn(
        'filiacoes',
        'telefone_comercial',
        'telefoneComercial',
      );
    }
    if (
      (await queryRunner.hasColumn('filiacoes', 'nome_endereco_comercial')) &&
      !(await queryRunner.hasColumn('filiacoes', 'nomeEnderecoComercial'))
    ) {
      await queryRunner.renameColumn(
        'filiacoes',
        'nome_endereco_comercial',
        'nomeEnderecoComercial',
      );
    }
    if (
      (await queryRunner.hasColumn('filiacoes', 'telefone_residencial')) &&
      !(await queryRunner.hasColumn('filiacoes', 'telefoneResidencial'))
    ) {
      await queryRunner.renameColumn(
        'filiacoes',
        'telefone_residencial',
        'telefoneResidencial',
      );
    }
    if (
      (await queryRunner.hasColumn('filiacoes', 'numero_endereco')) &&
      !(await queryRunner.hasColumn('filiacoes', 'numeroEndereco'))
    ) {
      await queryRunner.renameColumn(
        'filiacoes',
        'numero_endereco',
        'numeroEndereco',
      );
    }
    if (
      (await queryRunner.hasColumn('filiacoes', 'endereco_res')) &&
      !(await queryRunner.hasColumn('filiacoes', 'enderecoRes'))
    ) {
      await queryRunner.renameColumn(
        'filiacoes',
        'endereco_res',
        'enderecoRes',
      );
    }
    if (
      (await queryRunner.hasColumn('filiacoes', 'estado_civil')) &&
      !(await queryRunner.hasColumn('filiacoes', 'estadoCivil'))
    ) {
      await queryRunner.renameColumn(
        'filiacoes',
        'estado_civil',
        'estadoCivil',
      );
    }
    if (
      (await queryRunner.hasColumn('filiacoes', 'data_nascimento')) &&
      !(await queryRunner.hasColumn('filiacoes', 'dataNascimento'))
    ) {
      await queryRunner.renameColumn(
        'filiacoes',
        'data_nascimento',
        'dataNascimento',
      );
    }

    // ====== ESTUDANTES TABLE ======
    if (
      (await queryRunner.hasColumn('estudantes', 'dt_deletado')) &&
      !(await queryRunner.hasColumn('estudantes', 'dtDeletado'))
    ) {
      await queryRunner.renameColumn('estudantes', 'dt_deletado', 'dtDeletado');
    }
    if (
      (await queryRunner.hasColumn('estudantes', 'dt_atualizacao')) &&
      !(await queryRunner.hasColumn('estudantes', 'dtAtualizaca'))
    ) {
      await queryRunner.renameColumn(
        'estudantes',
        'dt_atualizacao',
        'dtAtualizaca',
      );
    }
    if (
      (await queryRunner.hasColumn('estudantes', 'dt_criacao')) &&
      !(await queryRunner.hasColumn('estudantes', 'dtCriacao'))
    ) {
      await queryRunner.renameColumn('estudantes', 'dt_criacao', 'dtCriacao');
    }
    if (
      (await queryRunner.hasColumn('estudantes', 'id_responsavel_pagamento')) &&
      !(await queryRunner.hasColumn('estudantes', 'idResponsavelPagamento'))
    ) {
      await queryRunner.renameColumn(
        'estudantes',
        'id_responsavel_pagamento',
        'idResponsavelPagamento',
      );
    }
    if (
      (await queryRunner.hasColumn('estudantes', 'medicacao_especifica')) &&
      !(await queryRunner.hasColumn('estudantes', 'medicacaoEspecifica'))
    ) {
      await queryRunner.renameColumn(
        'estudantes',
        'medicacao_especifica',
        'medicacaoEspecifica',
      );
    }
    if (
      (await queryRunner.hasColumn('estudantes', 'tratamento_medico')) &&
      !(await queryRunner.hasColumn('estudantes', 'tratamentoMedico'))
    ) {
      await queryRunner.renameColumn(
        'estudantes',
        'tratamento_medico',
        'tratamentoMedico',
      );
    }
    if (
      (await queryRunner.hasColumn('estudantes', 'alergia_alimento')) &&
      !(await queryRunner.hasColumn('estudantes', 'alergiaAlimento'))
    ) {
      await queryRunner.renameColumn(
        'estudantes',
        'alergia_alimento',
        'alergiaAlimento',
      );
    }
    if (
      (await queryRunner.hasColumn('estudantes', 'alergico_medicamento')) &&
      !(await queryRunner.hasColumn('estudantes', 'alergicoMedicamento'))
    ) {
      await queryRunner.renameColumn(
        'estudantes',
        'alergico_medicamento',
        'alergicoMedicamento',
      );
    }
    if (
      (await queryRunner.hasColumn('estudantes', 'numero_contato')) &&
      !(await queryRunner.hasColumn('estudantes', 'numeroContato'))
    ) {
      await queryRunner.renameColumn(
        'estudantes',
        'numero_contato',
        'numeroContato',
      );
    }
    if (
      (await queryRunner.hasColumn('estudantes', 'data_nascimento')) &&
      !(await queryRunner.hasColumn('estudantes', 'dataNascimento'))
    ) {
      await queryRunner.renameColumn(
        'estudantes',
        'data_nascimento',
        'dataNascimento',
      );
    }
  }
}
