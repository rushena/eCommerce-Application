import returnProducts from '../../Controller/products/returnProducts';
import { ProductProjection } from '@commercetools/platform-sdk';
import { getOptions } from '../../Controller/products/products.type';
import '../../assets/css/products.css';

export default class Products {
  private products = document.createElement('div');

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
    this.products.innerHTML = `Wait fo list to load`;
    const errorMessage = 'Error occurred';
    returnProducts(options) // enter your parameters
      .then((productList) => {
        this.products.innerHTML = ``;
        console.log(productList);
        if (productList === null) {
          console.log('inner catch');
          this.products.innerHTML = errorMessage;
        } else {
          productList.forEach((product) => {
            this.addCard(this.products, product);
          });
        }
      })
      .catch(() => {});
  }

  public getElement() {
    this.fillProducts();
    this.products.classList.add('catalog__products');
    this.products.classList.add('products-list');
    return this.products;
  }
}
