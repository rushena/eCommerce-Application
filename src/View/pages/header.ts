import './../../assets/css/header.css';
import { cartSVG } from '../../assets/img/cart';
import { logInSVG } from '../../assets/img/login';
import { logOutSVG } from '../../assets/img/logout';

class Header {
  private static instance: Header;
  private isLogged = false;
  private currentCartItems = 0;
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
          <div class='toolbar__cartSVG'>
            ${cartSVG()}
          </div>
          ${this.cartElement}
        </div>
      </div>
    </div>`;
    document.body.prepend(header);
    document
      .querySelector('.account__actions')!
      .addEventListener('click', (event: Event) => {
        const target = event.target as HTMLElement;
        if (target.classList.contains('account__actions__logout')) {
          this.loginElement = false;
        }
        if (
          target.classList.contains('account__actions__login') ||
          target.classList.contains('account__actions__register')
        ) {
          this.loginElement = true;
        }
      });
  }
  private loginElementSVG(): string {
    return this.isLogged ? logOutSVG() : logInSVG();
  }
  private loginElementActions() {
    if (this.isLogged) {
      return `
        <a class='account__actions__logout' href='/logout'>Log out</a>
        `;
    }
    return `
      <a class='account__actions__login' href='/login'>Log in</a>
      /
      <a class='account__actions__register' href='/register'>Register</a>
      `;
  }
  get loginElement(): string {
    return `
    <div class='account__SVG'>
      ${this.loginElementSVG()}
    </div>
    <div class='account__actions'>
      ${this.loginElementActions()}
    </div>
    `;
  }
  set loginElement(isLogged: boolean) {
    if (isLogged !== this.isLogged) {
      localStorage.setItem('check', `${isLogged}`);
      this.isLogged = isLogged;
      document.querySelector('.account__SVG')!.innerHTML =
        this.loginElementSVG();
      document.querySelector('.account__actions')!.innerHTML =
        this.loginElementActions();
    }
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
