import '../../assets/css/sorting.css';

export default class Sorting {
  private sorting = document.createElement('div');

  public fillProducts() {
    this.sorting.innerHTML = `
    <div class='catalog__topbar__sorting__description'>Sort by</div>
    <div class='catalog__topbar__sorting__input'>
      <div class='catalog__topbar__sorting__current'>Price asc </div>
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
    this.fillProducts();
    this.sorting.classList.add('catalog__topbar__sorting');
    return this.sorting;
  }
}
