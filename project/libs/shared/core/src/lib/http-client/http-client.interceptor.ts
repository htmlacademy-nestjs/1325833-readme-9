import {
  CallHandler,
  ExecutionContext,
  Inject,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { HTTP_CLIENT } from './http-client.constants';
import { HttpClientImpl } from './http-client';
import { Observable } from 'rxjs';

@Injectable()
export class HttpClientInterceptor implements NestInterceptor {
  constructor(
    @Inject(HTTP_CLIENT) private readonly httpClient: HttpClientImpl
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization;

    if (token) {
      this.httpClient.setToken(token);
    }

    return next.handle();
  }
}
