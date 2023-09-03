import '../../assets/css/sidebar.css';
import '../../assets/css/slider.css';
import Products from './products';
import Paging from './paging';
import Navigation from './topBarNavigation';
import {
  categoryHandler,
  priceHandle,
  subCategoryHandler,
} from '../../Controller/products/sideBarHandlers';
import { Category } from '../../types/product.type';
// import { PriceSlider } from './priceSliders';
// import { createDOMElement } from '../../Utility/createElement';

export default class SideBar {
  private sideBar = document.createElement('div');
  private products: Products;
  private paging: Paging;
  private navigation: Navigation;

  constructor(products: Products, paging: Paging, navigation: Navigation) {
    this.products = products;
    this.paging = paging;
    this.navigation = navigation;
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
    `;
    const categoiesMenuElement = document.createElement('div');
    categoiesMenuElement.classList.add('sidebar-container__types-menu');
    const parents = this.products.categories.filter((value) => {
      if (value.parent === null) return true;
      return false;
    });
    parents.forEach((item) => {
      const categoryElement = document.createElement('label');
      categoryElement.classList.add('type-menu__item');
      categoryElement.innerHTML = `
      <input type="radio" name="radio">
      <span class="checkmark"></span>
      <div>${item.name}</div>
      `;
      categoiesMenuElement.append(categoryElement);
    });
    types.append(categoiesMenuElement);

    const plus = types.querySelector('.plus');
    types.addEventListener('click', () => {
      categoiesMenuElement?.classList.toggle(
        'sidebar-container__types-menu_active'
      );
      plus?.classList.toggle('plus_active');
    });
    const bindedGetSubCategories = this.getSubCategories.bind(this);
    categoiesMenuElement?.addEventListener('click', (event) =>
      categoryHandler(
        event,
        this.products,
        this.paging,
        this.navigation,
        bindedGetSubCategories,
        types as HTMLDivElement
      )
    );
    return types;
  }

  private getSubCategories(categoryList: Category[]) {
    let subCategory = document.querySelector(
      '.sidebar-container__sub-category-container'
    ) as HTMLDivElement | null;
    if (subCategory === null) {
      subCategory = document.createElement('div');
      subCategory.classList.add('sidebar-container__sub-category-container');
    }
    subCategory.innerHTML = `
    <div class='sidebar-container__sub-category-toggle'>
      <span class='sidebar-container__title'>Sub categories</span>
      <div class='plus'>
        <div></div>
        <div></div>
      </div>
    </div>
    `;
    const categoiesMenuElement = document.createElement('div');
    categoiesMenuElement.classList.add('sidebar-container__sub-category-menu');
    categoryList.forEach((item) => {
      const categoryElement = document.createElement('label');
      categoryElement.classList.add('sub-category-menu__item');
      categoryElement.innerHTML = `
      <input type="checkbox" name="radio">
      <span class="checkmark"></span>
      <div>${item.name}</div>
      `;
      categoiesMenuElement.append(categoryElement);
    });
    subCategory.append(categoiesMenuElement);

    const plus = subCategory.querySelector('.plus');
    subCategory.addEventListener('click', () => {
      categoiesMenuElement?.classList.toggle(
        'sidebar-container__sub-category-menu_active'
      );
      plus?.classList.toggle('plus_active');
    });

    categoiesMenuElement?.addEventListener('click', (event) =>
      subCategoryHandler.call(
        this,
        event,
        this.products,
        this.paging,
        this.navigation,
        categoryList
      )
    );
    return subCategory;
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
      defaultValue='1000'
      placeholder='1000'
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
      priceHandle(firstInput, secondInput, this.products, this.paging);
    });

    secondInput?.addEventListener('change', (event) => {
      const target = event.target as HTMLInputElement;
      if (+target.value < +firstInput.value) {
        const val = target.value;
        target.value = firstInput.value;
        firstInput.value = val;
      }
      priceHandle(firstInput, secondInput, this.products, this.paging);
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
    searchBox.addEventListener('change', async (event: Event) => {
      const target = event.target as HTMLInputElement;
      const newOptions: typeof this.products.options = {
        queryArgs: {
          ...this.products.options?.queryArgs,
          ['text.en-us']: target.value,
        },
      };
      await this.products.fillProducts(newOptions);
      this.paging.setLength(this.products.total);
    });
  }

  public getElement() {
    this.fillSideBar();
    this.sideBar.classList.add('catalog__sidebar');
    this.sideBar.classList.add('sidebar-container');
    return this.sideBar;
  }
}
