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
  CreateMatriculaWithRelationsDto,
  MatriculaQueryDto,
  UpdateMatriculaDto,
} from '../shared/dtos';
import { MatriculaService } from './matricula.service';

@ApiTags('Matricula')
@ApiSecurity('x-authentication-token')
@Controller('matricula')
export class MatriculaController {
  constructor(private readonly service: MatriculaService) {}

  @Post('create')
  @ApiOperation({
    summary: 'Cria matrícula com estudante, filiações e mensalidades',
  })
  @ApiCreatedResponse({ description: 'Matrícula criada com sucesso' })
  @ApiBadRequestResponse({ description: 'Dados inválidos ou regra violada' })
  create(@Body() data: CreateMatriculaWithRelationsDto) {
    return this.service.create(data);
  }

  @Get('get-many')
  @ApiOperation({ summary: 'Lista matrículas com paginação e filtros' })
  @ApiOkResponse({ description: 'Matrículas listadas com sucesso' })
  findAll(@Query() query: MatriculaQueryDto) {
    return this.service.findAll(query);
  }

  @Get('get-one-by-id/:id')
  @ApiOperation({ summary: 'Busca matrícula por ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID da matrícula' })
  @ApiOkResponse({ description: 'Matrícula recuperada com sucesso' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  @Put('update/:id')
  @ApiOperation({ summary: 'Atualiza matrícula por ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID da matrícula' })
  @ApiOkResponse({ description: 'Matrícula atualizada com sucesso' })
  @ApiBadRequestResponse({ description: 'Dados inválidos ou regra violada' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateMatriculaDto,
  ) {
    return this.service.update(id, data);
  }

  @Delete('delete/:id')
  @ApiOperation({ summary: 'Remove matrícula por ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID da matrícula' })
  @ApiOkResponse({ description: 'Matrícula removida com sucesso' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}
