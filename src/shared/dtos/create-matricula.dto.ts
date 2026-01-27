import { Type } from 'class-transformer';
import {
  IsIn,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class CreateMatriculaDto {
  @Type(() => Number)
  @IsInt()
  idEstudante: number;

  @Type(() => Number)
  @IsInt()
  anoLetivo: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  idTurno?: number;

  @IsOptional()
  @IsString()
  @IsIn(['ativa', 'cancelada', 'concluida'])
  status?: string;

  @Type(() => Number)
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  valorMensalidade: number;

  @IsOptional()
  @IsString()
  observacoes?: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  idResponsavelPagamento?: number;
}
