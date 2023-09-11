import { Cart, LineItem } from '@commercetools/platform-sdk';
import { getCart } from '../../Controller/basket/basket';

interface BasketTemplate {
  getElement: () => HTMLElement;
}

export class Basket implements BasketTemplate {
  private cart: Cart | null;
  private basketElement = document.createElement('main');

  constructor() {
    this.cart = null;
    this.basketElement.classList.add('main');
  }

  private getPrice(item: LineItem) {
    if (item.variant.prices![0].discounted) {
      return `
      <span>$${item.variant.prices![0].discounted!.value.centAmount / 100}
      </span>
      <span class='old'>
      $${item.variant.prices![0].value.centAmount / 100}
      </span>
      `;
    } else {
      return `
      <span>$${item.variant.prices![0].value.centAmount / 100}
      </span>
      `;
    }
  }

  private renderOrderItem(item: LineItem): string {
    return `
    <div class='cart-container__orders__item item-card'>
      <div class='item-card__image'>
        ${item.variant.images![0]}
      </div>
      <div class='item-card__description'>
        ${item.name}
      </div>
      <div class='item-card__quantity'>
        <input type='number' value='${
          item.quantity
        }' class='item-card__quantity-input'>
      </div>
      <div class='item-card__price'>
        ${this.getPrice(item)}
      </div>
      <div class='item-card__delete'>
        Delete
      </div>
    </div>
    `;
  }

  private renderOrder(items: LineItem[], cartContainer: HTMLElement) {
    const ordersElement = document.createElement('div');
    ordersElement.classList.add('cart-container__orders');
    ordersElement.innerHTML = `
      <div class='cart-container__orders__toppanel'>
      <h2>Cart</h2>
      <a href='/catalog'>
        Back to shopping
      </a>
      </div>
    `;
    const ordersItemsElement = document.createElement('div');
    for (const item of items) {
      ordersItemsElement.append(this.renderOrderItem(item));
    }
    ordersElement.append(ordersItemsElement);
    cartContainer.append(ordersElement);
  }

  private renderSidebar(): HTMLElement {
    const sidebarElement = document.createElement('div');
    sidebarElement.classList.add('cart-container__sidebar');
    if (this.cart === null) return sidebarElement;
    let discount;
    if (this.cart.directDiscounts[0]) {
      discount = this.cart.directDiscounts[0].value;
    }
    sidebarElement.innerHTML = `
    <div class='cart-container__sidebar__promocode'>
      <div> Apply a promo code
      </div>
      <div class='cart-container__sidebar__promocode__input'>
      <input type='text' placeholder='Enter promo code'>
      <div> Apply
      </div>
      </div>
    </div>
    <div class='cart-container__sidebar__order-summary'>
     <div>
      Order totals
     </div>
     <div>
      <span>Subtotal: ${this.cart.lineItems.reduce((accumulator, current) => {
        const newValue = accumulator + current.price.value.centAmount / 100;
        return newValue;
      }, 0)}</span>
      <span>Discount: ${discount ?? '-'}</span>
     </div>
    </div>
    <div>
      Order total: ${this.cart.totalPrice}
     </div>
    </div>
    `;
    return sidebarElement;
  }

  private async renderElement() {
    this.cart = await getCart();
    if (this.cart === null) return;
    const cartContainer = document.createElement('div');
    cartContainer.classList.add('cart-container');
    this.renderOrder(this.cart.lineItems, cartContainer);
    cartContainer.append(this.renderSidebar());
    this.basketElement.innerHTML = '';
    this.basketElement.append(cartContainer);
  }

  public getElement(): HTMLElement {
    this.renderElement();
    return this.basketElement;
  }
}
