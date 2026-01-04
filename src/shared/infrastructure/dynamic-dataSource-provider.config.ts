import { Injectable, Scope } from '@nestjs/common';
import { DataSource } from 'typeorm';
import * as entities from './entities';
import { connection } from './tennant/middlewares/tenant.middleware';
import * as migrations from './migrations';

@Injectable({ scope: Scope.REQUEST })
export class DynamicDataSourceProvider {
  public async createDataSource(request: Request): Promise<DataSource> {
    try {
      const { host, port, username, password, database } = request.headers[
        'tenant-connection'
      ] as unknown as connection;
      const dataSource = new DataSource({
        name: request.headers['x-authentication-token'] as string,
        schema: 'public',
        type: 'postgres',
        host,
        port,
        entities,
        username,
        password,
        database,
        migrations,
        migrationsRun: true,
        logging: true,
        synchronize: false,
      });

      await dataSource.initialize();
      return dataSource as DataSource;
    } catch (error) {
      throw error;
    }
  }
}
