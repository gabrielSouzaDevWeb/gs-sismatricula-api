import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { EstudanteModule } from './estudante/estudante.module';
import { FiliacaoModule } from './filiacao/filiacao.module';
import { MatriculaModule } from './matricula/matricula.module';
import { MensalidadeModule } from './mensalidade/mensalidade.module';
import { EnderecoModule } from './endereco/endereco.module';
import { InfrastructureModule } from './shared/infrastructure/infrastructure.module';
import { CnpjModule } from './cnpj/cnpj.module';
import { TenantMiddleware } from './shared/infrastructure/tennant/middlewares/tenant.middleware';
import { TurnoModule } from './turno/turno.module';

@Module({
  imports: [
    InfrastructureModule,
    AuthModule,
    EstudanteModule,
    FiliacaoModule,
    TurnoModule,

    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MatriculaModule,
    MensalidadeModule,
    EnderecoModule,
    CnpjModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(TenantMiddleware)
      .exclude(
        '/auth/(.*)',
        '/docs',
        '/docs/(.*)',
        '/docs-json',
        '/cep',
        '/cep/(.*)',
        '/cnpj',
        '/cnpj/(.*)',
        '/api/cep',
        '/api/cep/(.*)',
        '/api/cnpj',
        '/api/cnpj/(.*)',
        '/api/docs',
        '/api/docs/(.*)',
        '/api/docs-json',
      )
      .forRoutes({ path: '(.*)', method: RequestMethod.ALL });
  }
}
