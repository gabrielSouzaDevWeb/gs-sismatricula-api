import { Module } from '@nestjs/common';
import { FiliacaoController } from './filiacao.controller';
import { FiliacaoService } from './filiacao.service';

@Module({
  imports: [],
  controllers: [FiliacaoController],
  providers: [FiliacaoService],
  exports: [FiliacaoService],
})
export class FiliacaoModule {}
