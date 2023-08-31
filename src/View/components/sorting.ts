import '../../assets/css/sorting.css';
import { backDrop } from '../../assets/img/backDrop';
import Products from '../components/products';

export default class Sorting {
  private sorting = document.createElement('div');
  private products;

  constructor(products: Products) {
    this.products = products;
  }

  public fillSorting() {
    this.sorting.innerHTML = `
    <div class='catalog__topbar__sorting__description'>Sort by</div>
    <div class='catalog__topbar__sorting__input'>
      <div class='catalog__topbar__sorting__current'>
        <span class='catalog__topbar__sorting__current__text'>Price asc</span>
        <div class='catalog__topbar__sorting__current__image'>
          ${backDrop()}
        </div>
      </div>
      <div class='catalog__topbar__sorting__menu sorting-menu'>
        <div class='sorting-menu__item' data-mode='price asc'>Price asc</div>
        <div class='sorting-menu__item' data-mode='price desc'>Price desc</div>
        <div class='sorting-menu__item' data-mode='name.en-us asc'>Name A to Z</div>
        <div class='sorting-menu__item' data-mode='name.en-us desc'>Name Z to A</div>
      </div>
    </div>
    `;
    const menu = this.sorting.querySelector('.sorting-menu');
    const img = this.sorting.querySelector(
      '.catalog__topbar__sorting__current__image > svg'
    );
    const sortToggle = this.sorting.querySelector(
      '.catalog__topbar__sorting__current'
    );
    sortToggle!.addEventListener('click', () => {
      img?.classList.toggle('sorting-image_active');
      menu?.classList.toggle('sorting-menu_active');
    });
    menu?.addEventListener('click', (event) => {
      const target = event.target as HTMLElement;
      if (target.dataset.mode) {
        sortToggle!.children[0].textContent = target.textContent;
        img?.classList.toggle('sorting-image_active');
        menu?.classList.toggle('sorting-menu_active');

        if (this.products.options?.queryArgs?.sort !== target.dataset.mode) {
          const newOptions: typeof this.products.options = {
            queryArgs: {
              ...this.products.options?.queryArgs,
              sort: target.dataset.mode,
            },
          };
          this.products.fillProducts(newOptions);
        }
      }
    });
  }

  public getElement() {
    this.fillSorting();
    this.sorting.classList.add('catalog__topbar__sorting');
    return this.sorting;
  }
}
