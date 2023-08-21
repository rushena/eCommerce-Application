import { describe, expect, it } from 'vitest';
import { registerNewCustomer } from '../src/Controller/registration/registerationClient';

describe('registration tests', () => {
  it('existiong client', async () => {
    const response = await registerNewCustomer({
      email: 'test1@gmail.com',
      password: '123',
      firstName: 'John',
      lastName: 'Doe',
      dateOfBirth: `1955-10-21`,
      addresses: [{ country: 'PL' }, { country: 'PL' }],
      defaultBillingAddress: 0,
      defaultShippingAddress: 1,
    });
    expect(response.success).toBe(false);
  });
});
