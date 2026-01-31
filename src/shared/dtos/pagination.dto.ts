import { Type } from 'class-transformer';
import { IsInt, IsOptional, Min } from 'class-validator';

export class PaginationDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: 'A página deve ser um número inteiro válido' })
  @Min(1, { message: 'A página deve ser maior ou igual a 1' })
  page?: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt({
    message: 'O número de itens por página deve ser um número inteiro válido',
  })
  @Min(1, {
    message: 'O número de itens por página deve ser maior ou igual a 1',
  })
  perPage?: number = 10;
}
