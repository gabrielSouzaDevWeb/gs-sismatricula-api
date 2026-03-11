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
      id: parseInt(process.env.TENANT_1_ID || '1'),
      publicId: process.env.TENANT_1_PUBLIC_ID || 'tenant_1_public_id',
      connection: {
        name:
          `${process.env.TENANT_1_DATABASE}_${process.env.TENANT_1_ID}` || 'c3',
        type: process.env.TENANT_1_TYPE || 'postgres',
        host: process.env.TENANT_1_HOST || 'host.docker.internal',
        port: parseInt(process.env.TENANT_1_PORT || '5432'),
        username: process.env.TENANT_1_USERNAME || 'postgres',
        password: process.env.TENANT_1_PASSWORD || 'postgres',
        database: process.env.TENANT_1_DATABASE || 'dbname',
        synchronize: process.env.TENANT_1_SYNCHRONIZE === 'S' || false,
      },
    },
    {
      id: parseInt(process.env.TENANT_PUBLIC_ID || '1'),
      publicId:
        process.env.TENANT_PUBLIC_PUBLIC_ID || 'tenant_PUBLIC_public_id',
      connection: {
        name:
          `${process.env.TENANT_PUBLIC_DATABASE}_${process.env.TENANT_PUBLIC_ID}` ||
          'c3',
        type: process.env.TENANT_PUBLIC_TYPE || 'postgres',
        host: process.env.TENANT_PUBLIC_HOST || 'host.docker.internal',
        port: parseInt(process.env.TENANT_PUBLIC_PORT || '5432'),
        username: process.env.TENANT_PUBLIC_USERNAME || 'postgres',
        password: process.env.TENANT_PUBLIC_PASSWORD || 'postgres',
        database: process.env.TENANT_PUBLIC_DATABASE || 'dbname',
        synchronize: process.env.TENANT_PUBLIC_SYNCHRONIZE === 'S' || false,
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
