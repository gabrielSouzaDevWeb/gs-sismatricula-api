import {
  IsDateString,
  IsIn,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { Estudante } from '../infrastructure/entities/estudante.entity';

export class UpdateEstudanteDto implements Partial<Estudante> {
  @IsOptional()
  @IsString()
  @MaxLength(255)
  nome?: string;

  @IsOptional()
  @IsDateString()
  dataNascimento?: string;

  @IsOptional()
  @IsString()
  @IsIn(['M', 'F'])
  sexo?: string;

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
}
