import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class UserAgentGuard implements CanActivate {
  private readonly maliciousAgents = [
    'sqlmap',
    'nmap',
    'nikto',
    'masscan',
    'curl',
    'wget',
    'python-requests',
    'scrapy',
    'bot',
    'crawler',
    'spider',
  ];

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const userAgent = (request.headers['user-agent'] || '').toLowerCase();

    // Se não tiver user-agent, bloquear
    if (!userAgent) {
      throw new ForbiddenException('User-Agent obrigatório');
    }

    // Verificar se contém algum agente malicioso
    const isMalicious = this.maliciousAgents.some((agent) =>
      userAgent.includes(agent),
    );

    if (isMalicious) {
      throw new ForbiddenException('User-Agent não autorizado');
    }

    return true;
  }
}
