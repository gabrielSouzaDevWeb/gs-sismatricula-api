// src/shared/filters/http-exception.filter.ts
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { QueryFailedError } from 'typeorm';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(GlobalExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Erro interno do servidor';
    let details: any = undefined;

    // Exceções HTTP do NestJS (BadRequestException, NotFoundException, etc)
    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const exceptionResponse = exception.getResponse();
      message =
        typeof exceptionResponse === 'string'
          ? exceptionResponse
          : (exceptionResponse as any).message || message;
      details =
        typeof exceptionResponse === 'object' ? exceptionResponse : undefined;
    }
    // Erros de banco de dados (TypeORM)
    else if (exception instanceof QueryFailedError) {
      status = HttpStatus.BAD_REQUEST;
      message = 'Erro ao processar operação no banco de dados';

      // Log completo do erro para debug (não expõe ao cliente)
      this.logger.error(
        `Database error: ${(exception as any).message}`,
        (exception as any).stack,
      );

      // Tratar erros específicos de banco
      const dbError = exception as any;
      if (dbError.code === '23505') {
        // Unique violation (PostgreSQL)
        message = 'Registro duplicado';
        details = { constraint: dbError.constraint };
      } else if (dbError.code === '23503') {
        // Foreign key violation
        message = 'Operação viola restrição de integridade';
      } else if (dbError.code === '23502') {
        // Not null violation
        message = 'Campo obrigatório não informado';
      }
    }
    // Qualquer outro erro não tratado
    else {
      this.logger.error(
        `Unhandled exception: ${(exception as any)?.message}`,
        (exception as any)?.stack,
      );
      message = 'Erro inesperado no servidor';
    }

    // Resposta padronizada
    response.status(status).json({
      statusCode: status,
      message,
      ...details,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
