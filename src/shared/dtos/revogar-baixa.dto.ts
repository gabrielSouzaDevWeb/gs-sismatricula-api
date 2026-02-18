import { IsDateString, IsEnum, IsOptional, IsString } from 'class-validator';
import { StatusPagamentoMensalidade } from '../enum/status-pagamento-mensaliade';

export class RevogarBaixaDto {
  @IsEnum(StatusPagamentoMensalidade, {
    message: 'Status de pagamento inválido',
  })
  statusPagamento: StatusPagamentoMensalidade;

  @IsOptional()
  @IsDateString(
    {},
    { message: 'A data de vencimento deve ser uma data válida' },
  )
  dataVencimento?: string;

  @IsOptional()
  @IsString({ message: 'A observação deve ser um texto' })
  observacao?: string;
}
