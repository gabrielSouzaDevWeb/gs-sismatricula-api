import { Type } from 'class-transformer';
import { IsEnum, IsInt, IsNumber, IsOptional, Max, Min } from 'class-validator';
import { StatusMatricula } from '../enum/status-matricula.enum';

export class CreateMatriculaDto {
  @Type(() => Number)
  @IsOptional()
  @IsInt({ message: 'O ID do estudante deve ser um número inteiro válido' })
  idEstudante: number;

  @Type(() => Number)
  @IsInt({ message: 'O ano letivo deve ser um número inteiro válido' })
  anoLetivo: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  idTurno?: number;

  @IsOptional()
  @Type(() => Number)
  @IsEnum(StatusMatricula, {
    message:
      'O status deve ser um valor válido do enum StatusMatricula (1=Ativa, 2=Cancelada, 3=Trancada, 4=Concluída)',
  })
  status?: StatusMatricula;

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

  @Type(() => Number)
  @IsNumber(
    { maxDecimalPlaces: 2 },
    {
      message:
        'O valor da matrícula deve ser um número válido com até 2 casas decimais',
    },
  )
  @Min(0, { message: 'O valor da matrícula não pode ser negativo' })
  valorMatricula: number;

  @Type(() => Number)
  @IsInt({ message: 'A quantidade de mensalidades deve ser um número inteiro' })
  @Min(1, { message: 'A quantidade de mensalidades deve ser no mínimo 1' })
  quantidadeMensalidades: number;

  @Type(() => Number)
  @IsInt({ message: 'O dia de vencimento deve ser um número inteiro' })
  @Min(1, { message: 'O dia de vencimento deve ser no mínimo 1' })
  @Max(31, { message: 'O dia de vencimento deve ser no máximo 31' })
  diaVencimento: number;

  @Type(() => Number)
  @IsInt({
    message: 'O mês de início da mensalidade deve ser um número inteiro',
  })
  @Min(1, { message: 'O mês de início deve ser entre 1 e 12' })
  @Max(12, { message: 'O mês de início deve ser entre 1 e 12' })
  mesInicioMensalidade: number;

  @Type(() => Number)
  @IsInt({ message: 'O mês de fim da mensalidade deve ser um número inteiro' })
  @Min(1, { message: 'O mês de fim deve ser entre 1 e 12' })
  @Max(12, { message: 'O mês de fim deve ser entre 1 e 12' })
  mesFimMensalidade: number;

  @IsOptional()
  observacoes?: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  idResponsavelPagamento?: number;
}
