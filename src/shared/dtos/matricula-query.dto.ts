import { IsIn, IsOptional, IsString, IsUUID, MaxLength } from 'class-validator';
import { PaginationDto } from './pagination.dto';

export class MatriculaQueryDto extends PaginationDto {
  @IsOptional()
  @IsUUID()
  idEstudante?: string;

  @IsOptional()
  @IsUUID()
  idHorario?: string;

  @IsOptional()
  @IsString()
  @MaxLength(10)
  anoLetivo?: string;

  @IsOptional()
  @IsString()
  @IsIn(['ativa', 'cancelada', 'concluida'])
  status?: string;
}
