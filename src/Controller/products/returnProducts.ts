import { getProducts } from './getProducts';

export default async function () {
  const response = await getProducts();
  if (response.body === null) return null;
  return response.body.results;
}
