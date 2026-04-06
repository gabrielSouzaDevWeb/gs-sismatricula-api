import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

// Versão para criação aninhada dentro de matrícula (idEstudante é atribuído pelo serviço)
export class CreateFiliacaoNestedDto {
  @ApiProperty({
    description: 'Nome completo da filiação',
    example: 'Maria da Silva',
    maxLength: 255,
  })
  @IsString({ message: 'O nome deve ser uma texto válida' })
  @IsNotEmpty({ message: 'O nome é obrigatório' })
  @MaxLength(255, { message: 'O nome não pode ter mais de 255 caracteres' })
  nome: string;

  @ApiPropertyOptional({
    description: 'Define se esta filiação é a responsável pelo pagamento',
    example: true,
  })
  @IsOptional()
  @IsBoolean()
  isResponsavelPagamento?: boolean;

  @ApiPropertyOptional({
    description: 'Data de nascimento da filiação',
    example: '1985-06-20',
    format: 'date',
  })
  @IsOptional()
  @IsDateString()
  dataNascimento?: string;

  @ApiPropertyOptional({ description: 'RG', example: '12.345.678-9' })
  @IsOptional()
  @IsString()
  @MaxLength(20)
  rg?: string;

  @ApiPropertyOptional({ description: 'CPF', example: '123.456.789-00' })
  @IsOptional()
  @IsString()
  @MaxLength(14)
  cpf?: string;

  @ApiPropertyOptional({ description: 'Estado civil', example: 'Casado(a)' })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  estadoCivil?: string;

  @ApiPropertyOptional({
    description: 'Endereço residencial',
    example: 'Rua A',
  })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  enderecoRes?: string;

  @ApiPropertyOptional({ description: 'Número do endereço', example: '120' })
  @IsOptional()
  @IsString()
  @MaxLength(10)
  numeroEndereco?: string;

  @ApiPropertyOptional({ description: 'Bairro', example: 'Centro' })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  bairro?: string;

  @ApiPropertyOptional({ description: 'CEP', example: '01001-000' })
  @IsOptional()
  @IsString()
  @MaxLength(10)
  cep?: string;

  @ApiPropertyOptional({ description: 'Complemento', example: 'Apto 34' })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  complemento?: string;

  @ApiPropertyOptional({
    description: 'Telefone residencial',
    example: '(11) 3333-3333',
  })
  @IsOptional()
  @IsString()
  @MaxLength(20)
  telefoneResidencial?: string;

  @ApiPropertyOptional({ description: 'Celular', example: '(11) 99999-9999' })
  @IsOptional()
  @IsString()
  @MaxLength(20)
  celular?: string;

  @ApiPropertyOptional({ description: 'Profissão', example: 'Professor(a)' })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  profissao?: string;

  @ApiPropertyOptional({
    description: 'Nome do endereço comercial',
    example: 'Empresa XYZ',
  })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  nomeEnderecoComercial?: string;

  @ApiPropertyOptional({
    description: 'Telefone comercial principal',
    example: '(11) 4000-0001',
  })
  @IsOptional()
  @IsString()
  @MaxLength(20)
  telefoneComercial?: string;

  @ApiPropertyOptional({
    description: 'Telefone comercial secundário',
    example: '(11) 4000-0002',
  })
  @IsOptional()
  @IsString()
  @MaxLength(20)
  telefoneComercial2?: string;

  @ApiPropertyOptional({
    description: 'Outros telefones',
    example: '(11) 98888-7777',
  })
  @IsOptional()
  @IsString()
  @MaxLength(20)
  outroTelefones?: string;

  @ApiPropertyOptional({
    description: 'E-mail de contato',
    example: 'responsavel@email.com',
  })
  @IsOptional()
  @MaxLength(255)
  email?: string;
}
