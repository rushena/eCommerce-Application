import './../../assets/css/header.css';
import { cartSVG } from '../../assets/img/cart';
import { logInSVG } from '../../assets/img/login';
// import { logOutSVG } from '../../assets/img/logout';
import { menuHandler } from '../../Controller/header/header';

class Header {
  private static instance: Header;
  private isLogged = false;
  private currentCartItems = 0;
  public element: HTMLElement;
  constructor(options = { isLogged: false, cartItems: 0 }) {
    this.isLogged = options.isLogged;
    this.currentCartItems = options.cartItems;
    const header = document.createElement('header');
    header.classList.add('header');
    header.innerHTML = `
    <div class='header-container'>
      <a class='header__logo' href='/'>
      CozyHome
      </a>
      <nav class='header__navigation'>
        <ul class='navigation__list'>
          <li class='navigation__list__item'><a href="/catalog">Catalog</a></li>
          <li class='navigation__list__item'><a href="/about">About us</a></li>
          <li class='navigation__list__item'><a href="/contacts">Contacts</a></li>
        </ul>
      </nav>
      <div class='header__optional'>
        <div class='header__optional__account'>
          ${this.loginElement}
        </div>
        <div class='header__optional__toolbar'>
          <a class='toolbar__cartSVG' href="/cart">
            ${cartSVG()}
          </a>
          ${this.cartElement}
        </div>
      </div>
      <div class='headear__mobile-container'>
        <div class='header__mobile__menu mobile-menu'>
          <div class='mobile-menu__button'>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
          <div class='mobile-menu__main'>
            <div class='mobile-menu__main-container'>
              <nav class='mobile-menu__list'>
                <div class='mobile-menu__list__item'><a href="/catalog">Catalog</a></div>
                <div class='mobile-menu__list__item'><a href="/about">About us</a></div>
                <div class='mobile-menu__list__item'><a href="/contacts">Contacts</a></div>
                <div class='mobile-menu__list__item item-account'>
                  ${this.mobileLoginElement}
                </div>
                <div class='mobile-menu__list__item item-cart'>
                  ${this.mobileCartElement}
                </div>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>`;
    this.element = header;
  }
  private defineLoginElementSVG(): string {
    return `<a href='/user'>${logInSVG()}</a>`;
  }
  private defineMobileLoginElementActions(): string {
    if (this.isLogged) {
      return `
        <a class='item-account__logout' href='/logout'>Log out</a>
        `;
    }
    return `
      <a class='item-account__login' href='/user/authorization'>Log in</a>
      /
      <a class='item-account__register' href='/user/registration'>Register</a>
      `;
  }
  private defineLoginElementActions() {
    if (this.isLogged) {
      return `
        <a class='account__actions__logout' href='/logout'>Log out</a>
        `;
    }
    return `
      <a class='account__actions__login' href='/user/authorization'>Log in</a>
      /
      <a class='account__actions__register' href='/user/registration'>Register</a>
      `;
  }
  get mobileLoginElement(): string {
    return `
    ${this.defineMobileLoginElementActions()}
    `;
  }
  get loginElement(): string {
    return `
    <div class='account__SVG'>
      ${this.defineLoginElementSVG()}
    </div>
    <div class='account__actions'>
      ${this.defineLoginElementActions()}
    </div>
    `;
  }
  set loginElement(isLogged: boolean) {
    if (isLogged !== this.isLogged) {
      localStorage.setItem('check', `${isLogged}`);
      this.isLogged = isLogged;
      document.querySelector('.account__SVG')!.innerHTML =
        this.defineLoginElementSVG();
      document.querySelector('.account__actions')!.innerHTML =
        this.defineLoginElementActions();
      document.querySelector('.item-account')!.innerHTML =
        this.mobileLoginElement;
    }
  }
  get mobileCartElement(): string {
    return `
    <a class='item-cart__text' href='/cart'>
    Cart <span class='item-cart__text__counter'>${this.currentCartItems}</span>
    </a>
    `;
  }
  get cartElement(): string {
    return `
    <div class='toolbar__cartCounter'>
      <span class='toolbar__cartCounter__text'>${this.currentCartItems}</span>
    </div>
    `;
  }
  set cartElement(itemNumber: number) {
    this.currentCartItems = itemNumber;
    document.querySelector('.toolbar__cartCounter__text')!.textContent =
      this.currentCartItems.toString();
    document.querySelector('.item-cart__text__counter')!.textContent =
      this.currentCartItems.toString();
  }

  public addListeners(): void {
    if (!document.body.contains(this.element)) {
      document.body.append(this.element);
    }
    document
      .querySelector('.mobile-menu__button')!
      .addEventListener('click', (event: Event) => menuHandler(event));
  }

  public static getInstance(options?: {
    isLogged: boolean;
    cartItems: number;
  }): Header {
    if (!Header.instance) {
      Header.instance = new Header(options);
    }

    return Header.instance;
  }
}

export default Header;
