import '../../assets/css/sorting.css';
import { backDrop } from '../../assets/img/backDrop';

export default class Sorting {
  private sorting = document.createElement('div');

  public fillSorting() {
    this.sorting.innerHTML = `
    <div class='catalog__topbar__sorting__description'>Sort by</div>
    <div class='catalog__topbar__sorting__input'>
      <div class='catalog__topbar__sorting__current'>
        <span>Price asc</span>
        <div>
          ${backDrop()}
        </div>
      </div>
      <div class='catalog__topbar__sorting__menu sorting-menu'>
        <div class='sorting-menu__item'>Price asc</div>
        <div class='sorting-menu__item'>Price des</div>
        <div class='sorting-menu__item'>Name A to Z</div>
        <div class='sorting-menu__item'>Name Z to A</div>
      </div>
    </div>
    `;
  }

  public getElement() {
    this.fillSorting();
    this.sorting.classList.add('catalog__topbar__sorting');
    return this.sorting;
  }
}
