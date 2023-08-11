import { describe, expect, it } from 'vitest';
import { registration } from '../src/Controller/registration/registerationClient';

describe('registration tests', () => {
  it('existiong client', async () => {
    const response = await registration({
      // it returns some stuff but dont need it yet
      email: 'test1@gmail.com',
      password: '123',
      firstName: 'John',
      lastName: 'Doe', // for test just these inputs
    });
    expect(response.succes).toBe(false);
  });
});
