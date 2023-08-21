import {
  ClientBuilder,
  type AuthMiddlewareOptions,
  type HttpMiddlewareOptions,
  Client,
} from '@commercetools/sdk-client-v2';
import {
  createApiBuilderFromCtpClient,
  ApiRoot,
} from '@commercetools/platform-sdk';

const authMiddlewareOptions: AuthMiddlewareOptions = {
  host: 'https://auth.europe-west1.gcp.commercetools.com',
  projectKey: 'new-ecommerce-app',
  credentials: {
    clientId: import.meta.env.VITE_CLIENT_ID || '',
    clientSecret: import.meta.env.VITE_CLIENT_SECRET || '',
  },
  scopes: [
    'manage_my_shopping_lists:new-ecommerce-app view_categories:new-ecommerce-app manage_customer_groups:new-ecommerce-app manage_my_business_units:new-ecommerce-app manage_my_orders:new-ecommerce-app view_published_products:new-ecommerce-app create_anonymous_token:new-ecommerce-app manage_my_profile:new-ecommerce-app manage_my_quotes:new-ecommerce-app manage_my_quote_requests:new-ecommerce-app manage_customers:new-ecommerce-app manage_my_payments:new-ecommerce-app',
  ],
  fetch,
};
const httpMiddlewareOptions: HttpMiddlewareOptions = {
  host: 'https://api.europe-west1.gcp.commercetools.com',
  fetch,
};

export const getApiRoot: () => ApiRoot = () => {
  let accesscookieValue;
  if (typeof window !== 'undefined') {
    accesscookieValue = document.cookie
      .split('; ')
      .find((row) => row.startsWith('accessToken='))
      ?.split('=')[1];
  }
  let ctpClient: Client;
  // if user was logged in previously - has refresh token in cookie, we create client with this token
  // else create unnamed client(might need to use AnonymousSession, once we get to shopping cart)
  if (accesscookieValue) {
    ctpClient = new ClientBuilder()
      .withExistingTokenFlow(`Bearer ${accesscookieValue}`, { force: true })
      .withHttpMiddleware(httpMiddlewareOptions)
      .withLoggerMiddleware()
      .build();
  } else {
    ctpClient = new ClientBuilder()
      .withClientCredentialsFlow(authMiddlewareOptions)
      .withHttpMiddleware(httpMiddlewareOptions)
      .withLoggerMiddleware()
      .build();
  }
  return createApiBuilderFromCtpClient(ctpClient);
};
