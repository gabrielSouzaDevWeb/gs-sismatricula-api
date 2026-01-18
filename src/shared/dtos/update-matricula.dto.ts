import { Type } from 'class-transformer';
import {
  IsArray,
  IsIn,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';
import { UpdateEstudanteDto } from './update-estudante.dto';
import { UpdateFiliacaoDto } from './update-filiacao.dto';

export class UpdateMatriculaDto {
  @Type(() => Number)
  @IsInt()
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
  @IsString()
  @IsIn(['ativa', 'cancelada', 'concluida'])
  status?: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  valorMensalidade?: number;

  @IsOptional()
  @IsString()
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
