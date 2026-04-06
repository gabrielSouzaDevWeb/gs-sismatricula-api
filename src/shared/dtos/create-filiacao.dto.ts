import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateFiliacaoDto {
  @ApiProperty({
    description: 'Nome completo da filiação (pai, mãe ou responsável)',
    example: 'Maria da Silva',
    maxLength: 255,
  })
  @IsString({ message: 'O nome deve ser uma texto válida' })
  @IsNotEmpty({ message: 'O nome é obrigatório' })
  @MaxLength(255, { message: 'O nome não pode ter mais de 255 caracteres' })
  nome: string;

  @ApiPropertyOptional({
    description: 'Data de nascimento da filiação',
    example: '1985-06-20',
    format: 'date',
  })
  @IsOptional()
  dataNascimento?: string | Date;

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

  @ApiPropertyOptional({
    description: 'Estado civil',
    example: 'Casado(a)',
  })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  estadoCivil?: string;

  @ApiPropertyOptional({
    description: 'Endereço residencial',
    example: 'Rua das Flores',
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

  @ApiPropertyOptional({
    description: 'Complemento do endereço',
    example: 'Apto 34',
  })
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

  @ApiProperty({
    description: 'Celular da filiação',
    example: '(11) 99999-9999',
    maxLength: 20,
  })
  @IsString({ message: 'O celular deve ser uma texto válida' })
  @IsNotEmpty({ message: 'O celular é obrigatório' })
  @MaxLength(20, { message: 'O celular não pode ter mais de 20 caracteres' })
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
    description: 'Outros telefones para contato',
    example: '(11) 98888-7777',
  })
  @IsOptional()
  @IsString()
  @MaxLength(20)
  outroTelefones?: string;

  @ApiPropertyOptional({
    description: 'E-mail para contato',
    example: 'responsavel@email.com',
  })
  @IsOptional()
  @MaxLength(255)
  email?: string;
}
