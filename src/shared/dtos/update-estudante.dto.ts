import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsDateString,
  IsIn,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { Estudante } from '../infrastructure/entities/estudante.entity';

export class UpdateEstudanteDto implements Partial<Estudante> {
  @ApiPropertyOptional({
    description: 'Nome completo do estudante',
    example: 'João da Silva',
    maxLength: 255,
  })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  nome?: string;

  @ApiPropertyOptional({
    description: 'Data de nascimento no formato ISO (YYYY-MM-DD)',
    example: '2015-03-10',
    format: 'date',
  })
  @IsOptional()
  @IsDateString()
  dataNascimento?: string;

  @ApiPropertyOptional({
    description: 'Sexo do estudante',
    enum: ['M', 'F'],
    example: 'F',
  })
  @IsOptional()
  @IsString()
  @IsIn(['M', 'F'])
  sexo?: string;

  @ApiPropertyOptional({ description: 'Série escolar', example: '6º ano' })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  serie?: string;

  @ApiPropertyOptional({
    description: 'Nome da escola',
    example: 'Escola Municipal Centro',
  })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  escola?: string;

  @ApiPropertyOptional({
    description: 'Telefone de contato principal',
    example: '(11) 99999-9999',
  })
  @IsOptional()
  @IsString()
  @MaxLength(20)
  numeroContato?: string;

  @ApiPropertyOptional({ description: 'Alergia a medicamentos' })
  @IsOptional()
  @IsString()
  alergicoMedicamento?: string;

  @ApiPropertyOptional({ description: 'Alergia alimentar' })
  @IsOptional()
  @IsString()
  alergiaAlimento?: string;

  @ApiPropertyOptional({ description: 'Informações de tratamento médico' })
  @IsOptional()
  @IsString()
  tratamentoMedico?: string;

  @ApiPropertyOptional({ description: 'Medicação de uso contínuo' })
  @IsOptional()
  @IsString()
  medicacaoEspecifica?: string;
}
