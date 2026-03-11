import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { LoginDto } from '../shared/dtos/login.dto';
import { BruteForceService } from '../shared/services/brute-force.service';

@Injectable()
export class AuthService {
  private users: Array<{ username: string; password: string; token: string }> =
    [];
  //
  constructor(
    private readonly bruteForceService: BruteForceService,
    private readonly configService: ConfigService,
  ) {
    this.users.push(
      {
        username:
          this.configService.get<string>('ADMIN_USERNAME') || `${+new Date()}`,
        password:
          this.configService.get<string>('ADMIN_PASSWORD') || `${+new Date()}`,
        token: process.env.TENANT_1_PUBLIC_ID || 'tenant_1_public_id',
      },
      {
        username:
          this.configService.get<string>('PUBLIC_USERNAME') || `${+new Date()}`,
        password:
          this.configService.get<string>('PUBLIC_PASSWORD') || `${+new Date()}`,
        token: process.env.TENANT_PUBLIC_PUBLIC_ID || 'tenant_PUBLIC_public_id',
      },
    );
  }

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
    return { token: user.token };
  }
}
