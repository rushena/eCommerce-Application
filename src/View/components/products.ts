import returnProducts from '../../Controller/products/returnProducts';
import { ProductProjection } from '@commercetools/platform-sdk';
import { getOptions } from '../../Controller/products/products.type';
import { getCategories } from '../../Controller/products/getCategorie';
import '../../assets/css/products.css';

interface Category {
  id: string;
  name?: string;
  parent: null | Category;
}
export default class Products {
  private products = document.createElement('div');
  public options: getOptions;
  public categories: Category[] = [];
  public currentCategories: string[] = [];
  public perPage = 15;
  public total = 0;

  private async addCard(target: HTMLElement, product: ProductProjection) {
    const card = document.createElement('div');
    card.classList.add('products-list__card');
    let imageElement: HTMLImageElement;
    if (
      product.masterVariant.images !== undefined &&
      product.masterVariant.images.length !== 0
    ) {
      imageElement = document.createElement('img');
      imageElement.src = product.masterVariant.images[0].url;
      imageElement.onload = () => card.prepend(imageElement);
    }
    card.innerHTML = `
    <div class='products-list__card__description'>
      ${product.name['en-US'] ? product.name['en-US'] : product.name['en']}
    </div>
    <div class='products-list__card__price'>
      <span>$${product.masterVariant.prices![0].value.centAmount}</span>
      <span class='old'>
      $${product.masterVariant.prices![0].value.centAmount}
      </span>
    </div>
    `;
    target.append(card);
  }
  public async fillProducts(options?: getOptions) {
    if (options) {
      this.options = options;
    }
    this.products.innerHTML = `Wait for the list to load`;
    const errorMessage = 'Error occurred';
    try {
      const productList = await returnProducts(this.options);
      const categorie = await getCategories();
      this.total = productList!.total!;
      this.products.innerHTML = ``;
      if (productList === null || categorie === null) {
        this.products.innerHTML = errorMessage;
      } else {
        this.categories = categorie.body.results.map((value) => {
          if (value.parent)
            return {
              id: value.id,
              name: value.name['en-US'],
              parent: { id: value.parent.id, parent: null },
            };
          return { id: value.id, name: value.name['en-US'], parent: null };
        });
        productList.list.forEach((product) => {
          this.addCard(this.products, product);
        });
      }
    } catch (error) {
      console.error(error);
    }
  }

  public async getElement(options?: getOptions) {
    if (options) {
      this.options = options;
    }
    await this.fillProducts(this.options);
    this.products.classList.add('catalog__products');
    this.products.classList.add('products-list');
    return this.products;
  }
}
