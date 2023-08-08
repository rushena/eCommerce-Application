import { describe, expect, it } from 'vitest';
import { registration } from '../src/Controller/registration/registerClient';

describe('registration test', () => {
  it('output', () => {
    expect(
      registration({
        email: 'test4@gmail.com',
        password: '123456',
        firstName: 'John',
        lastName: 'Doe',
      })
    ).toBe({ succes: true });
  });
});
