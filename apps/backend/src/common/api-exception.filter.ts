import { Catch, HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import type { ArgumentsHost, ExceptionFilter } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

export interface ApiErrorResponse {
  statusCode: number;
  error: string;
  message: string[];
  path: string;
}

@Injectable()
@Catch()
export class ApiExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(ApiExceptionFilter.name);

  constructor(private readonly adapterHost: HttpAdapterHost) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    const context = host.switchToHttp();
    const request = context.getRequest<{ url: string }>();
    const response = context.getResponse<unknown>();
    const statusCode = exception instanceof HttpException
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;

    let message = ['Internal server error'];
    if (exception instanceof HttpException && statusCode < 500) {
      message = this.getMessages(exception);
    } else if (exception instanceof HttpException && statusCode === HttpStatus.SERVICE_UNAVAILABLE) {
      message = this.getMessages(exception);
    } else if (!(exception instanceof HttpException)) {
      this.logger.error(exception instanceof Error ? exception.stack : 'Unknown server error');
    }

    const body: ApiErrorResponse = {
      statusCode,
      error: HttpStatus[statusCode] ?? 'HTTP_ERROR',
      message,
      path: request.url.split('?')[0] ?? '/',
    };
    this.adapterHost.httpAdapter.reply(response, body, statusCode);
  }

  private getMessages(exception: HttpException): string[] {
    const response = exception.getResponse();
    if (typeof response === 'string') {
      return [response];
    }

    if ('message' in response) {
      const message: unknown = response.message;
      if (typeof message === 'string') {
        return [message];
      }
      if (Array.isArray(message) && message.every((item: unknown) => typeof item === 'string')) {
        return message as string[];
      }
    }

    return [exception.message];
  }
}
