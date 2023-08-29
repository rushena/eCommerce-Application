import Products from '../components/products';
import SideBar from '../components/sidebar';
import Perpage from '../components/perpage';
import Sorting from '../components/sorting';
import Paging from '../components/paging';
import '../../assets/css/catalog.css';
import '../../assets/css/topbar.css';

export class Catalog {
  private catalog = document.createElement('main');

  private renderSorting(): HTMLElement {
    const sorting = new Sorting();
    return sorting.getElement();
  }

  private renderPerpage(): HTMLElement {
    const perPage = new Perpage();
    return perPage.getElement();
  }

  private renderPaging(product: Products): HTMLElement {
    const paging = new Paging(4, product);
    return paging.getElement();
  }

  private renderTopToolbar(product: Products): HTMLElement {
    const topbar = document.createElement('div');
    topbar.classList.add('catalog__topbar');
    topbar.innerHTML = `
    <div class='catalog__topbar__filters-toggle'>
      Hide filters
    </div>
    `;
    topbar.append(
      this.renderSorting(),
      this.renderPerpage(),
      this.renderPaging(product)
    );
    return topbar;
  }

  private renderSideBar(): HTMLElement {
    const sideBar = new SideBar();
    return sideBar.getElement();
  }

  private getProducts(): Products {
    const products = new Products();
    return products;
  }

  private renderBotToolbar(): HTMLElement {
    const botbar = document.createElement('div');
    botbar.classList.add('catalog__botbar');
    botbar.innerHTML = `
    <div class='catalog__botbar__sorting'>
    </div>
    <div class='catalog__botbar__pagination'>
    </div>
    `;
    return botbar;
  }

  private addAllBlocks() {
    this.catalog.classList.add('main');
    const middleSection = document.createElement('div');
    middleSection.classList.add('catalog__middle');
    const products = this.getProducts();
    middleSection.append(this.renderSideBar(), products.getElement());
    this.catalog.append(
      this.renderTopToolbar(products),
      middleSection,
      this.renderBotToolbar()
    );
  }

  public getElement() {
    this.catalog.innerHTML = '';
    this.addAllBlocks();
    return this.catalog;
  }
}
