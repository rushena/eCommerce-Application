import '../../assets/css/pagins.css';
import { pageDown } from '../../assets/img/pageDown';
import { pageUp } from '../../assets/img/pageUp';
import Products from '../components/products';

export default class Paging {
  private paging = document.createElement('div');
  private length;
  private current;
  private products;

  constructor(length: number, products: Products, current = 1) {
    this.length = length;
    this.current = current;
    this.products = products;
  }

  public setLength(length: number) {
    this.length = length;
    this.fillPaging();
  }

  public setCurrent(current: number) {
    this.current = current;
    this.products.fillProducts({
      queryArgs: { limit: 10, offset: (current - 1) * 10 },
    });
    this.fillPaging();
  }

  private getPagingList(): string[] {
    let itemArray: string[] = [];
    if (this.current === 1) {
      if (this.length >= 5) {
        itemArray = ['1', '2', '3', '...', `${this.length}`, '>'];
      } else if (this.length === 4) {
        itemArray = ['1', '2', '3', '4', '>'];
      } else {
        itemArray = ['1', '2', '3', '>'];
      }
    } else if (this.current === this.length) {
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
      } else {
        itemArray = ['<', '1', `2`, `3`];
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
      } else {
        itemArray = ['<', '1', `2`, `3`, '>'];
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
    const pagingList = this.getPagingList();
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
