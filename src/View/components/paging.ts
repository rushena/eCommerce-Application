import '../../assets/css/pagins.css';
import { pageDown } from '../../assets/img/pageDown';
import { pageUp } from '../../assets/img/pageUp';
import Products from '../components/products';

export default class Paging {
  private paging = document.createElement('div');
  private length;
  private current;
  private products;
  private perpage;

  constructor(products: Products, current = 1) {
    this.current = current;
    this.products = products;
    this.perpage = products.perPage;
    this.length = Math.ceil(products.total / this.perpage);
  }

  public setLength(total: number) {
    this.length = Math.ceil(total / this.perpage);
    this.fillPaging();
  }

  public setPerPage(perpage: number) {
    this.perpage = perpage;
    this.length = Math.ceil(this.products.total / this.perpage);
  }

  public setCurrent(current: number) {
    this.current = current;
    const newOptions: typeof this.products.options = {
      queryArgs: {
        ...this.products.options?.queryArgs,
        limit: this.perpage,
        offset: (current - 1) * this.perpage,
      },
    };
    this.products.fillProducts(newOptions);
    this.fillPaging();
  }

  public getCurrent() {
    return this.current;
  }

  private getPagingList(): string[] {
    let itemArray: string[] = [];
    if (this.length === 1) {
      itemArray = ['1'];
    } else if (this.current === 1) {
      if (this.length >= 5) {
        itemArray = ['1', '2', '3', '...', `${this.length}`, '>'];
      } else if (this.length === 4) {
        itemArray = ['1', '2', '3', '4', '>'];
      } else if (this.length === 3) {
        itemArray = ['1', `2`, `3`, '>'];
      } else {
        itemArray = ['1', `2`, '>'];
      }
    } else if (this.current === this.length) {
      console.log(this.length);
      if (this.length >= 5) {
        itemArray = [
          '<',
          '1',
          '...',
          `${this.length - 2}`,
          `${this.length - 1}`,
          `${this.length}`,
        ];
      } else if (this.length === 4) {
        itemArray = ['<', '1', `2`, `3`, `4`];
      } else if (this.length === 3) {
        itemArray = ['<', '1', `2`, `3`];
      } else {
        itemArray = ['<', '1', `2`];
      }
    } else {
      if (this.length >= 5) {
        if (this.current < 4) {
          itemArray = ['<', '1', '2', '3', '4', '...', `${this.length}`, '>'];
        } else if (this.current >= this.length - 2) {
          itemArray = [
            '<',
            '1',
            '...',
            `${this.length - 3}`,
            `${this.length - 2}`,
            `${this.length - 1}`,
            `${this.length}`,
            '>',
          ];
        } else {
          itemArray = [
            '<',
            '1',
            '...',
            `${this.current - 1}`,
            `${this.current}`,
            `${this.current + 1}`,
            '...',
            `${this.length}`,
            '>',
          ];
        }
      } else if (this.length === 4) {
        itemArray = ['<', '1', `2`, `3`, `4`, '>'];
      } else if (this.length === 3) {
        itemArray = ['<', '1', `2`, `3`, '>'];
      } else {
        itemArray = ['<', '1', `2`, '>'];
      }
    }
    return itemArray;
  }

  private changePage(input: true | false | number) {
    if (input === true) {
      this.setCurrent(this.current + 1);
    } else if (input === false) {
      this.setCurrent(this.current - 1);
    } else {
      this.setCurrent(input);
    }
  }

  public fillPaging() {
    if (this.length === 0) {
      this.paging.innerHTML = '0';
      return;
    }
    const pagingList = this.getPagingList();
    while (this.paging.firstChild) {
      this.paging.removeChild(this.paging.firstChild);
    }
    this.paging.innerHTML = '';
    pagingList.forEach((value) => {
      const item = document.createElement('div');
      item.classList.add('catalog__topbar__pagination__item');
      switch (value) {
        case '...':
          item.textContent = '...';
          break;
        case '<':
          item.innerHTML = pageDown();
          item.addEventListener('click', () => this.changePage(false));
          break;
        case '>':
          item.innerHTML = pageUp();
          item.addEventListener('click', () => this.changePage(true));
          break;
        default:
          item.textContent = value;
          if (this.current === Number.parseInt(value))
            item.classList.add('catalog__topbar__pagination__item_current');
          item.addEventListener('click', () =>
            this.changePage(Number.parseInt(value))
          );
      }
      this.paging.append(item);
    });
  }

  public getElement() {
    this.fillPaging();
    this.paging.classList.add('catalog__topbar__pagination');
    return this.paging;
  }
}
