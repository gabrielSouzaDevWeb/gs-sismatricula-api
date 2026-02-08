import { Transform, Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  Max,
  Min,
  ValidateNested,
} from 'class-validator';
import { StatusMatricula } from '../enum/status-matricula.enum';
import { CreateEstudanteDto } from './create-estudante.dto';
import { CreateFiliacaoNestedDto } from './create-filiacao-nested.dto';

export class CreateMatriculaWithRelationsDto {
  @ValidateNested({ message: 'Os dados do estudante são inválidos' })
  @Type(() => CreateEstudanteDto)
  estudante: CreateEstudanteDto;

  @IsArray({ message: 'As filiações devem ser um array válido' })
  @ArrayMinSize(1, {
    message: 'É necessário adicionar pelo menos uma filiação',
  })
  @ValidateNested({ each: true })
  @Type(() => CreateFiliacaoNestedDto)
  filiacoes: CreateFiliacaoNestedDto[];

  @IsNumber({}, { message: 'O ID do turno deve ser um número válido' })
  @IsNotEmpty({ message: 'O ID do turno é obrigatório' })
  idTurno: number;

  @Type(() => Number)
  @IsInt({ message: 'O ano letivo deve ser um número inteiro válido' })
  anoLetivo: number;

  @IsOptional()
  @Type(() => Number)
  @IsEnum(StatusMatricula, {
    message:
      'O status deve ser um valor válido do enum StatusMatricula (1=Ativa, 2=Cancelada, 3=Trancada, 4=Concluída)',
  })
  status?: StatusMatricula;

  @IsOptional()
  @Type(() => Number)
  @IsNumber(
    { maxDecimalPlaces: 2 },
    {
      message:
        'O valor da mensalidade deve ser um número válido com até 2 casas decimais',
    },
  )
  @Min(0, { message: 'O valor da mensalidade não pode ser negativo' })
  valorMensalidade?: number;

  @Type(() => Number)
  @IsNumber(
    { maxDecimalPlaces: 2 },
    {
      message:
        'O valor da matrícula deve ser um número válido com até 2 casas decimais',
    },
  )
  @Min(0, { message: 'O valor da matrícula não pode ser negativo' })
  valorMatricula: number;

  @IsOptional()
  @Transform(({ value, obj }) => {})
  @Type(() => Number)
  @IsInt({ message: 'A quantidade de mensalidades deve ser um número inteiro' })
  @Min(1, { message: 'A quantidade de mensalidades deve ser no mínimo 1' })
  quantidadeMensalidades?: number;

  @Type(() => Number)
  @IsInt({ message: 'O dia de vencimento deve ser um número inteiro' })
  @Min(1, { message: 'O dia de vencimento deve ser no mínimo 1' })
  @Max(31, { message: 'O dia de vencimento deve ser no máximo 31' })
  diaVencimento: number;

  @Type(() => Number)
  @IsInt({
    message: 'O mês de início da mensalidade deve ser um número inteiro',
  })
  @Min(1, { message: 'O mês de início deve ser entre 1 e 12' })
  @Max(12, { message: 'O mês de início deve ser entre 1 e 12' })
  set mesInicioMensalidade(value: number) {
    this.quantidadeMensalidades =
      Math.abs(value - (this.__mesInicioMensalidade__ ?? value)) + 1;
    this.__mesInicioMensalidade__ = value;
  }

  get mesInicioMensalidade(): number {
    return this.__mesInicioMensalidade__;
  }

  @Type(() => Number)
  @IsInt({ message: 'O mês de fim da mensalidade deve ser um número inteiro' })
  @Min(1, { message: 'O mês de fim deve ser entre 1 e 12' })
  @Max(12, { message: 'O mês de fim deve ser entre 1 e 12' })
  set mesFimMensalidade(value: number) {
    this.quantidadeMensalidades =
      Math.abs(
        (this.__mesFimMensalidade__ ?? value) - this.mesInicioMensalidade,
      ) + 1;
    this.__mesFimMensalidade__ = value;
  }
  get mesFimMensalidade(): number {
    return this.__mesFimMensalidade__;
  }

  @IsOptional()
  observacoes?: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  idResponsavelPagamento?: number;

  @IsOptional()
  __mesInicioMensalidade__: number;
  @IsOptional()
  __mesFimMensalidade__: number;
}
