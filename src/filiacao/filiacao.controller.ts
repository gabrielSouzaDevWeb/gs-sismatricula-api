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
import { Filiacao } from 'src/shared/infrastructure/entities';
import { CreateFiliacaoDto, FiliacaoQueryDto } from '../shared/dtos';
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
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Put('update/:id')
  update(@Param('id') id: string, @Body() data: Partial<Filiacao>) {
    return this.service.update(id, data);
  }

  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
