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
  @IsString({ message: 'O nome deve ser uma texto válida' })
  @IsNotEmpty({ message: 'O nome é obrigatório' })
  @MaxLength(255, { message: 'O nome não pode ter mais de 255 caracteres' })
  nome: string;

  @IsOptional()
  @IsBoolean()
  isResponsavelPagamento?: boolean;

  @IsOptional()
  dataNascimento?: string;

  @IsOptional()
  @IsString()
  @MaxLength(20)
  rg?: string;

  @IsOptional()
  @IsString()
  @MaxLength(14)
  cpf?: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  estadoCivil?: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  enderecoRes?: string;

  @IsOptional()
  @IsString()
  @MaxLength(10)
  numeroEndereco?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  bairro?: string;

  @IsOptional()
  @IsString()
  @MaxLength(10)
  cep?: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  complemento?: string;

  @IsOptional()
  @IsString()
  @MaxLength(20)
  telefoneResidencial?: string;

  @IsOptional()
  @IsString()
  @MaxLength(20)
  celular?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  profissao?: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  nomeEnderecoComercial?: string;

  @IsOptional()
  @IsString()
  @MaxLength(20)
  telefoneComercial?: string;

  @IsOptional()
  @IsString()
  @MaxLength(20)
  telefoneComercial2?: string;

  @IsOptional()
  @IsString()
  @MaxLength(20)
  outroTelefones?: string;

  @IsOptional()
  @MaxLength(255)
  email?: string;
}
