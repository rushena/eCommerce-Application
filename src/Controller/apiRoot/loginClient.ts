import {
  ClientBuilder,
  type PasswordAuthMiddlewareOptions,
  type HttpMiddlewareOptions,
  TokenCache,
} from '@commercetools/sdk-client-v2';
import {
  createApiBuilderFromCtpClient,
  ApiRoot,
} from '@commercetools/platform-sdk';

import { User } from '../login/loginTypes';

function store(initVal: string): TokenCache {
  let value = initVal;
  return {
    get: () => {
      return { token: value, expirationTime: 173000 };
    },
    set: (val) => {
      value = val.token;
      document.cookie = `accessToken=${val.token}; max-age=172000; path=/;`;
    },
  };
}

// Configure authMiddlewareOptions
const passwordAuthMiddlewareOptions = function (
  user: User
): PasswordAuthMiddlewareOptions {
  return {
    host: 'https://auth.europe-west1.gcp.commercetools.com',
    projectKey: 'new-ecommerce-app',
    credentials: {
      clientId: 'bJGS0EWIvDcXvZHS-SPXr4mH',
      clientSecret: 'KXStmggy5QVIVIMrFry8LsvyymhT1NGo',
      user: user,
    },
    scopes: [
      'manage_my_shopping_lists:new-ecommerce-app view_categories:new-ecommerce-app manage_customer_groups:new-ecommerce-app manage_my_business_units:new-ecommerce-app manage_my_orders:new-ecommerce-app view_published_products:new-ecommerce-app create_anonymous_token:new-ecommerce-app manage_my_profile:new-ecommerce-app manage_my_quotes:new-ecommerce-app manage_my_quote_requests:new-ecommerce-app manage_customers:new-ecommerce-app manage_my_payments:new-ecommerce-app',
    ],
    tokenCache: store(''),
    fetch,
  };
};

// Configure httpMiddlewareOptions
const httpMiddlewareOptions: HttpMiddlewareOptions = {
  host: 'https://api.europe-west1.gcp.commercetools.com',
  fetch,
};

// Export the ClientBuilder
const ctpClient = function (user: User) {
  return new ClientBuilder()
    .withPasswordFlow(passwordAuthMiddlewareOptions(user))
    .withHttpMiddleware(httpMiddlewareOptions)
    .withLoggerMiddleware()
    .build();
};

export const getPasswordApiRoot: (user: User) => ApiRoot = (user: User) => {
  return createApiBuilderFromCtpClient(ctpClient(user));
};
