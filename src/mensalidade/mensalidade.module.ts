import { Module } from '@nestjs/common';
import { MensalidadeController } from './mensalidade.controller';
import { MensalidadeService } from './mensalidade.service';

@Module({
  imports: [],
  controllers: [MensalidadeController],
  providers: [MensalidadeService],
  exports: [MensalidadeService],
})
export class MensalidadeModule {}
