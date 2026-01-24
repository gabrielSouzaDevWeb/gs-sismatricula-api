import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import type { Request } from 'express';
import { LoginDto } from '../shared/dtos/login.dto';
import { BruteForceGuard } from '../shared/guards/brute-force.guard';
import { AuthService } from './auth.service';

@Controller('auth')
@UseGuards(BruteForceGuard)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() loginDto: LoginDto, @Req() req: Request) {
    const ip = req.ip || req.connection.remoteAddress || 'unknown';
    return this.authService.login(loginDto, ip);
  }
}
