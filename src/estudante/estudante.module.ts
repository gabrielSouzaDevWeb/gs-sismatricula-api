import { Module } from '@nestjs/common';
import { EstudanteController } from './estudante.controller';
import { EstudanteService } from './estudante.service';

@Module({
  imports: [],
  controllers: [EstudanteController],
  providers: [EstudanteService],
  exports: [EstudanteService],
})
export class EstudanteModule {}
