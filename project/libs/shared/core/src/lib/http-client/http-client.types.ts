export type HttpClientPayload = object | string | null;
export type HttpClientConfig = Record<string, string | object>;

export type HttpClientOptions = {
  baseUrl?: string;
  headers?: Record<string, string>;
  params?: Record<string, unknown>;
  timeout?: number;
};

export interface HttpClient {
  get: <T = unknown, U = HttpClientConfig>(
    url: string,
    config?: U
  ) => Promise<T>;

  delete: <T = unknown, U = HttpClientConfig>(
    url: string,
    config?: U
  ) => Promise<T>;

  post: <T = unknown, U = HttpClientConfig>(
    url: string,
    payload: HttpClientPayload,
    config?: U
  ) => Promise<T>;

  patch: <T = unknown, U = HttpClientConfig>(
    url: string,
    payload: HttpClientPayload,
    config?: U
  ) => Promise<T>;

  put: <T = unknown, U = HttpClientConfig>(
    url: string,
    payload: HttpClientPayload,
    config?: U
  ) => Promise<T>;
}
