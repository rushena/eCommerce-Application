import '../../assets/css/topBarNavigation.css';
import { homeSVG } from '../../assets/img/home';
import Products from './products';

export default class Navigation {
  private navigation = document.createElement('div');
  private products: Products;

  constructor(products: Products) {
    this.products = products;
  }

  public fillNavigation() {
    this.navigation.innerHTML = `
    <a class='navigation__homeSVG' href="/catalog">
      ${homeSVG()}
    </a>
    ${this.products.currentCategories.length >= 1 ? '<span> > </span>' : ''}
    `;
    this.products.currentCategories.forEach((value) => {
      if (value === 'Color' || value === 'Price') return;
      const newLink = document.createElement('a');
      newLink.classList.add('navigation__item');
      if (typeof value === 'string') {
        newLink.innerHTML = `<span>${value}</span>`;
      } else {
        newLink.innerHTML = `<span> <a href = './catalog?category=${value.parent.toLowerCase()}'>${
          value.parent
        }</a> ${value.children.length > 0 ? '>' : ''} ${value.children.join(
          ', '
        )} </span>`;
      }
      this.navigation.append(newLink);
    });
  }

  public getElement() {
    this.fillNavigation();
    this.navigation.classList.add('catalog__navigation');
    return this.navigation;
  }
}
