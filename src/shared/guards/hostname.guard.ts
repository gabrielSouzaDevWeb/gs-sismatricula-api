import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class HostnameGuard implements CanActivate {
  private readonly allowedHostnames = [
    'gabrielsouzadevweb.com.br',
    'localhost',
    '127.0.0.1',
  ];

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const hostname = request.hostname || request.headers.host?.split(':')[0];

    // Se não conseguir determinar o hostname, bloquear
    if (!hostname) {
      throw new ForbiddenException('Hostname inválido');
    }

    // Verificar se o hostname está na lista de permitidos
    const isAllowed = this.allowedHostnames.some((allowed) =>
      hostname.includes(allowed),
    );

    if (!isAllowed) {
      throw new ForbiddenException('Acesso direto por IP não permitido');
    }

    return true;
  }
}
