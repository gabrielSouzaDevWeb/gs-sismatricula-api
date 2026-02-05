import { Type } from 'class-transformer';
import { IsInt, IsOptional, Min } from 'class-validator';
import { PaginationDto } from './pagination.dto';

export class MensalidadeQueryDto extends PaginationDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: 'O ID da matrícula deve ser um número inteiro válido' })
  @Min(1, { message: 'O ID da matrícula deve ser maior que 0' })
  idMatricula?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: 'O mês da mensalidade deve ser um número inteiro' })
  @Min(1, { message: 'O mês da mensalidade deve ser entre 1 e 12' })
  mesMensalidade?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: 'O ano letivo deve ser um número inteiro válido' })
  anoLetivo?: number;
}
