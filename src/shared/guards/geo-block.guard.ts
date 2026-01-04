import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class GeoBlockGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();

    // Cloudflare envia o país no header CF-IPCountry
    const country =
      request.headers['cf-ipcountry'] || request.headers['CF-IPCountry'];

    // Se não tiver o header (ambiente local), permitir
    if (!country) {
      return true;
    }

    // Bloquear se não for do Brasil
    if (country !== 'BR') {
      throw new ForbiddenException('Acesso bloqueado para sua região');
    }

    return true;
  }
}
