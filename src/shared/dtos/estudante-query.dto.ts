import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength } from 'class-validator';
import { PaginationDto } from './pagination.dto';

export class EstudanteQueryDto extends PaginationDto {
  @ApiPropertyOptional({
    description: 'Filtro por ID do estudante',
    example: 1,
  })
  @IsOptional()
  id: number;

  @ApiPropertyOptional({
    description: 'Filtro por nome do estudante',
    example: 'João',
    maxLength: 255,
  })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  nome?: string;

  @ApiPropertyOptional({
    description: 'Filtro por série',
    example: '5º ano',
    maxLength: 100,
  })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  serie?: string;

  @ApiPropertyOptional({
    description: 'Filtro por escola',
    example: 'Escola Municipal Centro',
    maxLength: 255,
  })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  escola?: string;
}
