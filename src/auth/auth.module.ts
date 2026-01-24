import { Module } from '@nestjs/common';
import { BruteForceService } from '../shared/services/brute-force.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService, BruteForceService],
})
export class AuthModule {}
