import {
  ClientBuilder,
  type AuthMiddlewareOptions,
  type HttpMiddlewareOptions,
} from '@commercetools/sdk-client-v2';
import {
  createApiBuilderFromCtpClient,
  ApiRoot,
} from '@commercetools/platform-sdk';

// Configure authMiddlewareOptions
const authMiddlewareOptions: AuthMiddlewareOptions = {
  host: 'https://auth.europe-west1.gcp.commercetools.com',
  projectKey: 'new-ecommerce-app',
  credentials: {
    clientId: 'bJGS0EWIvDcXvZHS-SPXr4mH',
    clientSecret: 'KXStmggy5QVIVIMrFry8LsvyymhT1NGo',
  },
  scopes: [
    'manage_my_shopping_lists:new-ecommerce-app view_categories:new-ecommerce-app manage_customer_groups:new-ecommerce-app manage_my_business_units:new-ecommerce-app manage_my_orders:new-ecommerce-app view_published_products:new-ecommerce-app create_anonymous_token:new-ecommerce-app manage_my_profile:new-ecommerce-app manage_my_quotes:new-ecommerce-app manage_my_quote_requests:new-ecommerce-app manage_customers:new-ecommerce-app manage_my_payments:new-ecommerce-app',
  ],
  fetch,
};

// Configure httpMiddlewareOptions
const httpMiddlewareOptions: HttpMiddlewareOptions = {
  host: 'https://api.europe-west1.gcp.commercetools.com',
  fetch,
};

// Export the ClientBuilder
const ctpClient = new ClientBuilder()
  .withClientCredentialsFlow(authMiddlewareOptions)
  .withHttpMiddleware(httpMiddlewareOptions)
  .withLoggerMiddleware()
  .build();

export const getApiRoot: () => ApiRoot = () => {
  return createApiBuilderFromCtpClient(ctpClient);
};
