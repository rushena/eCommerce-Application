import { assert, describe, expect, it } from 'vitest';
import { testFunction } from '../src/counter';

describe('suite name', () => {
  // mocha style test looks better in vite
  it('foo', () => {
    // 'foo' - should be meaningfull, here is just an example
    assert.equal(Math.sqrt(4), 2); // you might use either assert or expect
  });

  it('bar', () => {
    expect(1 + 1).eq(2);
  });

  it('snapshot', () => {
    expect({ foo: 'bar' }).toMatchSnapshot();
  });

  it('coverage table test', () => {
    expect(testFunction(2, 2)).eq(4);
  });
});
