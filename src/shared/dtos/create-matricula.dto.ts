import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEnum, IsInt, IsNumber, IsOptional, Max, Min } from 'class-validator';
import { StatusMatricula } from '../enum/status-matricula.enum';

export class CreateMatriculaDto {
  @ApiPropertyOptional({
    description: 'ID do estudante',
    example: 1,
  })
  @Type(() => Number)
  @IsOptional()
  @IsInt({ message: 'O ID do estudante deve ser um número inteiro válido' })
  idEstudante: number;

  @ApiProperty({
    description: 'Ano letivo da matrícula',
    example: 2026,
  })
  @Type(() => Number)
  @IsInt({ message: 'O ano letivo deve ser um número inteiro válido' })
  anoLetivo: number;

  @ApiPropertyOptional({ description: 'ID do turno', example: 2 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  idTurno?: number;

  @ApiPropertyOptional({
    description: 'Status da matrícula',
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

  @ApiProperty({
    description: 'Valor da mensalidade',
    example: 350.5,
    minimum: 0,
  })
  @Type(() => Number)
  @IsNumber(
    { maxDecimalPlaces: 2 },
    {
      message:
        'O valor da mensalidade deve ser um número válido com até 2 casas decimais',
    },
  )
  @Min(0, { message: 'O valor da mensalidade não pode ser negativo' })
  valorMensalidade: number;

  @ApiProperty({
    description: 'Valor da matrícula',
    example: 150,
    minimum: 0,
  })
  @Type(() => Number)
  @IsNumber(
    { maxDecimalPlaces: 2 },
    {
      message:
        'O valor da matrícula deve ser um número válido com até 2 casas decimais',
    },
  )
  @Min(0, { message: 'O valor da matrícula não pode ser negativo' })
  valorMatricula: number;

  @ApiProperty({
    description: 'Quantidade de mensalidades a gerar',
    example: 12,
    minimum: 1,
  })
  @Type(() => Number)
  @IsInt({ message: 'A quantidade de mensalidades deve ser um número inteiro' })
  @Min(1, { message: 'A quantidade de mensalidades deve ser no mínimo 1' })
  quantidadeMensalidades: number;

  @ApiProperty({
    description: 'Dia de vencimento das mensalidades',
    example: 10,
    minimum: 1,
    maximum: 31,
  })
  @Type(() => Number)
  @IsInt({ message: 'O dia de vencimento deve ser um número inteiro' })
  @Min(1, { message: 'O dia de vencimento deve ser no mínimo 1' })
  @Max(31, { message: 'O dia de vencimento deve ser no máximo 31' })
  diaVencimento: number;

  @ApiProperty({
    description: 'Mês inicial das mensalidades',
    example: 1,
    minimum: 1,
    maximum: 12,
  })
  @Type(() => Number)
  @IsInt({
    message: 'O mês de início da mensalidade deve ser um número inteiro',
  })
  @Min(1, { message: 'O mês de início deve ser entre 1 e 12' })
  @Max(12, { message: 'O mês de início deve ser entre 1 e 12' })
  mesInicioMensalidade: number;

  @ApiProperty({
    description: 'Mês final das mensalidades',
    example: 12,
    minimum: 1,
    maximum: 12,
  })
  @Type(() => Number)
  @IsInt({ message: 'O mês de fim da mensalidade deve ser um número inteiro' })
  @Min(1, { message: 'O mês de fim deve ser entre 1 e 12' })
  @Max(12, { message: 'O mês de fim deve ser entre 1 e 12' })
  mesFimMensalidade: number;

  @ApiPropertyOptional({
    description: 'Observações da matrícula',
    example: 'Aluno bolsista parcial',
  })
  @IsOptional()
  observacoes?: string;

  @ApiPropertyOptional({
    description: 'ID da filiação responsável pelo pagamento',
    example: 12,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  idResponsavelPagamento?: number;
}
