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
  CreateMatriculaWithRelationsDto,
  MatriculaQueryDto,
  UpdateMatriculaDto,
} from '../shared/dtos';
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
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  @Put('update/:id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateMatriculaDto,
  ) {
    return this.service.update(id, data);
  }

  @Delete('delete/:id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}
