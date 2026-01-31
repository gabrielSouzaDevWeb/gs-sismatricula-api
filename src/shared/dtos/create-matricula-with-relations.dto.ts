import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  Min,
  ValidateNested,
} from 'class-validator';
import { StatusMatricula } from '../enum/status-matricula.enum';
import { CreateEstudanteDto } from './create-estudante.dto';
import { CreateFiliacaoNestedDto } from './create-filiacao-nested.dto';

export class CreateMatriculaWithRelationsDto {
  @ValidateNested({ message: 'Os dados do estudante são inválidos' })
  @Type(() => CreateEstudanteDto)
  estudante: CreateEstudanteDto;

  @IsArray({ message: 'As filiações devem ser um array válido' })
  @ArrayMinSize(1, {
    message: 'É necessário adicionar pelo menos uma filiação',
  })
  @ValidateNested({ each: true })
  @Type(() => CreateFiliacaoNestedDto)
  filiacoes: CreateFiliacaoNestedDto[];

  @IsNumber({}, { message: 'O ID do turno deve ser um número válido' })
  @IsNotEmpty({ message: 'O ID do turno é obrigatório' })
  idTurno: number;

  @Type(() => Number)
  @IsInt({ message: 'O ano letivo deve ser um número inteiro válido' })
  anoLetivo: number;

  @IsOptional()
  @Type(() => Number)
  @IsEnum(StatusMatricula, {
    message:
      'O status deve ser um valor válido do enum StatusMatricula (1=Ativa, 2=Cancelada, 3=Trancada, 4=Concluída)',
  })
  status?: StatusMatricula;

  @IsOptional()
  @Type(() => Number)
  @IsNumber(
    { maxDecimalPlaces: 2 },
    {
      message:
        'O valor da mensalidade deve ser um número válido com até 2 casas decimais',
    },
  )
  @Min(0, { message: 'O valor da mensalidade não pode ser negativo' })
  valorMensalidade?: number;

  @IsOptional()
  observacoes?: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  idResponsavelPagamento?: number;
}
