import { Type } from 'class-transformer';
import { IsArray, IsInt, IsNotEmpty, ValidateNested } from 'class-validator';

export class VincularEstudanteFiliacaoDto {
  @IsInt({ message: 'O ID do estudante deve ser um número inteiro válido' })
  @IsNotEmpty({ message: 'O ID do estudante é obrigatório' })
  idEstudante: number;

  @IsArray({ message: 'Os IDs das filiações devem ser um array' })
  @IsInt({
    each: true,
    message: 'Cada ID de filiação deve ser um número inteiro válido',
  })
  @IsNotEmpty({ message: 'É necessário informar pelo menos uma filiação' })
  idFiliacoes: number[];
}

export class CriarFiliacaoComVinculoDto {
  @Type(() => Object)
  @ValidateNested()
  filiacao: any; // Aceita os dados da filiação

  @IsInt({ message: 'O ID do estudante deve ser um número inteiro válido' })
  @IsNotEmpty({ message: 'O ID do estudante é obrigatório' })
  idEstudante: number;
}
