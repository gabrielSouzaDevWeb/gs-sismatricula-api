import {
  ApiHideProperty,
  ApiProperty,
  ApiPropertyOptional,
} from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  Max,
  Min,
  ValidateNested,
} from 'class-validator';
import { StatusMatricula } from '../enum/status-matricula.enum';
import { CreateEstudanteDto } from './create-estudante.dto';
import { CreateFiliacaoNestedDto } from './create-filiacao-nested.dto';

export class CreateMatriculaWithRelationsDto {
  @ApiProperty({
    description: 'Dados do estudante a ser criado junto com a matrícula',
    type: () => CreateEstudanteDto,
  })
  @ValidateNested({ message: 'Os dados do estudante são inválidos' })
  @Type(() => CreateEstudanteDto)
  estudante!: CreateEstudanteDto;

  @ApiProperty({
    description: 'Lista de filiações vinculadas ao estudante',
    type: () => [CreateFiliacaoNestedDto],
    minItems: 1,
  })
  @IsArray({ message: 'As filiações devem ser um array válido' })
  @ArrayMinSize(1, {
    message: 'É necessário adicionar pelo menos uma filiação',
  })
  @ValidateNested({ each: true })
  @Type(() => CreateFiliacaoNestedDto)
  filiacoes!: CreateFiliacaoNestedDto[];

  @ApiProperty({ description: 'ID do turno', example: 2 })
  @IsNumber({}, { message: 'O ID do turno deve ser um número válido' })
  @IsNotEmpty({ message: 'O ID do turno é obrigatório' })
  idTurno!: number;

  @ApiProperty({ description: 'Ano letivo da matrícula', example: 2026 })
  @Type(() => Number)
  @IsInt({ message: 'O ano letivo deve ser um número inteiro válido' })
  anoLetivo!: number;

  @ApiPropertyOptional({
    description: 'Status da matrícula',
    enum: StatusMatricula,
    example: StatusMatricula.ATIVA,
  })
  @IsOptional()
  @Type(() => Number)
  @IsEnum(StatusMatricula, {
    message:
      'O status deve ser um valor válido do enum StatusMatricula (1=Ativa, 2=Cancelada, 3=Trancada, 4=Concluída)',
  })
  status?: StatusMatricula;

  @ApiPropertyOptional({
    description: 'Valor da mensalidade',
    example: 350.5,
    minimum: 0,
  })
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

  @ApiProperty({
    description: 'Valor da matrícula',
    example: 150,
    minimum: 0,
  })
  @Type(() => Number)
  @IsNumber(
    { maxDecimalPlaces: 2 },
    {
      message:
        'O valor da matrícula deve ser um número válido com até 2 casas decimais',
    },
  )
  @Min(0, { message: 'O valor da matrícula não pode ser negativo' })
  valorMatricula!: number;

  @ApiPropertyOptional({
    description: 'Quantidade de mensalidades a gerar',
    example: 12,
    minimum: 1,
  })
  @IsOptional()
  @Transform(({ value, obj }) => {})
  @Type(() => Number)
  @IsInt({ message: 'A quantidade de mensalidades deve ser um número inteiro' })
  @Min(1, { message: 'A quantidade de mensalidades deve ser no mínimo 1' })
  quantidadeMensalidades?: number;

  @ApiProperty({
    description: 'Dia de vencimento das mensalidades',
    example: 10,
    minimum: 1,
    maximum: 31,
  })
  @Type(() => Number)
  @IsInt({ message: 'O dia de vencimento deve ser um número inteiro' })
  @Min(1, { message: 'O dia de vencimento deve ser no mínimo 1' })
  @Max(31, { message: 'O dia de vencimento deve ser no máximo 31' })
  diaVencimento!: number;

  @ApiProperty({
    description: 'Mês inicial das mensalidades',
    example: 1,
    minimum: 1,
    maximum: 12,
  })
  @Type(() => Number)
  @IsInt({
    message: 'O mês de início da mensalidade deve ser um número inteiro',
  })
  @Min(1, { message: 'O mês de início deve ser entre 1 e 12' })
  @Max(12, { message: 'O mês de início deve ser entre 1 e 12' })
  set mesInicioMensalidade(value: number) {
    this.quantidadeMensalidades =
      Math.abs(value - (this.__mesInicioMensalidade__ ?? value)) + 1;
    this.__mesInicioMensalidade__ = value;
  }

  get mesInicioMensalidade(): number | undefined {
    return this.__mesInicioMensalidade__;
  }

  @ApiProperty({
    description: 'Mês final das mensalidades',
    example: 12,
    minimum: 1,
    maximum: 12,
  })
  @Type(() => Number)
  @IsInt({ message: 'O mês de fim da mensalidade deve ser um número inteiro' })
  @Min(1, { message: 'O mês de fim deve ser entre 1 e 12' })
  @Max(12, { message: 'O mês de fim deve ser entre 1 e 12' })
  set mesFimMensalidade(value: number) {
    const mesInicioAtual = this.mesInicioMensalidade ?? value;
    this.quantidadeMensalidades =
      Math.abs((this.__mesFimMensalidade__ ?? value) - mesInicioAtual) + 1;
    this.__mesFimMensalidade__ = value;
  }
  get mesFimMensalidade(): number | undefined {
    return this.__mesFimMensalidade__;
  }

  @ApiPropertyOptional({
    description: 'Observações gerais da matrícula',
    example: 'Aluno bolsista parcial',
  })
  @IsOptional()
  observacoes?: string;

  @ApiPropertyOptional({
    description: 'ID da filiação responsável pelo pagamento',
    example: 12,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  idResponsavelPagamento?: number;

  @ApiHideProperty()
  @IsOptional()
  __mesInicioMensalidade__?: number;
  @ApiHideProperty()
  @IsOptional()
  __mesFimMensalidade__?: number;
}
