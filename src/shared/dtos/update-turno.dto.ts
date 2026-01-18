import {
  IsIn,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
} from 'class-validator';
import { Turno } from '../infrastructure/entities/horario.entity';

const TIME_REGEX = /^(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d)?$/;

export class UpdateTurnoDto implements Partial<Turno> {
  @IsOptional()
  @IsString()
  @IsIn(['manhã', 'tarde', 'noite', 'integral'])
  turno?: string;

  @IsOptional()
  @IsString()
  @Matches(TIME_REGEX, {
    message: 'Horario de início deve estar no formato HH:mm ou HH:mm:ss',
  })
  horaInicio?: string;

  @IsOptional()
  @IsString()
  @Matches(TIME_REGEX, {
    message: 'Horário de encerramento deve estar no formato HH:mm ou HH:mm:ss',
  })
  horaFim?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  descricao?: string;

  @IsOptional()
  @IsString()
  @IsIn(['reforço', 'regular', 'extra'])
  tipoAula?: string;
}
