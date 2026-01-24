import { Type } from 'class-transformer';
import { IsIn, IsOptional, IsString } from 'class-validator';
import { PaginationDto } from './pagination.dto';

export class MatriculaQueryDto extends PaginationDto {
  @IsOptional()
  id: number;

  @IsOptional()
  @Type(() => Number)
  idEstudante?: number;

  @IsOptional()
  @Type(() => Number)
  idTurno?: number;

  @IsOptional()
  @Type(() => Number)
  anoLetivo?: number;

  @IsOptional()
  @IsString()
  @IsIn(['ativa', 'cancelada', 'concluida'])
  status?: string;

  @IsOptional()
  @IsString()
  estudante?: string;

  @IsOptional()
  @IsString()
  ['estudante.nome']?: string;
}
