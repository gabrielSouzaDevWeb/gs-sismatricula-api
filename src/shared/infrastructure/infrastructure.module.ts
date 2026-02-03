import { Global, Module } from '@nestjs/common';

import { EstudanteFiliacaoService } from '../services/estudante-filiacao.service';
import { DynamicDataSourceProvider } from './dynamic-dataSource-provider.config';
import * as entities from './entities';
import { TenantConnectionDatabaseProvider } from './tenant';
import { TenantModule } from './tennant/tenant.module';

export const STUDENT_ENTITIES = Object.values(entities);

@Global()
@Module({
  imports: [TenantModule],
  providers: [
    DynamicDataSourceProvider,
    TenantConnectionDatabaseProvider,
    EstudanteFiliacaoService,
    ...STUDENT_ENTITIES,
  ],
  exports: [
    ...STUDENT_ENTITIES,
    TenantConnectionDatabaseProvider,
    EstudanteFiliacaoService,
  ],
})
export class InfrastructureModule {}
