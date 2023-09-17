import { getApiRoot } from "../apiRoot/generalClient";

export async function getCart(){
  const response = await getApiRoot()
  .withProjectKey({
    projectKey: 'new-ecommerce-app',
  })
  .me()
  .carts()
  .get()
  .execute()
  return response.body.results[0].lineItems;
}

