import { TokenCache } from '@commercetools/sdk-client-v2';

export function store(initVal: string): TokenCache {
  let value = initVal;
  return {
    get: () => {
      return { token: value, expirationTime: 173000 };
    },
    set: (val) => {
      value = val.token;
      if (typeof window !== 'undefined') {
        document.cookie = `accessToken=${val.token}; max-age=7200; path=/;`;
      }
    },
  };
}
