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
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  nome: string;

  @IsOptional()
  @IsDateString()
  dataNascimento?: string;

  @IsString()
  @IsNotEmpty()
  @IsIn(['M', 'F'])
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
