import { Provider, Scope } from '@nestjs/common';
import { HttpClientImpl } from './http-client';
import { HTTP_CLIENT } from './http-client.constants';

export const HttpClientProvider: Provider = {
  provide: HTTP_CLIENT,
  scope: Scope.REQUEST,
  useFactory: () => new HttpClientImpl({}),
};
