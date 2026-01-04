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
import { CreateTurnoDto, TurnoQueryDto } from '../shared/dtos';
import { Turno } from '../shared/infrastructure/entities/horario.entity';
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
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Put('update/:id')
  update(@Param('id') id: string, @Body() data: Partial<Turno>) {
    return this.service.update(id, data);
  }

  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
