import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  private users = [{ username: 'admin', password: 'admin' }];

  login(loginDto: LoginDto): { token: string } {
    const user = this.users.find(
      (u) =>
        u.username === loginDto.username && u.password === loginDto.password,
    );

    if (!user) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    return { token: '08623cca-dd33-4bf7-8ed7-aec8209436dc' };
  }
}
