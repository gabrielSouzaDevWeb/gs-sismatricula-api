import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
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
  @ApiProperty({
    description: 'Nome completo do estudante',
    example: 'João da Silva',
    maxLength: 255,
  })
  @IsString({ message: 'O nome deve ser uma texto válida' })
  @IsNotEmpty({ message: 'O nome é obrigatório' })
  @MaxLength(255, { message: 'O nome não pode ter mais de 255 caracteres' })
  nome: string;

  @ApiPropertyOptional({
    description: 'Data de nascimento no formato ISO (YYYY-MM-DD)',
    example: '2015-03-10',
    format: 'date',
  })
  @IsOptional()
  @IsDateString()
  dataNascimento?: string;

  @ApiProperty({
    description: 'Sexo do estudante',
    enum: ['M', 'F'],
    example: 'M',
  })
  @IsString({ message: 'O sexo deve ser uma texto válida' })
  @IsNotEmpty({ message: 'O sexo é obrigatório' })
  @IsIn(['M', 'F'], {
    message: 'O sexo deve ser "M" (masculino) ou "F" (feminino)',
  })
  sexo: string;

  @ApiPropertyOptional({
    description: 'Série escolar',
    example: '5º ano',
    maxLength: 100,
  })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  serie?: string;

  @ApiPropertyOptional({
    description: 'Nome da escola',
    example: 'Escola Municipal Centro',
    maxLength: 255,
  })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  escola?: string;

  @ApiPropertyOptional({
    description: 'Telefone de contato principal',
    example: '(11) 99999-9999',
    maxLength: 20,
  })
  @IsOptional()
  @IsString()
  @MaxLength(20)
  numeroContato?: string;

  @ApiPropertyOptional({
    description: 'Alergia a medicamentos',
    example: 'Penicilina',
  })
  @IsOptional()
  @IsString()
  alergicoMedicamento?: string;

  @ApiPropertyOptional({
    description: 'Alergia alimentar',
    example: 'Lactose',
  })
  @IsOptional()
  @IsString()
  alergiaAlimento?: string;

  @ApiPropertyOptional({
    description: 'Informações sobre tratamento médico em andamento',
    example: 'Acompanhamento com alergista',
  })
  @IsOptional()
  @IsString()
  tratamentoMedico?: string;

  @ApiPropertyOptional({
    description: 'Medicação de uso contínuo',
    example: 'Antialérgico diário',
  })
  @IsOptional()
  @IsString()
  medicacaoEspecifica?: string;

  @ApiPropertyOptional({
    description: 'ID da filiação responsável pelo pagamento',
    example: 12,
  })
  @IsOptional()
  @IsInt()
  idResponsavelPagamento?: number;
}
