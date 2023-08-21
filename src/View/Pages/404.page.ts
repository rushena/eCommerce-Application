import '../../assets/css/404.css';
import pageImage from '../../assets/img/notFoundPageImage'

interface IPageNotFound {
  createWrap: () => HTMLElement,
  setDOMStructure: () => void,
  getPageCode: () => HTMLElement,
  getWrap: () => HTMLElement
}

export class PageNotFound implements IPageNotFound {
  private readonly pageWrap: HTMLElement;

  constructor() {
    this.pageWrap = this.createWrap();
  }

  getWrap(): HTMLElement {
    return this.pageWrap;
  }

  protected createWrap = (): HTMLElement => {
    const $page: HTMLElement = document.createElement('div');
    $page.classList.add('not-found');

    return $page;
  };

  protected setDOMStructure(): void {
    this.pageWrap.innerHTML = `
			<div class="not-found__inner">
        <div class="not-found__image">${pageImage()}</div>
        <h1 class="not-found__title">Oh no. We lost this page</h1>
        <p class="not-found__text">We searched everywhere but couldn’t find what  you’re looking for. <br />Let’s find a better place for you to go.</p>
        <a href="/" class="not-found__button">Back to homepage</a>
			</div>
    `;
  }

  getPageCode(): HTMLElement {
    this.setDOMStructure();
    return this.pageWrap;
  }
}