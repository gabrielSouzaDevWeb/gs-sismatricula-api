import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsDateString,
  IsInt,
  IsNumber,
  IsOptional,
  Max,
  Min,
} from 'class-validator';

export class CreateMensalidadeDto {
  @ApiProperty({
    description: 'ID da matrícula vinculada',
    example: 1,
    minimum: 1,
  })
  @Type(() => Number)
  @IsInt({ message: 'O ID da matrícula deve ser um número inteiro válido' })
  @Min(1, { message: 'O ID da matrícula deve ser maior que 0' })
  idMatricula: number;

  @ApiProperty({
    description: 'Valor da mensalidade',
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
    description: 'Mês de referência da mensalidade',
    example: 3,
    minimum: 1,
    maximum: 12,
  })
  @Type(() => Number)
  @IsInt({ message: 'O mês da mensalidade deve ser um número inteiro' })
  @Min(1, { message: 'O mês da mensalidade deve ser entre 1 e 12' })
  @Max(12, { message: 'O mês da mensalidade deve ser entre 1 e 12' })
  mesMensalidade: number;

  @ApiProperty({
    description: 'Data de vencimento',
    example: '2026-03-10',
    format: 'date',
  })
  @IsDateString(
    {},
    { message: 'A data de vencimento deve ser uma data válida' },
  )
  dataVencimento: string;

  @ApiProperty({ description: 'Ano letivo', example: 2026 })
  @Type(() => Number)
  @IsInt({ message: 'O ano letivo deve ser um número inteiro válido' })
  anoLetivo: number;

  @ApiPropertyOptional({
    description: 'Observação livre',
    example: 'Mensalidade com desconto de pontualidade',
  })
  @IsOptional()
  observacao?: string;

  @ApiPropertyOptional({
    description: 'Data em que o pagamento foi realizado',
    example: '2026-03-09',
    format: 'date',
  })
  @IsOptional()
  @IsDateString({}, { message: 'A data de pagamento deve ser uma data válida' })
  dataPagamento?: string;
}
