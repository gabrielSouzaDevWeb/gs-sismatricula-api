import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength } from 'class-validator';
import { PaginationDto } from './pagination.dto';

export class FiliacaoQueryDto extends PaginationDto {
  @ApiPropertyOptional({
    description: 'Filtro por nome da filiação',
    example: 'Maria',
    maxLength: 255,
  })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  nome?: string;

  @ApiPropertyOptional({
    description: 'Filtro por CPF',
    example: '123.456.789-00',
    maxLength: 14,
  })
  @IsOptional()
  @IsString()
  @MaxLength(14)
  cpf?: string;
}
