import qs from 'qs';
import axios from 'axios';
import type {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
} from 'axios';
import type {
  HttpClient,
  HttpClientOptions,
  HttpClientPayload,
} from './http-client.types';

const DEFAULT_TIMEOUT_MS = 10000; // 10 seconds

export class HttpClientImpl implements HttpClient {
  private readonly axiosInstance: AxiosInstance;

  constructor({ baseUrl, params, headers, timeout }: HttpClientOptions) {
    this.axiosInstance = axios.create({
      baseURL: baseUrl ?? '',
      headers: headers ?? {},
      params: params ?? {},
      timeout: timeout ?? DEFAULT_TIMEOUT_MS,
      paramsSerializer: {
        serialize: (params) => qs.stringify(params, { arrayFormat: 'repeat' }),
      },
    });

    this.initializeRequestInterceptor();
    this.initializeResponseInterceptor();
  }

  async get<T = unknown, U = AxiosRequestConfig>(
    url: string,
    config?: U
  ): Promise<T> {
    return this.axiosInstance.get(url, config ?? {});
  }

  async delete<T = unknown, U = AxiosRequestConfig>(
    url: string,
    config?: U
  ): Promise<T> {
    return this.axiosInstance.delete(url, config ?? {});
  }

  async post<T = unknown, U = AxiosRequestConfig>(
    url: string,
    payload: HttpClientPayload,
    config?: U
  ): Promise<T> {
    return this.axiosInstance.post(url, payload, config ?? {});
  }

  async patch<T = unknown, U = AxiosRequestConfig>(
    url: string,
    payload: HttpClientPayload,
    config?: U
  ): Promise<T> {
    return this.axiosInstance.patch(url, payload, config ?? {});
  }

  async put<T = unknown, U = AxiosRequestConfig>(
    url: string,
    payload: HttpClientPayload,
    config?: U
  ): Promise<T> {
    return this.axiosInstance.put(url, payload, config ?? {});
  }

  setToken(token: string) {
    this.axiosInstance.defaults.headers.common['Authorization'] = token;
  }

  updateBaseUrl(baseUrl: string) {
    this.axiosInstance.defaults.baseURL = baseUrl;
  }

  private initializeRequestInterceptor() {
    this.axiosInstance.interceptors.request.use(
      (config) => {
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }

  private initializeResponseInterceptor() {
    this.axiosInstance.interceptors.response.use(
      this.handleResponse,
      this.handleError
    );
  }

  private handleResponse({
    data,
  }: AxiosResponse): Promise<AxiosResponse['data']> {
    return data;
  }

  private handleError = (
    error: AxiosError
  ): Promise<AxiosError['response']> => {
    return Promise.reject(error.response);
  };
}
