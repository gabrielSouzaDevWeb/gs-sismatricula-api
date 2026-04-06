import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
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
import { MensalidadeService } from 'src/mensalidade/mensalidade.service';
import {
  CreateMensalidadeDto,
  GerarMensalidadesDto,
  MensalidadeQueryDto,
  PaginationDto,
  RegistrarPagamentoDto,
  RevogarBaixaDto,
  UpdateMensalidadeDto,
} from '../shared/dtos';

@ApiTags('Mensalidade')
@ApiSecurity('x-authentication-token')
@Controller('mensalidade')
export class MensalidadeController {
  constructor(private readonly service: MensalidadeService) {}

  @Get('get-many')
  @ApiOperation({ summary: 'Lista mensalidades com paginação e filtros' })
  @ApiOkResponse({ description: 'Mensalidades listadas com sucesso' })
  findAll(@Query() query: MensalidadeQueryDto) {
    return this.service.findAll(query);
  }

  @Get('matricula/:id')
  @ApiOperation({ summary: 'Lista mensalidades por matrícula' })
  @ApiParam({ name: 'id', type: Number, description: 'ID da matrícula' })
  @ApiOkResponse({
    description: 'Mensalidades da matrícula listadas com sucesso',
  })
  findByMatricula(
    @Param('id', ParseIntPipe) id: number,
    @Query() query: PaginationDto,
  ) {
    return this.service.findByMatricula(id, query);
  }

  @Post('gerar/:idMatricula')
  @ApiOperation({
    summary: 'Gera mensalidades para uma matrícula',
    description:
      'Regera as mensalidades quando ainda não há pagamentos registrados.',
  })
  @ApiParam({
    name: 'idMatricula',
    type: Number,
    description: 'ID da matrícula',
  })
  @ApiCreatedResponse({ description: 'Mensalidades geradas com sucesso' })
  @ApiBadRequestResponse({ description: 'Dados inválidos ou regra violada' })
  gerar(
    @Param('idMatricula', ParseIntPipe) idMatricula: number,
    @Body() data: GerarMensalidadesDto,
  ) {
    return this.service.gerarMensalidades(idMatricula, data);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Busca mensalidade por ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID da mensalidade' })
  @ApiOkResponse({ description: 'Mensalidade recuperada com sucesso' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Cria uma mensalidade manualmente' })
  @ApiCreatedResponse({ description: 'Mensalidade criada com sucesso' })
  @ApiBadRequestResponse({ description: 'Dados inválidos' })
  create(@Body() data: CreateMensalidadeDto) {
    return this.service.create(data);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualiza mensalidade por ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID da mensalidade' })
  @ApiOkResponse({ description: 'Mensalidade atualizada com sucesso' })
  @ApiBadRequestResponse({ description: 'Dados inválidos' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateMensalidadeDto,
  ) {
    return this.service.update(id, data);
  }

  @Patch(':id/pagamento')
  @ApiOperation({ summary: 'Registra pagamento de uma mensalidade' })
  @ApiParam({ name: 'id', type: Number, description: 'ID da mensalidade' })
  @ApiOkResponse({ description: 'Pagamento registrado com sucesso' })
  @ApiBadRequestResponse({ description: 'Pagamento já registrado ou inválido' })
  registrarPagamento(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: RegistrarPagamentoDto,
  ) {
    return this.service.registrarPagamento(id, data);
  }

  @Patch(':id/revogar-baixa')
  @ApiOperation({ summary: 'Revoga baixa de uma mensalidade paga' })
  @ApiParam({ name: 'id', type: Number, description: 'ID da mensalidade' })
  @ApiOkResponse({ description: 'Baixa revogada com sucesso' })
  @ApiBadRequestResponse({
    description: 'Mensalidade sem pagamento registrado',
  })
  revogarBaixa(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: RevogarBaixaDto,
  ) {
    return this.service.revogarBaixa(id, data);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove mensalidade por ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID da mensalidade' })
  @ApiOkResponse({ description: 'Mensalidade removida com sucesso' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}
