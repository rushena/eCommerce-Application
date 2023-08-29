import '../../assets/css/sorting.css';

export default class Sorting {
  private sorting = document.createElement('div');

  public fillProducts() {
    this.sorting.innerHTML = `
    <button class='catalog__topbar__sorting__current'>Price asc </button>
    <div class='class='catalog__topbar__sorting__menu sorting-menu'>
      <button class='sorting-menu__item'>Price asc</button>
      <button class='sorting-menu__item'>Price des</button>
      <button class='sorting-menu__item'>Name A to Z</button>
      <button class='sorting-menu__item'>Name Z to A</button>
    </div>
    `;
  }

  public getElement() {
    this.fillProducts();
    this.sorting.classList.add('catalog__topbar__sorting');
    return this.sorting;
  }
}
