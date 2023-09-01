import '../../assets/css/sidebar.css';
import '../../assets/css/slider.css';
import Products from './products';
// import { PriceSlider } from './priceSliders';
// import { createDOMElement } from '../../Utility/createElement';

export default class SideBar {
  private sideBar = document.createElement('div');
  private products: Products;

  constructor(products: Products) {
    this.products = products;
  }

  private getCategories() {
    const types = document.createElement('div');
    types.classList.add('sidebar-container__types-container');
    types.innerHTML = `
    <div class='sidebar-container__types-toggle'>
      <span class='sidebar-container__title'>Categories</span>
      <div class='plus'>
        <div></div>
        <div></div>
      </div>
    </div>
    <div class='sidebar-container__types-menu'>
      <label class="type-menu__item">
        <input type="checkbox">
        <span class="checkmark"></span>
        <div>Furniture</div>
      </label>

      <label class="type-menu__item">
        <input type="checkbox">
        <span class="checkmark"></span>
        <div>Clothes</div>
      </label>

      <label class="type-menu__item">
        <input type="checkbox">
        <span class="checkmark"></span>
        <div>Stationery</div>
      </label>

      <label class="type-menu__item">
        <input type="checkbox">
        <span class="checkmark"></span>
        <div>Electronics</div>
      </label>

      <label class="type-menu__item">
        <input type="checkbox">
        <span class="checkmark"></span>
        <div>Hobby</div>
      </label>

      <label class="type-menu__item">
        <input type="checkbox">
        <span class="checkmark"></span>
        <div>Other</div>
      </label>
    </div>
    `;
    const menu = types.querySelector('.sidebar-container__types-menu');
    const plus = types.querySelector('.plus');
    types.addEventListener('click', () => {
      menu?.classList.toggle('sidebar-container__types-menu_active');
      plus?.classList.toggle('plus_active');
    });
    return types;
  }

  private getPrices() {
    const sliderElement = document.createElement('div');
    sliderElement.classList.add('sidebar-container__price');
    sliderElement.innerHTML = `
    <span class='sidebar-container__title'>Price, $</span>
    <div class='sidebar-container__price-container'>
      <input
      type='number'
      step="0.5"
      min="0"
      default='0'
      class='sidebar-container__price-range'>
      <span class='sidebar-container__title'>-</span>
      <input
      type='number'
      step="0.5"
      min="0"
      default='1000'
      class='sidebar-container__price-range'>
    </input>
    `;
    const firstInput = sliderElement.querySelector(
      '.sidebar-container__price-container'
    )?.children[0] as HTMLInputElement;
    const secondInput = sliderElement.querySelector(
      '.sidebar-container__price-container'
    )?.children[2] as HTMLInputElement;

    firstInput?.addEventListener('change', (event) => {
      const target = event.target as HTMLInputElement;
      if (+target.value > +secondInput.value) {
        const val = target.value;
        target.value = secondInput.value;
        secondInput.value = val;
      }
    });

    secondInput?.addEventListener('change', (event) => {
      const target = event.target as HTMLInputElement;
      if (+target.value < +firstInput.value) {
        const val = target.value;
        target.value = firstInput.value;
        firstInput.value = val;
      }
    });

    return sliderElement;
  }

  public fillSideBar() {
    this.sideBar.innerHTML = `
    <div class='sidebar-container__search'>
      <input type='text' placeholder='Search'>
      <div></div>
    </div>
    `;
    this.sideBar.append(this.getCategories());
    this.sideBar.append(this.getPrices());
  }

  public getElement() {
    this.fillSideBar();
    this.sideBar.classList.add('catalog__sidebar');
    this.sideBar.classList.add('sidebar-container');
    return this.sideBar;
  }
}
