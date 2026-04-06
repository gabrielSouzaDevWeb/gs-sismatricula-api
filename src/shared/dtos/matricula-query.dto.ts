import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { StatusMatricula } from '../enum/status-matricula.enum';
import { PaginationDto } from './pagination.dto';

export class MatriculaQueryDto extends PaginationDto {
  @ApiPropertyOptional({
    description: 'Filtro por ID da matrícula',
    example: 1,
  })
  @IsOptional()
  id: number;

  @ApiPropertyOptional({
    description: 'Filtro por ID do estudante',
    example: 1,
  })
  @IsOptional()
  @Type(() => Number)
  idEstudante?: number;

  @ApiPropertyOptional({ description: 'Filtro por ID do turno', example: 2 })
  @IsOptional()
  @Type(() => Number)
  idTurno?: number;

  @ApiPropertyOptional({ description: 'Filtro por ano letivo', example: 2026 })
  @IsOptional()
  @Type(() => Number)
  anoLetivo?: number;

  @ApiPropertyOptional({
    description: 'Filtro por status da matrícula',
    enum: StatusMatricula,
    example: StatusMatricula.ATIVA,
  })
  @IsOptional()
  @Type(() => Number)
  @IsEnum(StatusMatricula, {
    message:
      'O status deve ser um valor válido do enum StatusMatricula (1=Ativa, 2=Cancelada, 3=Trancada, 4=Concluída)',
  })
  status?: StatusMatricula;

  @ApiPropertyOptional({
    description: 'Filtro livre por dados do estudante',
    example: 'João',
  })
  @IsOptional()
  @IsString()
  estudante?: string;

  @ApiPropertyOptional({
    description: 'Filtro específico pelo nome do estudante',
    example: 'João',
  })
  @IsOptional()
  @IsString()
  ['estudante.nome']?: string;
}
