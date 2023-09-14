import { Cart, LineItem } from '@commercetools/platform-sdk';
import { getCart } from '../../Controller/basket/basket';
import '../../assets/css/basket.css';
import { deleteFromBasket } from '../../Controller/basket/deleteFromBasket';
import { changeQuantity } from '../../Controller/basket/changeQuantity';
import { clearBasket } from '../../Controller/basket/clearBasket';
import { addPromoCode } from '../../Controller/basket/addPromoCode';
import Header from '../components/header';

interface BasketTemplate {
  getElement: () => HTMLElement;
}

export class Basket implements BasketTemplate {
  private cart: Cart | null;
  private basketElement = document.createElement('main');
  private activePromos: string[] = [];

  constructor() {
    this.cart = null;
    this.basketElement.classList.add('main');
  }

  private getPrice(item: LineItem) {
    if (item.variant.prices![0].discounted) {
      return `
      <span class='red'>$${
        item.variant.prices![0].discounted!.value.centAmount / 100
      }
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

  private renderOrderItem(item: LineItem): HTMLElement {
    const itemElement = document.createElement('div') as HTMLElement;
    itemElement.classList.add('cart-container__orders__item');
    itemElement.classList.add('item-card');
    itemElement.innerHTML = `
      <div class='item-card__description'>
        ${item.name['en-US']}
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
        <span>Delete</span>
      </div>
    `;
    let imageElement: HTMLImageElement;
    if (item.variant.images !== undefined && item.variant.images.length !== 0) {
      imageElement = document.createElement('img');
      imageElement.src = item.variant.images[0].url;
      imageElement.onload = () => itemElement.prepend(imageElement);
    }
    itemElement
      .querySelector('.item-card__delete')
      ?.addEventListener('click', async () => {
        await deleteFromBasket(item);
        this.renderElement();
        Header.getInstance().cartElement =
          Header.getNumberOfCurrent() - item.quantity >= 0
            ? Header.getNumberOfCurrent() - item.quantity
            : 0;
      });
    const quantityInput = itemElement.querySelector(
      '.item-card__quantity-input'
    ) as HTMLInputElement;
    quantityInput.addEventListener('change', async (event) => {
      await changeQuantity(item, event);
      this.renderElement();
    });
    return itemElement;
  }

  private renderOrder(items: LineItem[], cartContainer: HTMLElement) {
    const ordersElement = document.createElement('div');
    ordersElement.classList.add('cart-container__orders');
    ordersElement.innerHTML = `
      <div class='cart-container__orders__toppanel'>
        <h2>Cart</h2>
        <div class='cart-container__orders__toppanel__clear-all'>Clear all</div>
        <a href='/catalog'>
          Back to shopping
        </a>
      </div>
    `;
    const ordersItemsElement = document.createElement('div');
    ordersItemsElement.classList.add('cart-container__orders__items');
    for (const item of items) {
      ordersItemsElement.append(this.renderOrderItem(item));
    }
    const subtotalElement = document.createElement('div');
    subtotalElement.classList.add('cart-container__orders__subtotal');
    subtotalElement.textContent = `Subtotal: $${this.cart!.lineItems.reduce(
      (accumulator, current) => {
        const newValue =
          accumulator +
          (current.price.discounted
            ? (current.price.discounted!.value.centAmount / 100) *
              current.quantity
            : (current.price.value.centAmount / 100) * current.quantity);
        return newValue;
      },
      0
    ).toFixed(2)}`;
    ordersItemsElement.append(subtotalElement);
    if (items.length === 0)
      ordersItemsElement.innerHTML = `There is no items in your cart ;( <a href='/catalog'>
      Back to shopping
    </a>`;

    ordersElement
      .querySelector('.cart-container__orders__toppanel__clear-all')
      ?.addEventListener('click', async () => {
        if (
          confirm('Are you sure want to clear all items from the cart?') == true
        ) {
          await clearBasket();
          this.renderElement();
          Header.getInstance().cartElement = 0;
          this.activePromos = [];
        }
      });
    ordersElement.append(ordersItemsElement);
    cartContainer.append(ordersElement);
  }

  private renderSidebar(): HTMLElement {
    const sidebarElement = document.createElement('div');
    sidebarElement.classList.add('cart-container__sidebar');
    if (this.cart === null) return sidebarElement;
    const summPrice = this.cart.lineItems.reduce((accumulator, current) => {
      const newValue =
        accumulator +
        (current.price.discounted
          ? (current.price.discounted!.value.centAmount / 100) *
            current.quantity
          : (current.price.value.centAmount / 100) * current.quantity);
      return newValue;
    }, 0);
    let discount;
    if (this.cart.discountCodes.length > 0) {
      discount = summPrice - this.cart.totalPrice.centAmount / 100;
      discount = discount.toFixed(2);
    }
    const promoCodes = this.activePromos.reduce((accumulator, value) => {
      return (
        accumulator +
        `<li>
      ${value}
      </li>`
      );
    }, '');
    sidebarElement.innerHTML = `
    <div class='cart-container__sidebar__promocode'>
      <div> Apply a promo code
      </div>
      <div class='cart-container__sidebar__promocode__input'>
        <input type='text' placeholder='Enter promo code'>
        <div> Apply
        </div>
      </div>
      <ul class='cart-container__sidebar__promocode__active-codes'>
      ${promoCodes}
      </ul>
    </div>
    <div class='cart-container__sidebar__order-summary'>
     <h3>
      Order totals
     </h3>
     <div class='order-details'>
     <div>
      <span>Subtotal:</span>
      <span>$${this.cart.lineItems
        .reduce((accumulator, current) => {
          const newValue =
            accumulator +
            (current.price.discounted
              ? (current.price.discounted!.value.centAmount / 100) *
                current.quantity
              : (current.price.value.centAmount / 100) * current.quantity);
          return newValue;
        }, 0)
        .toFixed(2)}</span>
      </div>
      <div>
      <span>Discount:</span>
      <span>${discount ? `$${discount}` : '—'}</span>
      </div>
     </div>
     <h4>
       <span>Order total:</span>
       <span>$${this.cart.totalPrice.centAmount / 100}</span>
      </h4>
    </div>
    </div>
    `;

    sidebarElement
      .querySelector('.cart-container__sidebar__promocode__input div')
      ?.addEventListener('click', async () => {
        const inputElement = sidebarElement.querySelector(
          '.cart-container__sidebar__promocode__input input'
        ) as HTMLInputElement;
        const response = await addPromoCode(inputElement.value);
        if (response !== null) {
          this.activePromos.push(inputElement.value);
        }
        this.renderElement();
      });
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
