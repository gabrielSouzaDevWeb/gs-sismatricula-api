import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsIn,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';
import { CreateEstudanteDto } from './create-estudante.dto';
import { CreateFiliacaoNestedDto } from './create-filiacao-nested.dto';

export class CreateMatriculaWithRelationsDto {
  @ValidateNested()
  @Type(() => CreateEstudanteDto)
  estudante: CreateEstudanteDto;

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => CreateFiliacaoNestedDto)
  filiacoes: CreateFiliacaoNestedDto[];

  @IsNumber()
  @IsNotEmpty()
  idTurno: number;

  @Type(() => Number)
  @IsInt()
  anoLetivo: number;

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

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  idResponsavelPagamento?: number;
}
