import '../../assets/css/sidebar.css';
import '../../assets/css/slider.css';
import Products from './products';
// import { PriceSlider } from './priceSliders';
// import { createDOMElement } from '../../Utility/createElement';

function categoryHandler(event: Event, products: Products) {
  const target = event.target as HTMLElement;
  const parent = target.closest('.type-menu__item');
  const categoryText = parent?.children[2].textContent;
  if (!categoryText) return;
  const categoryID = products.categories.find((value) => {
    if (value.name === categoryText) return true;
  })?.id;
  const newFilter = products.options?.queryArgs?.filter;
  if (!newFilter || !Array.isArray(newFilter)) return;
  if (products.currentCategories.includes(categoryText)) {
    const index = products.currentCategories.indexOf(categoryText);
    newFilter.splice(index, 1);
    products.currentCategories.splice(index, 1);
  } else {
    products.currentCategories.push(categoryText);
    newFilter.push(`categories.id:"${categoryID}"`);
  }
  const newOptions: typeof products.options = {
    queryArgs: {
      ...products.options?.queryArgs,
      filter: newFilter,
    },
  };
  products.fillProducts(newOptions);
}

function priceHandle(
  firstInput: HTMLInputElement,
  secondInput: HTMLInputElement,
  products: Products
) {
  const newFilter = products.options?.queryArgs?.filter;
  if (!newFilter || !Array.isArray(newFilter)) return;
  if (!products.currentCategories.includes('Price')) {
    products.currentCategories.push('Price');
  } else {
    const index = products.currentCategories.indexOf('Price');
    newFilter.splice(index, 1);
  }
  newFilter.push(
    `variants.price.centAmount:range (${
      firstInput.value === '' ? firstInput.placeholder : firstInput.value
    } to ${
      secondInput.value === '' ? secondInput.placeholder : secondInput.value
    })`
  );
  console.log(products.currentCategories);
  console.log(newFilter);
  const newOptions: typeof products.options = {
    queryArgs: {
      ...products.options?.queryArgs,
      filter: newFilter,
    },
  };
  products.fillProducts(newOptions);
}
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

    menu?.addEventListener('change', (event) =>
      categoryHandler(event, this.products)
    );
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
      step="10"
      min="10"
      default='10'
      placeholder='10'
      class='sidebar-container__price-range'>
      <span class='sidebar-container__title'>-</span>
      <input
      type='number'
      step="10"
      min="20"
      default='20'
      placeholder='20'
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
      priceHandle(firstInput, secondInput, this.products);
    });

    secondInput?.addEventListener('change', (event) => {
      const target = event.target as HTMLInputElement;
      if (+target.value < +firstInput.value) {
        const val = target.value;
        target.value = firstInput.value;
        firstInput.value = val;
      }
      priceHandle(firstInput, secondInput, this.products);
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

    const searchBox = this.sideBar.querySelector('.sidebar-container__search')
      ?.children[0] as HTMLElement;
    searchBox.addEventListener('change', (event: Event) => {
      const target = event.target as HTMLInputElement;
      const newOptions: typeof this.products.options = {
        queryArgs: {
          ...this.products.options?.queryArgs,
          ['text.en-us']: target.value,
        },
      };
      this.products.fillProducts(newOptions);
    });
  }

  public getElement() {
    this.fillSideBar();
    this.sideBar.classList.add('catalog__sidebar');
    this.sideBar.classList.add('sidebar-container');
    return this.sideBar;
  }
}
