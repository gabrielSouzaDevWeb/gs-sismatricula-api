import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { BruteForceService } from '../services/brute-force.service';

@Injectable()
export class BruteForceGuard implements CanActivate {
  constructor(private readonly bruteForceService: BruteForceService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const ip = request.ip || request.connection.remoteAddress || 'unknown';

    if (this.bruteForceService.isBlocked(ip)) {
      const remaining = this.bruteForceService.getRemainingTime(ip);
      const message = remaining
        ? `Muitas tentativas de login. Tente novamente em ${remaining} segundos.`
        : 'Muitas tentativas de login. Tente novamente mais tarde.';
      throw new UnauthorizedException(message);
    }

    this.bruteForceService.recordAttempt(ip);
    return true;
  }
}
