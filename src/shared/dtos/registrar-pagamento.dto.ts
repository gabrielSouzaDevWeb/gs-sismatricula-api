import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsOptional, IsString } from 'class-validator';

export class RegistrarPagamentoDto {
  @ApiPropertyOptional({
    description: 'Data do pagamento (se omitida, usa data atual)',
    example: '2026-03-09',
    format: 'date',
  })
  @IsOptional()
  @IsDateString({}, { message: 'A data de pagamento deve ser uma data válida' })
  dataPagamento?: string;

  @ApiPropertyOptional({
    description: 'Observação do pagamento',
    example: 'Pagamento recebido em dinheiro',
  })
  @IsOptional()
  @IsString({ message: 'A observação deve ser uma texto' })
  observacao?: string;
}
