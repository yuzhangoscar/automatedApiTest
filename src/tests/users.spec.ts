import { test, expect } from '@playwright/test';
import { UserClient } from '../api/clients/UserClient';

const BASE_URL = 'https://jsonplaceholder.typicode.com';

test.describe('User API Tests', () => {

  test('Get a single user by ID', async ({ request }) => {
    const userClient = new UserClient(BASE_URL, request);

    const response = await userClient.getUser(1);

    expect(response.status()).toBe(200);
    const user = await response.json();
    expect(user.id).toBe(1);
    expect(user.name).toBeDefined();
    expect(user.email).toBeDefined();
  });

  test('Get all users', async ({ request }) => {
    const userClient = new UserClient(BASE_URL, request);

    const response = await userClient.getAllUsers();

    expect(response.status()).toBe(200);
    const users = await response.json();
    expect(Array.isArray(users)).toBeTruthy();
    expect(users.length).toBeGreaterThan(0);
  });

  test('Create a new user', async ({ request }) => {
    const userClient = new UserClient(BASE_URL, request);

    const newUser = {
      name: 'Test User',
      email: 'test@example.com',
      username: 'testuser'
    };

    const response = await userClient.createUser(newUser);

    expect(response.status()).toBe(201);
    const createdUser = await response.json();
    expect(createdUser.name).toBe(newUser.name);
    expect(createdUser.email).toBe(newUser.email);
    expect(createdUser.id).toBeDefined();
  });

  test('Update a user', async ({ request }) => {
    const userClient = new UserClient(BASE_URL, request);

    const updatedData = {
      name: 'Updated User Name',
      email: 'updated@example.com',
      username: 'updateduser'
    };

    const response = await userClient.updateUser(1, updatedData);

    expect(response.status()).toBe(200);
    const user = await response.json();
    expect(user.name).toBe(updatedData.name);
    expect(user.email).toBe(updatedData.email);
  });

  test('Partially update a user (PATCH)', async ({ request }) => {
    const userClient = new UserClient(BASE_URL, request);

    const patchData = {
      email: 'newemail@example.com'
    };

    const response = await userClient.patchUser(1, patchData);

    expect(response.status()).toBe(200);
    const user = await response.json();
    expect(user.email).toBe(patchData.email);
  });

  test('Delete a user', async ({ request }) => {
    const userClient = new UserClient(BASE_URL, request);

    const response = await userClient.deleteUser(1);

    expect(response.status()).toBe(200);
  });

  test('Get user posts', async ({ request }) => {
    const userClient = new UserClient(BASE_URL, request);

    const response = await userClient.getUserPosts(1);

    expect(response.status()).toBe(200);
    const posts = await response.json();
    expect(Array.isArray(posts)).toBeTruthy();
    expect(posts.length).toBeGreaterThan(0);
    expect(posts[0].userId).toBe(1);
  });

  test('Get user todos', async ({ request }) => {
    const userClient = new UserClient(BASE_URL, request);

    const response = await userClient.getUserTodos(1);

    expect(response.status()).toBe(200);
    const todos = await response.json();
    expect(Array.isArray(todos)).toBeTruthy();
    expect(todos.length).toBeGreaterThan(0);
  });

  test('User not found returns 404', async ({ request }) => {
    const userClient = new UserClient(BASE_URL, request);

    const response = await userClient.getUser(9999);

    expect(response.status()).toBe(404);
  });

  test.describe('User validation', () => {
    test('User has required fields', async ({ request }) => {
      const userClient = new UserClient(BASE_URL, request);

      const response = await userClient.getUser(1);
      const user = await response.json();

      // Check required fields
      expect(user).toHaveProperty('id');
      expect(user).toHaveProperty('name');
      expect(user).toHaveProperty('email');
      expect(user).toHaveProperty('username');

      // Check field types
      expect(typeof user.id).toBe('number');
      expect(typeof user.name).toBe('string');
      expect(typeof user.email).toBe('string');
    });
  });
});
