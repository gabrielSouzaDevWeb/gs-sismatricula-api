import {
  Injectable,
  NestMiddleware,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

export interface tenantsConnections {
  id: number;
  publicId: string;
  connection: connection;
}

export interface connection {
  name: string;
  type?: string;
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
  synchronize?: boolean;
  entities?: any[]; // Liste aqui as entidades específicas para cada inquilino
}

@Injectable()
export class TenantMiddleware implements NestMiddleware {
  tenantsConnections: tenantsConnections[] = [
    {
      id: 1,
      publicId: '3574dde5-4e98-4e55-9f97-34a93463e7d7',
      connection: {
        name: 'c3',
        type: 'postgres',
        host: 'host.docker.internal',
        port: 5432,
        username: 'postgres',
        password: 'postgres',
        database: 'GS_DB_ESCOLA_ARTE_DO_SABER',
        synchronize: false,
      },
    },
    {
      id: 2,
      publicId: '08623cca-dd33-4bf7-8ed7-aec8209436dc',
      connection: {
        name: 'c3',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: 'postgres',
        database: 'db-gs-arte-do-saber-api',
      },
    },
    {
      id: 3,
      publicId: '93916aa3-f2b8-41ba-9b13-4315ac1704d0',
      connection: {
        name: 'c3',
        host: 'host.docker.internal',
        port: 5432,
        username: 'postgres',
        password: 'postgres',
        database: 'GS_DB_ESCOLA_ARTE_DO_SABER',
      },
    },
  ];
  use(req: any, res: any, next: (error?: any) => void) {
    if (!req.headers['x-authentication-token']) {
      throw new UnauthorizedException();
    }
    const tenantConfig = this.tenantsConnections.find(
      (tenant) => tenant.publicId === req.headers['x-authentication-token'],
    )?.connection;
    if (!tenantConfig) {
      throw new NotFoundException('Configuração do inquilino não encontrada');
    }
    req.headers['tenant-connection'] = tenantConfig;
    next();
  }
}
