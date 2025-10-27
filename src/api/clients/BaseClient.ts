import { APIRequestContext } from '@playwright/test';

export class BaseClient {
  protected baseURL: string;
  protected request: APIRequestContext;

  constructor(baseURL: string, request: APIRequestContext) {
    this.baseURL = baseURL;
    this.request = request;
  }

  protected async get(endpoint: string, options?: any) {
    const response = await this.request.get(`${this.baseURL}${endpoint}`, options);
    return response;
  }

  protected async post(endpoint: string, data?: any, options?: any) {
    const response = await this.request.post(`${this.baseURL}${endpoint}`, {
      data,
      ...options
    });
    return response;
  }

  protected async put(endpoint: string, data?: any, options?: any) {
    const response = await this.request.put(`${this.baseURL}${endpoint}`, {
      data,
      ...options
    });
    return response;
  }

  protected async patch(endpoint: string, data?: any, options?: any) {
    const response = await this.request.patch(`${this.baseURL}${endpoint}`, {
      data,
      ...options
    });
    return response;
  }

  protected async delete(endpoint: string, options?: any) {
    const response = await this.request.delete(`${this.baseURL}${endpoint}`, options);
    return response;
  }
}
