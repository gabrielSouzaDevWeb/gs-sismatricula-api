import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import type { Request } from 'express';
import { LoginDto } from '../shared/dtos/login.dto';
import { BruteForceGuard } from '../shared/guards/brute-force.guard';
import { AuthService } from './auth.service';

@ApiTags('Auth')
@Controller('auth')
@UseGuards(BruteForceGuard)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({
    summary: 'Autentica usuário e retorna token de tenant',
    description:
      'Use o token retornado no header x-authentication-token para acessar os demais endpoints.',
  })
  @ApiBody({ type: LoginDto })
  @ApiCreatedResponse({
    description: 'Autenticação realizada com sucesso',
    schema: {
      example: {
        token: 'tenant_1_public_id',
      },
    },
  })
  @ApiUnauthorizedResponse({
    description: 'Credenciais inválidas ou bloqueio por muitas tentativas',
  })
  login(@Body() loginDto: LoginDto, @Req() req: Request) {
    const ip = req.ip || req.connection.remoteAddress || 'unknown';
    return this.authService.login(loginDto, ip);
  }
}
