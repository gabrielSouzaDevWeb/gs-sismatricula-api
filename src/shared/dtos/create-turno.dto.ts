import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
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
  @ApiProperty({
    description: 'Nome do turno',
    enum: ['manhã', 'tarde', 'noite', 'integral'],
    example: 'manhã',
  })
  @IsString({ message: 'O turno deve ser uma string válida' })
  @IsNotEmpty({ message: 'O turno é obrigatório' })
  @IsIn(['manhã', 'tarde', 'noite', 'integral'], {
    message: 'O turno deve ser "manhã", "tarde", "noite" ou "integral"',
  })
  turno: string;

  @ApiProperty({
    description: 'Hora de início no formato HH:mm ou HH:mm:ss',
    example: '07:30',
  })
  @IsString({ message: 'A hora de início deve ser uma string válida' })
  @Matches(TIME_REGEX, {
    message: 'A hora de início deve estar no formato HH:mm ou HH:mm:ss',
  })
  horaInicio: string;

  @ApiProperty({
    description: 'Hora de fim no formato HH:mm ou HH:mm:ss',
    example: '11:30',
  })
  @IsString({ message: 'A hora de fim deve ser uma string válida' })
  @Matches(TIME_REGEX, {
    message: 'A hora de fim deve estar no formato HH:mm ou HH:mm:ss',
  })
  horaFim: string;

  @ApiPropertyOptional({
    description: 'Descrição adicional do turno',
    example: 'Turma regular da manhã',
    maxLength: 100,
  })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  descricao?: string;

  @ApiPropertyOptional({
    description: 'Tipo de aula',
    enum: ['reforço', 'regular', 'extra'],
    example: 'regular',
  })
  @IsOptional()
  @IsString()
  @IsIn(['reforço', 'regular', 'extra'])
  tipoAula?: string;
}
