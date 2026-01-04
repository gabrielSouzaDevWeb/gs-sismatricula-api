import { Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { DynamicDataSourceProvider } from './dynamic-dataSource-provider.config';
export const TENANT_CONNECTION_DATABASE_PROVIDER =
  'TENANT_CONNECTION_DATABASE_PROVIDER';

export const TenantConnectionDatabaseProvider = {
  provide: TENANT_CONNECTION_DATABASE_PROVIDER,
  scope: Scope.REQUEST,
  inject: [REQUEST, DynamicDataSourceProvider],
  useFactory: async (
    request: Request,
    connectionProvider: DynamicDataSourceProvider,
  ) => {
    return await connectionProvider.createDataSource(request);
  },
};
