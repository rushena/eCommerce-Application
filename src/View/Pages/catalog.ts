import Products from '../components/products';
import SideBar from '../components/sidebar';
import Perpage from '../components/perpage';
import Sorting from '../components/sorting';
import Paging from '../components/paging';
import Toggle from '../components/filterToggle';
import '../../assets/css/catalog.css';
import '../../assets/css/topbar.css';

export class Catalog {
  private catalog = document.createElement('main');

  private renderSorting(product: Products): HTMLElement {
    const sorting = new Sorting(product);
    return sorting.getElement();
  }

  private renderToggle(): HTMLElement {
    const toggle = new Toggle();
    return toggle.getElement();
  }

  private getPerpage(product: Products, paging: Paging): Perpage {
    const perPage = new Perpage(product, paging);
    return perPage;
  }

  private getPaging(product: Products): Paging {
    const paging = new Paging(product);
    paging.setPerPage(product.perPage);
    return paging;
  }

  private renderTopToolbar(product: Products): HTMLElement {
    console.log(product.total);
    const paging = this.getPaging(product);
    const perpage = this.getPerpage(product, paging);
    const topbar = document.createElement('div');
    topbar.classList.add('catalog__topbar');
    topbar.append(
      this.renderToggle(),
      this.renderSorting(product),
      perpage.getElement(),
      paging.getElement()
    );
    return topbar;
  }

  private getSideBar(products: Products): HTMLElement {
    const sideBar = new SideBar(products);
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

  private async addAllBlocks() {
    this.catalog.classList.add('main');
    const middleSection = document.createElement('div');
    middleSection.classList.add('catalog__middle');
    const products = this.getProducts();
    const productsElement = await products.getElement({
      queryArgs: {
        filter: [],
        limit: products.perPage,
        offset: 0,
        sort: 'price asc',
      },
    });
    middleSection.append(this.getSideBar(products), productsElement);
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
