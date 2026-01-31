import {
  IsDateString,
  IsIn,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateEstudanteDto {
  @IsString({ message: 'O nome deve ser uma texto válida' })
  @IsNotEmpty({ message: 'O nome é obrigatório' })
  @MaxLength(255, { message: 'O nome não pode ter mais de 255 caracteres' })
  nome: string;

  @IsOptional()
  @IsDateString()
  dataNascimento?: string;

  @IsString({ message: 'O sexo deve ser uma texto válida' })
  @IsNotEmpty({ message: 'O sexo é obrigatório' })
  @IsIn(['M', 'F'], {
    message: 'O sexo deve ser "M" (masculino) ou "F" (feminino)',
  })
  sexo: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  serie?: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  escola?: string;

  @IsOptional()
  @IsString()
  @MaxLength(20)
  numeroContato?: string;

  @IsOptional()
  @IsString()
  alergicoMedicamento?: string;

  @IsOptional()
  @IsString()
  alergiaAlimento?: string;

  @IsOptional()
  @IsString()
  tratamentoMedico?: string;

  @IsOptional()
  @IsString()
  medicacaoEspecifica?: string;

  @IsOptional()
  @IsInt()
  idResponsavelPagamento?: number;
}
