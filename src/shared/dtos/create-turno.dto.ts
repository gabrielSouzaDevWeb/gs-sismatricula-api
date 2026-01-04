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
  @IsString()
  @IsNotEmpty()
  @IsIn(['manhã', 'tarde', 'noite', 'integral'])
  turno: string;

  @IsString()
  @Matches(TIME_REGEX, {
    message: 'horaInicio deve estar no formato HH:mm ou HH:mm:ss',
  })
  horaInicio: string;

  @IsString()
  @Matches(TIME_REGEX, {
    message: 'horaFim deve estar no formato HH:mm ou HH:mm:ss',
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
