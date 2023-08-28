import Products from '../components/products';

export class Catalog {
  private catalog = document.createElement('main');

  private renderTopToolbar(): HTMLElement {
    const topbar = document.createElement('div');
    topbar.classList.add('catalog__topbar');
    topbar.innerHTML = `
    <div class='catalog__topbar__filters-toggle'>
      Hide filters
    </div>
    <div class='catalog__topbar__sorting'>
    </div>
    <div class='catalog__topbar__pagination'>
    </div>
    `;
    return topbar;
  }

  private renderProducts(): HTMLElement {
    const products = new Products();
    return products.getElement();
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
    this.catalog.append(
      this.renderTopToolbar(),
      this.renderProducts(),
      this.renderBotToolbar()
    );
  }

  public getElement() {
    this.catalog.innerHTML = '';
    this.addAllBlocks();
    return this.catalog;
  }
}
