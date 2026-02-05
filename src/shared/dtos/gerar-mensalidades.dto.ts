import { Type } from 'class-transformer';
import { IsDateString, IsInt, IsNumber, Max, Min } from 'class-validator';

export class GerarMensalidadesDto {
  @Type(() => Number)
  @IsNumber(
    { maxDecimalPlaces: 2 },
    {
      message:
        'O valor da mensalidade deve ser um número válido com até 2 casas decimais',
    },
  )
  @Min(0, { message: 'O valor da mensalidade não pode ser negativo' })
  valorMensalidade: number;

  @Type(() => Number)
  @IsInt({ message: 'O mês de início deve ser um número inteiro' })
  @Min(1, { message: 'O mês de início deve ser entre 1 e 12' })
  @Max(12, { message: 'O mês de início deve ser entre 1 e 12' })
  mesInicio: number;

  @Type(() => Number)
  @IsInt({ message: 'O mês de fim deve ser um número inteiro' })
  @Min(1, { message: 'O mês de fim deve ser entre 1 e 12' })
  @Max(12, { message: 'O mês de fim deve ser entre 1 e 12' })
  mesFim: number;

  @IsDateString(
    {},
    { message: 'A data de vencimento deve ser uma data válida' },
  )
  dataVencimento: string;
}
