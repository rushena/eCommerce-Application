import returnProducts from '../../Controller/products/returnProducts';
import { ProductProjection } from '@commercetools/platform-sdk';

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
      imageElement.onload = () => card.append(imageElement);
    }
    card.innerHTML = `
    <div class='products-list__card__description'>
      ${product.name['en-US'] ? product.name['en-US'] : product.name['en']}
    </div>
    <div class='products-list__card__price'>
      ${product.masterVariant.prices![0].value.centAmount}
    </div>
    `;
    target.append(card);
  }

  public fillProducts() {
    this.products.innerHTML = `Wait fo list to load`;
    const errorMessage = 'Error occurred';
    returnProducts()
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
