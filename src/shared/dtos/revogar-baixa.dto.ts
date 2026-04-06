import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsEnum, IsOptional, IsString } from 'class-validator';
import { StatusPagamentoMensalidade } from '../enum/status-pagamento-mensaliade';

export class RevogarBaixaDto {
  @ApiProperty({
    description: 'Novo status de pagamento após revogar baixa',
    enum: StatusPagamentoMensalidade,
    example: StatusPagamentoMensalidade.PENDENTE,
  })
  @IsEnum(StatusPagamentoMensalidade, {
    message: 'Status de pagamento inválido',
  })
  statusPagamento!: StatusPagamentoMensalidade;

  @ApiPropertyOptional({
    description: 'Nova data de vencimento (opcional)',
    example: '2026-03-20',
    format: 'date',
  })
  @IsOptional()
  @IsDateString(
    {},
    { message: 'A data de vencimento deve ser uma data válida' },
  )
  dataVencimento?: string;

  @ApiPropertyOptional({
    description: 'Observação da revogação de baixa',
    example: 'Pagamento estornado pelo responsável',
  })
  @IsOptional()
  @IsString({ message: 'A observação deve ser um texto' })
  observacao?: string;
}
