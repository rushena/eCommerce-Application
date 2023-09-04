import '../../assets/css/sidebar.css';
import '../../assets/css/slider.css';
import Products from './products';
import Paging from './paging';
import Navigation from './topBarNavigation';
import {
  categoryHandler,
  priceHandle,
  subCategoryHandler,
  colorHandler,
} from '../../Controller/products/sideBarHandlers';
import { Category } from '../../types/product.type';

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

  private getCategories(queryParams?: URLSearchParams) {
    const types = document.createElement('div');
    types.classList.add('sidebar-container__types-container');
    types.innerHTML = `
    <div class='sidebar-container__types-toggle'>
      <span class='sidebar-container__title'>Categories</span>
      <div class='plus ${queryParams ? 'plus_active' : ''}'>
        <div></div>
        <div></div>
      </div>
    </div>
    `;
    const categoiesMenuElement = document.createElement('div');
    categoiesMenuElement.classList.add('sidebar-container__types-menu');
    if (queryParams)
      categoiesMenuElement.classList.add(
        'sidebar-container__types-menu_active'
      );
    const parents = this.products.categories.filter((value) => {
      if (value.parent === null) return true;
      return false;
    });
    let elementForQuery: undefined | HTMLLabelElement;
    parents.forEach((item) => {
      const categoryElement = document.createElement('label');
      categoryElement.classList.add('type-menu__item');
      categoryElement.innerHTML = `
      <input type="radio" name="radio">
      <span class="checkmark"></span>
      <div>${item.name}</div>
      `;
      categoiesMenuElement.append(categoryElement);
      if (queryParams?.get('category') === item.name?.toLowerCase()) {
        elementForQuery = categoryElement;
      }
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
    return { element: types, queryElement: elementForQuery };
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

  private getColors() {
    const colorList = [
      '#000000',
      '#C0DDED',
      '#FCD164',
      '#F75151',
      '#0C2C7E',
      '#D8C1AD',
      '#874E19',
      '#9A9494',
      '#A27AC9',
      '#67BA92',
      '#FB9620',
      '#F1F1F1',
    ];
    const colorNames = [
      'Black',
      'Blue-gray',
      'Yellow',
      'Red',
      'Dark blue',
      'Beige',
      'Brown',
      'Gray',
      'Purple',
      'Green',
      'Orange',
      'White',
    ];
    const colors = document.createElement('div');
    colors.classList.add('sidebar-container__colors-container');
    colors.innerHTML = `
    <div class='sidebar-container__colors-toggle'>
      <span class='sidebar-container__title'>Colors</span>
      <div class='plus'>
        <div></div>
        <div></div>
      </div>
    </div>
    `;
    const categoiesMenuElement = document.createElement('div');
    categoiesMenuElement.classList.add('sidebar-container__colors-menu');
    colorNames.forEach((item, index) => {
      const categoryElement = document.createElement('label');
      categoryElement.classList.add('colors-menu__item');
      categoryElement.innerHTML = `
      <input type="checkbox">
      <span class="checkmark"></span>
      <span class="color-sample"></span>
      <div>${item}</div>
      `;
      const checkmark = categoryElement.querySelector(
        '.color-sample'
      ) as HTMLElement;
      checkmark.style.backgroundColor = colorList[index];
      categoiesMenuElement.append(categoryElement);
    });
    colors.append(categoiesMenuElement);

    const plus = colors.querySelector('.plus');
    colors.addEventListener('click', () => {
      categoiesMenuElement?.classList.toggle(
        'sidebar-container__colors-menu_active'
      );
      plus?.classList.toggle('plus_active');
    });

    categoiesMenuElement?.addEventListener('mouseup', (event) => {
      const target = event.target as HTMLElement;
      const parent = target.closest('.colors-menu__item');
      const colorInput =
        colorNames[[...categoiesMenuElement.children].indexOf(parent!)]; //.toLowerCase();
      colorHandler(colorInput, this.products, this.paging);
    });
    return colors;
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

  public fillSideBar(queryParams?: URLSearchParams) {
    this.sideBar.innerHTML = `
    <div class='sidebar-container__search'>
      <input type='text' placeholder='Search'>
      <div></div>
    </div>
    `;
    const { element: categoriesElement, queryElement: queryElement } =
      this.getCategories(queryParams ?? undefined);
    this.sideBar.append(categoriesElement);
    if (queryElement) {
      queryElement.click();
    }
    this.sideBar.append(this.getColors());
    this.sideBar.append(this.getPrices());

    const searchBox = this.sideBar.querySelector('.sidebar-container__search')
      ?.children[0] as HTMLElement;
    searchBox.addEventListener('change', async (event: Event) => {
      const target = event.target as HTMLInputElement;
      const newOptions: typeof this.products.options = {
        queryArgs: {
          ...this.products.options?.queryArgs,
          ['text.en-US']: target.value,
        },
      };
      await this.products.fillProducts(newOptions);
      this.paging.setLength(this.products.total);
    });
  }

  public getElement(queryParams?: URLSearchParams) {
    if (queryParams) {
      this.fillSideBar(queryParams);
    } else {
      this.fillSideBar();
    }
    this.sideBar.classList.add('catalog__sidebar');
    this.sideBar.classList.add('sidebar-container');
    return this.sideBar;
  }
}
