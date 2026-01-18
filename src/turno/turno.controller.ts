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
import { CreateTurnoDto, TurnoQueryDto, UpdateTurnoDto } from '../shared/dtos';
import { TurnoService } from './turno.service';

@Controller('turno')
export class TurnoController {
  constructor(private readonly service: TurnoService) {}

  @Post('create')
  create(@Body() data: CreateTurnoDto) {
    return this.service.create(data);
  }

  @Get('get-many')
  findAll(@Query() query: TurnoQueryDto) {
    return this.service.findAll(query);
  }

  @Get('get-one-by-id/:id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  @Put('update/:id')
  update(@Param('id', ParseIntPipe) id: number, @Body() data: UpdateTurnoDto) {
    return this.service.update(id, data);
  }

  @Delete('delete/:id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}
