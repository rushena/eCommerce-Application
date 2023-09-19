import Products from '../components/products';
import SideBar from '../components/sidebar';
import Perpage from '../components/perpage';
import Sorting from '../components/sorting';
import Paging from '../components/paging';
import Toggle from '../components/filterToggle';
import Navigation from '../components/topBarNavigation';
import '../../assets/css/catalog.css';
import '../../assets/css/topbar.css';
import getProductPage from './productPage';

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

  private getNavigation(product: Products): Navigation {
    const navigation = new Navigation(product);
    return navigation;
  }

  private renderTopToolbar(product: Products): [HTMLElement, Paging] {
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
    return [topbar, paging];
  }

  private getSideBar(
    products: Products,
    paging: Paging,
    navigation: Navigation,
    queryParams?: URLSearchParams
  ): HTMLElement {
    const sideBar = new SideBar(products, paging, navigation);
    if (queryParams) {
      return sideBar.getElement(queryParams);
    } else {
      return sideBar.getElement();
    }
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

  private async addAllBlocks(queryParams?: URLSearchParams) {
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
    const navigation = this.getNavigation(products);
    const [topToolBar, paging] = this.renderTopToolbar(products);
    middleSection.append(
      this.getSideBar(products, paging, navigation, queryParams),
      productsElement
    );
    this.catalog.append(
      navigation.getElement(),
      topToolBar,
      middleSection,
      this.renderBotToolbar()
    );
  }

  public async getElement(queryParams?: URLSearchParams) {
    this.catalog.innerHTML = '';
    if (queryParams) {
      const detailedProductID = queryParams.get('detailed-product');
      if (!detailedProductID) {
        this.addAllBlocks(queryParams);
      } else {
        const productPageElement = await getProductPage(detailedProductID);
        const previousProduct = new URL(window.location.href).searchParams.get(
          'detailed-product'
        )!;
        if (previousProduct !== detailedProductID)
          history.pushState({}, '', `?detailed-product=${detailedProductID}`);
        document.querySelector('body > div')!.innerHTML = '';
        document.querySelector('body > div')!.append(productPageElement);
      }
    } else {
      this.addAllBlocks();
    }
    return this.catalog;
  }
}
