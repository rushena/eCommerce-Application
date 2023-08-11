import { describe, expect, it } from 'vitest';
import { authentication } from '../src/Controller/login/loginClient';

describe('login tests', () => {
  it('right credentials', async () => {
    const response = await authentication({
      username: 'test1@gmail.com',
      password: '123',
    });
    expect(response.succes).toBe(true);
  });
  it('wrong credentials', async () => {
    const response = await authentication({
      username: 'test1@gmail.com',
      password: '1234',
    });
    expect(response.succes).toBe(false);
  });
});
