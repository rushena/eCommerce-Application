import '../../assets/css/perpage.css';
import Products from './products';
import Paging from './paging';

export default class Perpage {
  private perpage = document.createElement('div');
  private products: Products;
  private paging: Paging;

  constructor(products: Products, paging: Paging) {
    this.products = products;
    this.paging = paging;
  }

  public fillProducts() {
    this.perpage.innerHTML = `
    <div class='catalog__topbar__perpage__submit'>
      <input type="submit" value="Show" />
    </div>
    <input
      id="perpage"
      type="number"
      step="5"
      min="5"
      max="30"
      placeholder="15"
      required
      class='catalog__topbar__perpage__input'/>
    <label for="perpage">products per page</label>
    `;
    this.perpage
      .querySelector('.catalog__topbar__perpage__submit')!
      .addEventListener('click', () => {
        const inputElement = this.perpage.querySelector(
          '.catalog__topbar__perpage__input'
        ) as HTMLInputElement;
        if (Number.parseInt(inputElement.value) !== this.products.perPage) {
          this.products.perPage = Number.parseInt(inputElement.value);
          this.paging.setPerPage(this.products.perPage);
          this.paging.setCurrent(1);
          const newOptions: typeof this.products.options = {
            queryArgs: {
              ...this.products.options?.queryArgs,
              limit: this.products.perPage,
              offset: 0,
            },
          };
          this.products.fillProducts(newOptions);
        }
      });
  }

  public getElement() {
    this.fillProducts();
    this.perpage.classList.add('catalog__topbar__perpage');
    return this.perpage;
  }

  public getValue(): string {
    const inputElement = this.perpage.children[1] as HTMLInputElement;
    console.log(inputElement);
    return inputElement.value === ''
      ? inputElement.placeholder
      : inputElement.value;
  }
}
