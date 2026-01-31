export enum StatusMatricula {
  ATIVA = 1,
  CANCELADA = 2,
  TRANCADA = 3,
  CONCLUIDA = 4,
}

export const StatusMatriculaLabels: Record<StatusMatricula, string> = {
  [StatusMatricula.ATIVA]: 'Ativa',
  [StatusMatricula.CANCELADA]: 'Cancelada',
  [StatusMatricula.TRANCADA]: 'Concluída',
  [StatusMatricula.CONCLUIDA]: 'Concluída',
};
