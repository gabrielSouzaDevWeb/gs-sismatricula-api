import { IsDateString, IsOptional } from 'class-validator';

export class RegistrarPagamentoDto {
  @IsOptional()
  @IsDateString({}, { message: 'A data de pagamento deve ser uma data válida' })
  dataPagamento?: string;
}
