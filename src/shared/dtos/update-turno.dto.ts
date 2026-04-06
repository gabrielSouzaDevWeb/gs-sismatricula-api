import { ApiPropertyOptional } from '@nestjs/swagger';
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
  @ApiPropertyOptional({
    description: 'Nome do turno',
    enum: ['manhã', 'tarde', 'noite', 'integral'],
    example: 'tarde',
  })
  @IsOptional()
  @IsString()
  @IsIn(['manhã', 'tarde', 'noite', 'integral'])
  turno?: string;

  @ApiPropertyOptional({
    description: 'Hora de início no formato HH:mm ou HH:mm:ss',
    example: '13:30',
  })
  @IsOptional()
  @IsString()
  @Matches(TIME_REGEX, {
    message: 'Horario de início deve estar no formato HH:mm ou HH:mm:ss',
  })
  horaInicio?: string;

  @ApiPropertyOptional({
    description: 'Hora de fim no formato HH:mm ou HH:mm:ss',
    example: '17:30',
  })
  @IsOptional()
  @IsString()
  @Matches(TIME_REGEX, {
    message: 'Horário de encerramento deve estar no formato HH:mm ou HH:mm:ss',
  })
  horaFim?: string;

  @ApiPropertyOptional({
    description: 'Descrição adicional do turno',
    example: 'Turma reforço da tarde',
  })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  descricao?: string;

  @ApiPropertyOptional({
    description: 'Tipo de aula',
    enum: ['reforço', 'regular', 'extra'],
    example: 'reforço',
  })
  @IsOptional()
  @IsString()
  @IsIn(['reforço', 'regular', 'extra'])
  tipoAula?: string;
}
