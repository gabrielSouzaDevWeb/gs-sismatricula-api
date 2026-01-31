import {
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
} from 'class-validator';

const TIME_REGEX = /^(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d)?$/;

export class CreateTurnoDto {
  @IsString({ message: 'O turno deve ser uma string válida' })
  @IsNotEmpty({ message: 'O turno é obrigatório' })
  @IsIn(['manhã', 'tarde', 'noite', 'integral'], {
    message: 'O turno deve ser "manhã", "tarde", "noite" ou "integral"',
  })
  turno: string;

  @IsString({ message: 'A hora de início deve ser uma string válida' })
  @Matches(TIME_REGEX, {
    message: 'A hora de início deve estar no formato HH:mm ou HH:mm:ss',
  })
  horaInicio: string;

  @IsString({ message: 'A hora de fim deve ser uma string válida' })
  @Matches(TIME_REGEX, {
    message: 'A hora de fim deve estar no formato HH:mm ou HH:mm:ss',
  })
  horaFim: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  descricao?: string;

  @IsOptional()
  @IsString()
  @IsIn(['reforço', 'regular', 'extra'])
  tipoAula?: string;
}
