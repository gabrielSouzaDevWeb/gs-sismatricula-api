export enum StatusPagamentoMensalidade {
  PENDENTE = 1,
  PAGO = 2,
  VENCIDO = 3,
  CANCELADO = 4,
}

export const StatusPagamentoMensalidadeLabels: Record<StatusPagamentoMensalidade, string> = {
  [StatusPagamentoMensalidade.PENDENTE]: 'Pendente',
  [StatusPagamentoMensalidade.PAGO]: 'Pago',
  [StatusPagamentoMensalidade.VENCIDO]: 'Vencido',
  [StatusPagamentoMensalidade.CANCELADO]: 'Cancelado',
};