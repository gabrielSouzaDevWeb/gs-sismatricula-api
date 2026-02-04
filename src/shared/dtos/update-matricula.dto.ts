import { Type } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsInt,
  IsNumber,
  IsOptional,
  Max,
  Min,
  ValidateNested,
} from 'class-validator';
import { StatusMatricula } from '../enum/status-matricula.enum';
import { UpdateEstudanteDto } from './update-estudante.dto';
import { UpdateFiliacaoDto } from './update-filiacao.dto';

export class UpdateMatriculaDto {
  @Type(() => Number)
  @IsInt({ message: 'O ID deve ser um número inteiro válido' })
  id: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  idEstudante?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  anoLetivo?: number;

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

  @IsOptional()
  @Type(() => Number)
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  valorMensalidade?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  valorMatricula?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  quantidadeMensalidades?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(31)
  diaVencimento?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(12)
  mesInicioMensalidade?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(12)
  mesFimMensalidade?: number;

  @IsOptional()
  observacoes?: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  idResponsavelPagamento?: number;

  @IsOptional()
  @ValidateNested()
  @Type(() => UpdateEstudanteDto)
  estudante?: UpdateEstudanteDto;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateFiliacaoDto)
  filiacoes?: UpdateFiliacaoDto[];
}
