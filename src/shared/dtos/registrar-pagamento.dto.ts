import { IsDateString, IsOptional, IsString } from 'class-validator';

export class RegistrarPagamentoDto {
  @IsOptional()
  @IsDateString({}, { message: 'A data de pagamento deve ser uma data válida' })
  dataPagamento?: string;

  @IsOptional()
  @IsString({ message: 'A observação deve ser uma texto' })
  observacao?: string;
}
