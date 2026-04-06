import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { PaginationDto } from './pagination.dto';

export class TurnoQueryDto extends PaginationDto {
  @ApiPropertyOptional({
    description: 'Filtro por nome do turno',
    example: 'manhã',
  })
  @IsOptional()
  @IsString()
  // @IsIn(['manha', 'manhã', 'tarde', 'noite', 'integral'])
  turno?: string;

  @ApiPropertyOptional({
    description: 'Filtro por tipo de aula',
    example: 'regular',
  })
  @IsOptional()
  @IsString()
  // @IsIn(['reforco', 'regular', 'extra'])
  tipoAula?: string;
}
