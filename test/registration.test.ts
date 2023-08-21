import { describe, expect, it } from 'vitest';
import { registerNewCustomer } from '../src/Controller/registration/registerationClient';

describe('registration tests', () => {
  it('existiong client', async () => {
    const response = await registerNewCustomer({
      // it returns some stuff but dont need it yet
      email: 'test1@gmail.com',
      password: '123',
      firstName: 'John',
      lastName: 'Doe', // for test just these inputs
    });
    expect(response.success).toBe(false);
  });
});
