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
import { CreateTurnoDto, TurnoQueryDto, UpdateTurnoDto } from '../shared/dtos';
import { TurnoService } from './turno.service';

@ApiTags('Turno')
@ApiSecurity('x-authentication-token')
@Controller('turno')
export class TurnoController {
  constructor(private readonly service: TurnoService) {}

  @Post('create')
  @ApiOperation({ summary: 'Cria um turno' })
  @ApiCreatedResponse({ description: 'Turno criado com sucesso' })
  @ApiBadRequestResponse({
    description: 'Turno já existente ou dados inválidos',
  })
  create(@Body() data: CreateTurnoDto) {
    return this.service.create(data);
  }

  @Get('get-many')
  @ApiOperation({ summary: 'Lista turnos com paginação e filtros' })
  @ApiOkResponse({ description: 'Turnos listados com sucesso' })
  findAll(@Query() query: TurnoQueryDto) {
    return this.service.findAll(query);
  }

  @Get('get-one-by-id/:id')
  @ApiOperation({ summary: 'Busca turno por ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID do turno' })
  @ApiOkResponse({ description: 'Turno recuperado com sucesso' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  @Put('update/:id')
  @ApiOperation({ summary: 'Atualiza turno por ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID do turno' })
  @ApiOkResponse({ description: 'Turno atualizado com sucesso' })
  @ApiBadRequestResponse({ description: 'Dados inválidos' })
  update(@Param('id', ParseIntPipe) id: number, @Body() data: UpdateTurnoDto) {
    return this.service.update(id, data);
  }

  @Delete('delete/:id')
  @ApiOperation({ summary: 'Remove turno por ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID do turno' })
  @ApiOkResponse({ description: 'Turno removido com sucesso' })
  @ApiBadRequestResponse({
    description: 'Não é possível remover turno com matrículas ativas',
  })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}
