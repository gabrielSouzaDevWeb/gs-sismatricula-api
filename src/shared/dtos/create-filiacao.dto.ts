import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateFiliacaoDto {
  @IsString({ message: 'O nome deve ser uma texto válida' })
  @IsNotEmpty({ message: 'O nome é obrigatório' })
  @MaxLength(255, { message: 'O nome não pode ter mais de 255 caracteres' })
  nome: string;

  @IsOptional()
  dataNascimento?: string | Date;

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

  @IsString({ message: 'O celular deve ser uma texto válida' })
  @IsNotEmpty({ message: 'O celular é obrigatório' })
  @MaxLength(20, { message: 'O celular não pode ter mais de 20 caracteres' })
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
