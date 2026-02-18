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

@Controller('mensalidade')
export class MensalidadeController {
  constructor(private readonly service: MensalidadeService) {}

  @Get('get-many')
  findAll(@Query() query: MensalidadeQueryDto) {
    return this.service.findAll(query);
  }

  @Get('matricula/:id')
  findByMatricula(
    @Param('id', ParseIntPipe) id: number,
    @Query() query: PaginationDto,
  ) {
    return this.service.findByMatricula(id, query);
  }

  @Post('gerar/:idMatricula')
  gerar(
    @Param('idMatricula', ParseIntPipe) idMatricula: number,
    @Body() data: GerarMensalidadesDto,
  ) {
    return this.service.gerarMensalidades(idMatricula, data);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  @Post()
  create(@Body() data: CreateMensalidadeDto) {
    return this.service.create(data);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateMensalidadeDto,
  ) {
    return this.service.update(id, data);
  }

  @Patch(':id/pagamento')
  registrarPagamento(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: RegistrarPagamentoDto,
  ) {
    return this.service.registrarPagamento(id, data);
  }

  @Patch(':id/revogar-baixa')
  revogarBaixa(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: RevogarBaixaDto,
  ) {
    return this.service.revogarBaixa(id, data);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}
