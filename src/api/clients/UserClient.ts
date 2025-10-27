import { APIRequestContext, APIResponse } from '@playwright/test';
import { BaseClient } from './BaseClient';

export interface User {
  id?: number;
  name: string;
  email: string;
  username?: string;
  phone?: string;
  website?: string;
}

export class UserClient extends BaseClient {
  constructor(baseURL: string, request: APIRequestContext) {
    super(baseURL, request);
  }

  /**
   * Get a user by ID
   * GET /users/{id}
   */
  async getUser(id: number): Promise<APIResponse> {
    return this.get(`/users/${id}`);
  }

  /**
   * Get all users
   * GET /users
   */
  async getAllUsers(): Promise<APIResponse> {
    return this.get('/users');
  }

  /**
   * Create a new user
   * POST /users
   */
  async createUser(userData: User): Promise<APIResponse> {
    return this.post('/users', userData);
  }

  /**
   * Update a user (full update)
   * PUT /users/{id}
   */
  async updateUser(id: number, userData: User): Promise<APIResponse> {
    return this.put(`/users/${id}`, userData);
  }

  /**
   * Partially update a user
   * PATCH /users/{id}
   */
  async patchUser(id: number, userData: Partial<User>): Promise<APIResponse> {
    return this.patch(`/users/${id}`, userData);
  }

  /**
   * Delete a user
   * DELETE /users/{id}
   */
  async deleteUser(id: number): Promise<APIResponse> {
    return this.delete(`/users/${id}`);
  }

  /**
   * Get user posts
   * GET /users/{id}/posts
   */
  async getUserPosts(id: number): Promise<APIResponse> {
    return this.get(`/users/${id}/posts`);
  }

  /**
   * Get user comments
   * GET /users/{id}/comments
   */
  async getUserComments(id: number): Promise<APIResponse> {
    return this.get(`/users/${id}/comments`);
  }

  /**
   * Get user todos
   * GET /users/{id}/todos
   */
  async getUserTodos(id: number): Promise<APIResponse> {
    return this.get(`/users/${id}/todos`);
  }

  /**
   * Get user albums
   * GET /users/{id}/albums
   */
  async getUserAlbums(id: number): Promise<APIResponse> {
    return this.get(`/users/${id}/albums`);
  }
}
