import { Type } from 'class-transformer';
import {
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateMatriculaDto {
  @IsUUID()
  idEstudante: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(10)
  anoLetivo: string;

  @IsOptional()
  @IsUUID()
  idHorario?: string;

  @IsOptional()
  @IsString()
  @IsIn(['ativa', 'cancelada', 'concluida'])
  status?: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  valorMensalidade?: number;

  @IsOptional()
  @IsString()
  observacoes?: string;
}
