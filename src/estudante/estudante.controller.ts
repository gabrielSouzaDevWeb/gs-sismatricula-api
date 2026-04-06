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
  CreateEstudanteDto,
  EstudanteQueryDto,
  UpdateEstudanteDto,
} from '../shared/dtos';
import { EstudanteService } from './estudante.service';

@ApiTags('Estudante')
@ApiSecurity('x-authentication-token')
@Controller('estudante')
export class EstudanteController {
  constructor(private readonly service: EstudanteService) {}

  @Post()
  @ApiOperation({ summary: 'Cria um estudante' })
  @ApiCreatedResponse({ description: 'Estudante criado com sucesso' })
  @ApiBadRequestResponse({ description: 'Dados inválidos' })
  create(@Body() data: CreateEstudanteDto) {
    return this.service.create(data);
  }

  @Get()
  @ApiOperation({ summary: 'Lista estudantes com paginação e filtros' })
  @ApiOkResponse({ description: 'Estudantes listados com sucesso' })
  findAll(@Query() query: EstudanteQueryDto) {
    return this.service.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Busca estudante por ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID do estudante' })
  @ApiOkResponse({ description: 'Estudante recuperado com sucesso' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualiza estudante por ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID do estudante' })
  @ApiOkResponse({ description: 'Estudante atualizado com sucesso' })
  @ApiBadRequestResponse({ description: 'Dados inválidos' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateEstudanteDto,
  ) {
    return this.service.update(id, data);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove estudante por ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID do estudante' })
  @ApiOkResponse({ description: 'Estudante removido com sucesso' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}
