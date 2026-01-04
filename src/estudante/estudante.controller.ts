import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CreateEstudanteDto, EstudanteQueryDto } from '../shared/dtos';
import { Estudante } from '../shared/infrastructure/entities';
import { EstudanteService } from './estudante.service';

@Controller('estudante')
export class EstudanteController {
  constructor(private readonly service: EstudanteService) {}

  @Post()
  create(@Body() data: CreateEstudanteDto) {
    return this.service.create(data);
  }

  @Get()
  findAll(@Query() query: EstudanteQueryDto) {
    return this.service.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: Partial<Estudante>) {
    return this.service.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
