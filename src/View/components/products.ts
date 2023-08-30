import returnProducts from '../../Controller/products/returnProducts';
import { ProductProjection } from '@commercetools/platform-sdk';
import { getOptions } from '../../Controller/products/products.type';
import '../../assets/css/products.css';

export default class Products {
  private products = document.createElement('div');
  public options: getOptions;
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
  public fillProducts(options?: getOptions) {
    if (options) {
      this.options = options;
    }
    this.products.innerHTML = `Wait fo list to load`;
    const errorMessage = 'Error occurred';
    returnProducts(this.options) // enter your parameters
      .then((productList) => {
        this.total = productList!.total!;
        this.products.innerHTML = ``;
        if (productList === null) {
          console.log('inner catch');
          this.products.innerHTML = errorMessage;
        } else {
          productList.list.forEach((product) => {
            this.addCard(this.products, product);
          });
        }
      })
      .catch(() => {});
  }

  public getElement(options?: getOptions) {
    if (options) {
      this.options = options;
    }
    this.fillProducts(this.options);
    this.products.classList.add('catalog__products');
    this.products.classList.add('products-list');
    return this.products;
  }
}
