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
  CreateEstudanteDto,
  EstudanteQueryDto,
  UpdateEstudanteDto,
} from '../shared/dtos';
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
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateEstudanteDto,
  ) {
    return this.service.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}
