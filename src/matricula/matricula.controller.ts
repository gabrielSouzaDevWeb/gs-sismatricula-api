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
import {
  CreateMatriculaWithRelationsDto,
  MatriculaQueryDto,
} from '../shared/dtos';
import { Matricula } from '../shared/infrastructure/entities/matricula.entity';
import { MatriculaService } from './matricula.service';

@Controller('matricula')
export class MatriculaController {
  constructor(private readonly service: MatriculaService) {}

  @Post('create')
  create(@Body() data: CreateMatriculaWithRelationsDto) {
    return this.service.create(data);
  }

  @Get('get-many')
  findAll(@Query() query: MatriculaQueryDto) {
    return this.service.findAll(query);
  }

  @Get('get-one-by-id/:id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Put('update/:id')
  update(@Param('id') id: string, @Body() data: Partial<Matricula>) {
    return this.service.update(id, data);
  }

  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
