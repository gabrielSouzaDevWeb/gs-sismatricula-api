import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsString, Matches, Min } from 'class-validator';
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

  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: 'O status da mensalidade deve ser um número inteiro' })
  @Min(0, {
    message: 'O status da mensalidade deve ser 0 (pendente) ou 1 (pago)',
  })
  status?: number;

  @IsOptional()
  @IsString({ message: 'A competência deve ser uma string no formato YYYY-MM' })
  @Matches(/^\d{4}-(0[1-9]|1[0-2])$/, {
    message: 'A competência deve estar no formato YYYY-MM',
  })
  set competencia(value: string) {
    console.log('Competência recebida:', value);

    if (typeof value === 'string') {
      const [ano, mes] = value.split('-').map(Number);
      if (!Number.isNaN(ano)) this.anoLetivo = ano;
      if (!Number.isNaN(mes)) this.mesMensalidade = mes;
    }

    // O valor real é processado no transform acima, então o setter pode ser vazio
  }
}
