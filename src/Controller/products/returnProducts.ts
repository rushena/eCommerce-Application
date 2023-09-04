import { getProducts } from './getProducts';
import { getOptions } from './products.type.ts';

export default async function (options?: getOptions) {
  const response = await getProducts(options);
  if (response.body === null) return null;
  return { list: response.body.results, total: response.body.total };
}
