import { describe, expect, it } from 'vitest';
import { authentificateCustomer } from '../src/Controller/login/loginClient';

describe('login tests', () => {
  it('right credentials', async () => {
    const response = await authentificateCustomer({
      username: 'test321@gmail.com',
      password: 'QwertY321',
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
