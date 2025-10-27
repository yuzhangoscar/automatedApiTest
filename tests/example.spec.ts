import { test, expect } from '@playwright/test';

test('JsonplaceholderAPI is healthy', async ({ request }) => {
  const response = await request.get('https://jsonplaceholder.typicode.com/posts/1');
  expect(response.status()).toBe(200);
  const body = await response.json();
  expect(body.title).toBe('sunt aut facere repellat provident occaecati excepturi optio reprehenderit');
});

