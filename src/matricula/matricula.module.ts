import { Module } from '@nestjs/common';
import { EstudanteModule } from 'src/estudante/estudante.module';
import { FiliacaoModule } from 'src/filiacao/filiacao.module';
import { MatriculaController } from './matricula.controller';
import { MatriculaService } from './matricula.service';

@Module({
  imports: [EstudanteModule, FiliacaoModule],
  controllers: [MatriculaController],
  providers: [MatriculaService],
  exports: [MatriculaService],
})
export class MatriculaModule {}
