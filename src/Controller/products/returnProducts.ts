import { getProducts } from './getProducts';

export async function returnProducts() {
  const response = await getProducts();
  console.log(response);
}
