import { describe, expect, it } from 'vitest';
import { authentificateCustomer } from '../src/Controller/login/loginClient';

describe('login tests', () => {
  it('right credentials', async () => {
    const response = await authentificateCustomer({
      username: 'test1@gmail.com',
      password: '123',
    });
    expect(response.success).toBe(true);
  });
  it('wrong credentials', async () => {
    const response = await authentificateCustomer({
      username: 'test1@gmail.com',
      password: '1234',
    });
    expect(response.success).toBe(false);
  });
});
