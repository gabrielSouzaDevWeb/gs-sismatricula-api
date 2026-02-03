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
  CreateFiliacaoDto,
  FiliacaoQueryDto,
  UpdateFiliacaoDto,
} from '../shared/dtos';
import { FiliacaoService } from './filiacao.service';

@Controller('filiacao')
export class FiliacaoController {
  constructor(private readonly service: FiliacaoService) {}

  @Post('create')
  create(@Body() data: CreateFiliacaoDto) {
    return this.service.create(data);
  }

  @Get('get-many')
  findAll(@Query() query: FiliacaoQueryDto) {
    return this.service.findAll(query);
  }

  @Get('get-one-by-id/:id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  @Put('update/:id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateFiliacaoDto,
  ) {
    return this.service.update(id, data);
  }

  @Delete('remove-estudante-filiacao/:idEstudante/:idFiliacao')
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
