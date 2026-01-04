import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
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

  @IsString()
  @IsNotEmpty()
  idTurno: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(10)
  anoLetivo: string;

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
