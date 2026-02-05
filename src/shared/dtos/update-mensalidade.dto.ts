import { Type } from 'class-transformer';
import {
  IsDateString,
  IsInt,
  IsNumber,
  IsOptional,
  Max,
  Min,
} from 'class-validator';
export class UpdateMensalidadeDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: 'O ID da matrícula deve ser um número inteiro válido' })
  @Min(1, { message: 'O ID da matrícula deve ser maior que 0' })
  idMatricula?: number;

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

  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: 'O mês da mensalidade deve ser um número inteiro' })
  @Min(1, { message: 'O mês da mensalidade deve ser entre 1 e 12' })
  @Max(12, { message: 'O mês da mensalidade deve ser entre 1 e 12' })
  mesMensalidade?: number;

  @IsOptional()
  @IsDateString(
    {},
    { message: 'A data de vencimento deve ser uma data válida' },
  )
  dataVencimento?: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: 'O ano letivo deve ser um número inteiro válido' })
  anoLetivo?: number;

  @IsOptional()
  observacao?: string;

  @IsOptional()
  @IsDateString({}, { message: 'A data de pagamento deve ser uma data válida' })
  dataPagamento?: string | null;
}
