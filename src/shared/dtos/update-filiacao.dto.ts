import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsString, MaxLength } from 'class-validator';
import { Filiacao } from '../infrastructure/entities/filiacao.entity';

export class UpdateFiliacaoDto implements Partial<Filiacao> {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  id?: number;

  @IsString({ message: 'O nome deve ser uma texto válida' })
  @MaxLength(255, { message: 'O nome não pode ter mais de 255 caracteres' })
  nome: string;

  @IsOptional()
  dataNascimento?: Date;

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
  // @IsEmail()
  @MaxLength(255)
  email?: string;

  @IsOptional()
  @IsInt()
  idEstudante?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  isResponsavelPagamento?: number;
}
