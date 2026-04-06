import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';
import {
  CreateFiliacaoDto,
  FiliacaoQueryDto,
  UpdateFiliacaoDto,
} from '../shared/dtos';
import { FiliacaoService } from './filiacao.service';

@ApiTags('Filiacao')
@ApiSecurity('x-authentication-token')
@Controller('filiacao')
export class FiliacaoController {
  constructor(private readonly service: FiliacaoService) {}

  @Post('create')
  @ApiOperation({ summary: 'Cria uma filiação' })
  @ApiCreatedResponse({ description: 'Filiação criada com sucesso' })
  @ApiBadRequestResponse({ description: 'Dados inválidos' })
  create(@Body() data: CreateFiliacaoDto) {
    return this.service.create(data);
  }

  @Get('get-many')
  @ApiOperation({ summary: 'Lista filiações com paginação e filtros' })
  @ApiOkResponse({ description: 'Filiações listadas com sucesso' })
  findAll(@Query() query: FiliacaoQueryDto) {
    return this.service.findAll(query);
  }

  @Get('get-one-by-id/:id')
  @ApiOperation({ summary: 'Busca filiação por ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID da filiação' })
  @ApiOkResponse({ description: 'Filiação recuperada com sucesso' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  @Put('update/:id')
  @ApiOperation({ summary: 'Atualiza filiação por ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID da filiação' })
  @ApiOkResponse({ description: 'Filiação atualizada com sucesso' })
  @ApiBadRequestResponse({ description: 'Dados inválidos' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateFiliacaoDto,
  ) {
    return this.service.update(id, data);
  }

  @Delete('remove-estudante-filiacao/:idEstudante/:idFiliacao')
  @ApiOperation({
    summary: 'Remove vínculo entre estudante e filiação',
    description:
      'Não remove a filiação em si, apenas o vínculo com o estudante informado.',
  })
  @ApiParam({
    name: 'idEstudante',
    type: Number,
    description: 'ID do estudante',
  })
  @ApiParam({ name: 'idFiliacao', type: Number, description: 'ID da filiação' })
  @ApiOkResponse({ description: 'Vínculo removido com sucesso' })
  @ApiBadRequestResponse({
    description: 'Remoção não permitida pelas regras de negócio',
  })
  remove(
    @Param('idEstudante', ParseIntPipe) idEstudante: number,
    @Param('idFiliacao', ParseIntPipe) idFiliacao: number,
  ) {
    return this.service.removeFiliacaoEstudante({
      idEstudante,
      idFiliacao,
    });
  }
}
