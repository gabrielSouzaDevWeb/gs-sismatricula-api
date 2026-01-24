import { Injectable } from '@nestjs/common';

interface AttemptData {
  attempts: number;
  lastAttempt: Date;
  blockedUntil: Date | null;
}

@Injectable()
export class BruteForceService {
  private attempts = new Map<string, AttemptData>();
  private maxAttempts = 5;
  private baseBlockMinutes = 0.1;

  isBlocked(ip: string): boolean {
    const data = this.attempts.get(ip);
    if (!data) return false;
    if (data.blockedUntil && new Date() < data.blockedUntil) {
      return true;
    }
    return false;
  }

  recordAttempt(ip: string): void {
    const now = new Date();
    const data = this.attempts.get(ip) || {
      attempts: 0,
      lastAttempt: now,
      blockedUntil: null,
    };
    data.attempts += 1;
    data.lastAttempt = now;
    if (data.attempts >= this.maxAttempts) {
      const blockMinutes =
        (data.attempts - this.maxAttempts + 1) * this.baseBlockMinutes;
      data.blockedUntil = new Date(now.getTime() + blockMinutes * 60 * 1000);
    }
    this.attempts.set(ip, data);
  }

  getRemainingTime(ip: string): number | null {
    const data = this.attempts.get(ip);
    if (!data || !data.blockedUntil) return null;
    const now = new Date();
    if (now >= data.blockedUntil) return null;
    return Math.ceil((data.blockedUntil.getTime() - now.getTime()) / 1000);
  }

  resetAttempts(ip: string): void {
    this.attempts.delete(ip);
  }
}
