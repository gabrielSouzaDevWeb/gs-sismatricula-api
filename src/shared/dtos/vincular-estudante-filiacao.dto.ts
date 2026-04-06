import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsInt, IsNotEmpty, ValidateNested } from 'class-validator';

export class VincularEstudanteFiliacaoDto {
  @ApiProperty({ description: 'ID do estudante', example: 1 })
  @IsInt({ message: 'O ID do estudante deve ser um número inteiro válido' })
  @IsNotEmpty({ message: 'O ID do estudante é obrigatório' })
  idEstudante: number;

  @ApiProperty({
    description: 'Lista de IDs de filiação a vincular',
    example: [2, 3],
    type: [Number],
  })
  @IsArray({ message: 'Os IDs das filiações devem ser um array' })
  @IsInt({
    each: true,
    message: 'Cada ID de filiação deve ser um número inteiro válido',
  })
  @IsNotEmpty({ message: 'É necessário informar pelo menos uma filiação' })
  idFiliacoes: number[];
}

export class CriarFiliacaoComVinculoDto {
  @ApiProperty({
    description: 'Dados da filiação a ser criada',
    type: Object,
    additionalProperties: true,
  })
  @Type(() => Object)
  @ValidateNested()
  filiacao: any; // Aceita os dados da filiação

  @ApiProperty({ description: 'ID do estudante', example: 1 })
  @IsInt({ message: 'O ID do estudante deve ser um número inteiro válido' })
  @IsNotEmpty({ message: 'O ID do estudante é obrigatório' })
  idEstudante: number;
}
