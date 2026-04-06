import { ApiPropertyOptional } from '@nestjs/swagger';
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
  @ApiPropertyOptional({ description: 'ID da mensalidade', example: 10 })
  @IsOptional()
  id?: number;

  @ApiPropertyOptional({
    description: 'ID da matrícula vinculada',
    example: 1,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: 'O ID da matrícula deve ser um número inteiro válido' })
  @Min(1, { message: 'O ID da matrícula deve ser maior que 0' })
  idMatricula?: number;

  @ApiPropertyOptional({ description: 'Valor da mensalidade', example: 350.5 })
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

  @ApiPropertyOptional({ description: 'Mês da mensalidade', example: 3 })
  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: 'O mês da mensalidade deve ser um número inteiro' })
  @Min(1, { message: 'O mês da mensalidade deve ser entre 1 e 12' })
  @Max(12, { message: 'O mês da mensalidade deve ser entre 1 e 12' })
  mesMensalidade?: number;

  @ApiPropertyOptional({
    description: 'Data de vencimento',
    example: '2026-03-10',
    format: 'date',
  })
  @IsOptional()
  @IsDateString(
    {},
    { message: 'A data de vencimento deve ser uma data válida' },
  )
  dataVencimento?: string;

  @ApiPropertyOptional({ description: 'Ano letivo', example: 2026 })
  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: 'O ano letivo deve ser um número inteiro válido' })
  anoLetivo?: number;

  @ApiPropertyOptional({ description: 'Observação', example: 'Reagendado' })
  @IsOptional()
  observacao?: string;

  @ApiPropertyOptional({
    description: 'Data de pagamento',
    example: '2026-03-09',
    format: 'date',
    nullable: true,
  })
  @IsOptional()
  @IsDateString({}, { message: 'A data de pagamento deve ser uma data válida' })
  dataPagamento?: string | null;
}
