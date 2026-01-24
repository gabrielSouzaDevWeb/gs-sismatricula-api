import { IsOptional, IsString, MaxLength } from 'class-validator';
import { PaginationDto } from './pagination.dto';

export class EstudanteQueryDto extends PaginationDto {
  @IsOptional()
  id: number;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  nome?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  serie?: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  escola?: string;
}
