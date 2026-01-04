import { Module } from '@nestjs/common';
import { TurnoController } from './turno.controller';
import { TurnoService } from './turno.service';

@Module({
  imports: [],
  controllers: [TurnoController],
  providers: [TurnoService],
  exports: [TurnoService],
})
export class TurnoModule {}
