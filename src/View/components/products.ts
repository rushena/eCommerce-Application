import returnProducts from '../../Controller/products/returnProducts';
import { Cart, ProductProjection } from '@commercetools/platform-sdk';
import { getOptions } from '../../Controller/products/products.type';
import { getCategories } from '../../Controller/products/getCategorie';
import { cartSVG } from '../../assets/img/cart';
import '../../assets/css/products.css';
import { Category, CurrentCategory } from '../../types/product.type';
import getProductPage from '../Pages/productPage';
import { getCart } from '../../Controller/basket/basket';
import { addToBasket } from '../../Controller/basket/addToBasket';
import Header from './header';

export default class Products {
  private productsElement = document.createElement('div');
  public options: getOptions;
  public categories: Category[] = [];
  public currentCategories: CurrentCategory[] = [];
  public perPage = 15;
  public total = 0;

  private drawPrices(product: ProductProjection): string {
    if (product.masterVariant.prices![0].discounted) {
      return `
      <span>$${
        product.masterVariant.prices![0].discounted!.value.centAmount / 100
      }
      </span>
      <span class='old'>
      $${product.masterVariant.prices![0].value.centAmount / 100}
      </span>
      `;
    } else {
      return `
      <span>$${product.masterVariant.prices![0].value.centAmount / 100}
      </span>
      `;
    }
  }

  private async addCard(
    target: HTMLElement,
    product: ProductProjection,
    cart: Cart | null
  ) {
    const card = document.createElement('div');
    card.classList.add('products-list__card');
    let imageElement: HTMLImageElement;
    if (
      product.masterVariant.images !== undefined &&
      product.masterVariant.images.length !== 0
    ) {
      const imageContainer = document.createElement('div');
      imageContainer.classList.add('products-list__card__img-container');
      imageElement = document.createElement('img');
      imageElement.src = product.masterVariant.images[0].url;
      imageElement.onload = () => {
        imageContainer.append(imageElement);
        card.prepend(imageContainer);
      };
    }
    const isAlreadyInCart = cart?.lineItems.find((item) => {
      return item.productId === product.id;
    });
    card.innerHTML = `
    <div class='products-list__card__description'>
      ${product.name['en-US'] ? product.name['en-US'] : product.name['en']}
    </div>
    <div class='products-list__card__price'>
      ${this.drawPrices(product)}
    </div>
    <button class='products-list__card__add-to-cart ${
      isAlreadyInCart ? 'non-active' : ''
    }'>
      <a class='products-list__card__cartSVG'>
        ${cartSVG()}
      </a>
      <span>Add to cart</span>
    </button>
    `;
    card.querySelector('.products-list__card__add-to-cart')?.addEventListener(
      'click',
      async (event) => {
        const target = event.target as HTMLElement;
        const buttonElement = target.closest(
          '.products-list__card__add-to-cart'
        ) as HTMLElement;
        event.stopImmediatePropagation();
        if (buttonElement.classList.contains('non-active')) return;
        buttonElement.classList.add('non-active');
        const response = await addToBasket(product.id);
        if (response !== null)
          Header.getInstance().cartElement = Header.getNumberOfCurrent() + 1;
      },
      { once: true }
    );
    card.addEventListener('click', async (event) => {
      const target = event.target as HTMLElement;
      if (
        target
          .closest('.products-list__card__add-to-cart')
          ?.classList.contains('products-list__card__add-to-cart')
      ) {
        return;
      }
      const productPageElement = await getProductPage(product.id);
      history.pushState({}, '', `?detailed-product=${product.id}`);
      document.querySelector('body > div')!.innerHTML = '';
      document.querySelector('body > div')!.append(productPageElement);
    });
    target.append(card);
  }
  public async fillProducts(options?: getOptions) {
    if (options) {
      this.options = options;
    }
    this.productsElement.innerHTML = `Wait for the list to load`;
    const errorMessage = 'Error occurred';
    try {
      const productList = await returnProducts(this.options);
      const categorie = await getCategories();
      const cart = await getCart();
      this.total = productList!.total!;
      if (productList?.list.length === 0) {
        this.productsElement.innerHTML = 'No items found ;(';
        return;
      }
      this.productsElement.innerHTML = ``;
      if (productList === null || categorie === null) {
        this.productsElement.innerHTML = errorMessage;
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
          this.addCard(this.productsElement, product, cart);
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
    this.productsElement.classList.add('catalog__products');
    this.productsElement.classList.add('products-list');
    return this.productsElement;
  }
}
