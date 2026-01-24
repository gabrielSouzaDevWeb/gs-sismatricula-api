import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from '../shared/dtos/login.dto';
import { BruteForceService } from '../shared/services/brute-force.service';

@Injectable()
export class AuthService {
  constructor(private readonly bruteForceService: BruteForceService) {}

  private users = [{ username: 'admin', password: 'admin' }];

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
    return { token: '08623cca-dd33-4bf7-8ed7-aec8209436dc' };
  }
}
