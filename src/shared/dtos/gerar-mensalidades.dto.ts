import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDateString, IsInt, IsNumber, Max, Min } from 'class-validator';

export class GerarMensalidadesDto {
  @ApiProperty({
    description: 'Valor mensal para geração em lote',
    example: 350.5,
    minimum: 0,
  })
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

  @ApiProperty({
    description: 'Mês inicial da geração',
    example: 1,
    minimum: 1,
    maximum: 12,
  })
  @Type(() => Number)
  @IsInt({ message: 'O mês de início deve ser um número inteiro' })
  @Min(1, { message: 'O mês de início deve ser entre 1 e 12' })
  @Max(12, { message: 'O mês de início deve ser entre 1 e 12' })
  mesInicio: number;

  @ApiProperty({
    description: 'Mês final da geração',
    example: 12,
    minimum: 1,
    maximum: 12,
  })
  @Type(() => Number)
  @IsInt({ message: 'O mês de fim deve ser um número inteiro' })
  @Min(1, { message: 'O mês de fim deve ser entre 1 e 12' })
  @Max(12, { message: 'O mês de fim deve ser entre 1 e 12' })
  mesFim: number;

  @ApiProperty({
    description: 'Data base de vencimento usada para calcular o dia',
    example: '2026-01-10',
    format: 'date',
  })
  @IsDateString(
    {},
    { message: 'A data de vencimento deve ser uma data válida' },
  )
  dataVencimento: string;
}
