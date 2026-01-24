import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from '../shared/dtos/login.dto';
import { BruteForceService } from '../shared/services/brute-force.service';

@Injectable()
export class AuthService {
  constructor(private readonly bruteForceService: BruteForceService) {}

  private users = [
    {
      username: process.env.ADMIN_USERNAME || +new Date(),
      password: process.env.ADMIN_PASSWORD || +new Date(),
    },
  ];

  login(loginDto: LoginDto, ip: string): { token: string } {
    const user = this.users.find(
      (u) =>
        u.username === loginDto.username && u.password === loginDto.password,
    );

    if (!user) {
      this.bruteForceService.recordAttempt(ip);
      throw new UnauthorizedException('Credenciais inválidas');
    }

    this.bruteForceService.resetAttempts(ip);
    return { token: process.env.TENANT_1_PUBLIC_ID || 'tenant_1_public_id' };
  }
}
