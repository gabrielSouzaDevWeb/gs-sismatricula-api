import { Type } from 'class-transformer';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { StatusMatricula } from '../enum/status-matricula.enum';
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
  @Type(() => Number)
  @IsEnum(StatusMatricula, {
    message:
      'O status deve ser um valor válido do enum StatusMatricula (1=Ativa, 2=Cancelada, 3=Trancada, 4=Concluída)',
  })
  status?: StatusMatricula;

  @IsOptional()
  @IsString()
  estudante?: string;

  @IsOptional()
  @IsString()
  ['estudante.nome']?: string;
}
