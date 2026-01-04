import { Module } from '@nestjs/common';
import { TenantMiddleware } from './middlewares/tenant.middleware';

@Module({
  controllers: [],
  providers: [TenantMiddleware],
  exports: [TenantMiddleware],
})
export class TenantModule {}
