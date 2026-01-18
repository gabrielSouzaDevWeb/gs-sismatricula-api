import { Type } from 'class-transformer';
import { IsIn, IsInt, IsOptional, IsString } from 'class-validator';
import { PaginationDto } from './pagination.dto';

export class MatriculaQueryDto extends PaginationDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  idEstudante?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  idTurno?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  anoLetivo?: number;

  @IsOptional()
  @IsString()
  @IsIn(['ativa', 'cancelada', 'concluida'])
  status?: string;
}
