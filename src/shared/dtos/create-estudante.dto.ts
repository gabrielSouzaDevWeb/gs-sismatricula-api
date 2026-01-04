import {
  IsDateString,
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator';

export class CreateEstudanteDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  nome: string;

  @IsDateString()
  dataNascimento: string;

  @IsString()
  @IsIn(['M', 'F'])
  sexo: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  serie: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  escola: string;

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
  @IsUUID()
  idResponsavelPagamento?: string;
}
