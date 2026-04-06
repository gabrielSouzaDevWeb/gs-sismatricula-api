import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsInt,
  IsNumber,
  IsOptional,
  Max,
  Min,
  ValidateNested,
} from 'class-validator';
import { StatusMatricula } from '../enum/status-matricula.enum';
import { UpdateEstudanteDto } from './update-estudante.dto';
import { UpdateFiliacaoDto } from './update-filiacao.dto';

export class UpdateMatriculaDto {
  @ApiProperty({
    description: 'ID da matrícula no corpo da requisição',
    example: 1,
  })
  @Type(() => Number)
  @IsInt({ message: 'O ID deve ser um número inteiro válido' })
  id: number;

  @ApiPropertyOptional({ description: 'ID do estudante', example: 1 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  idEstudante?: number;

  @ApiPropertyOptional({ description: 'Ano letivo', example: 2026 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  anoLetivo?: number;

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

  @ApiPropertyOptional({ description: 'Valor da mensalidade', example: 350.5 })
  @IsOptional()
  @Type(() => Number)
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  valorMensalidade?: number;

  @ApiPropertyOptional({ description: 'Valor da matrícula', example: 150 })
  @IsOptional()
  @Type(() => Number)
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  valorMatricula?: number;

  @ApiPropertyOptional({
    description: 'Quantidade de mensalidades',
    example: 12,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  quantidadeMensalidades?: number;

  @ApiPropertyOptional({ description: 'Dia de vencimento', example: 10 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(31)
  diaVencimento?: number;

  @ApiPropertyOptional({ description: 'Mês inicial', example: 1 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(12)
  mesInicioMensalidade?: number;

  @ApiPropertyOptional({ description: 'Mês final', example: 12 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(12)
  mesFimMensalidade?: number;

  @ApiPropertyOptional({
    description: 'Observações da matrícula',
    example: 'Atualização de valores para novo semestre',
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

  @ApiPropertyOptional({
    description: 'Dados do estudante para atualização aninhada',
    type: () => UpdateEstudanteDto,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => UpdateEstudanteDto)
  estudante?: UpdateEstudanteDto;

  @ApiPropertyOptional({
    description: 'Lista de filiações para atualização/criação',
    type: () => [UpdateFiliacaoDto],
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateFiliacaoDto)
  filiacoes?: UpdateFiliacaoDto[];
}
