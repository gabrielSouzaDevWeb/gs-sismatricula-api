import { IsOptional, IsString } from 'class-validator';
import { PaginationDto } from './pagination.dto';

export class TurnoQueryDto extends PaginationDto {
  @IsOptional()
  @IsString()
  // @IsIn(['manha', 'manhã', 'tarde', 'noite', 'integral'])
  turno?: string;

  @IsOptional()
  @IsString()
  // @IsIn(['reforco', 'regular', 'extra'])
  tipoAula?: string;
}
