import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EstudanteModule } from './estudante/estudante.module';
import { FiliacaoModule } from './filiacao/filiacao.module';
import { MatriculaModule } from './matricula/matricula.module';
import { InfrastructureModule } from './shared/infrastructure/infrastructure.module';
import { TenantMiddleware } from './shared/infrastructure/tennant/middlewares/tenant.middleware';
import { TurnoModule } from './turno/turno.module';

@Module({
  imports: [
    InfrastructureModule,
    EstudanteModule,
    FiliacaoModule,
    TurnoModule,
    MatriculaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TenantMiddleware).forRoutes('*');
  }
}
