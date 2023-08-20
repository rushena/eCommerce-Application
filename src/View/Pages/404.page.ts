import '../../assets/css/404.css';
import pageImage from '../../assets/img/notFoundPageImage'
import {Router} from "../../Router/Router";

export class PageNotFound {
    private pageWrap: HTMLElement;

    constructor() {
        this.pageWrap = this.createWrap();
    }

    private createWrap = (): HTMLElement => {
        const $page = document.createElement('div');
        $page.classList.add('not-found');

        return $page;
    };

    private setDOMStructure(): void {
        this.pageWrap.innerHTML = `
            <div class="not-found__inner">
                <div class="not-found__image">${pageImage()}</div>
                <h1 class="not-found__title">Oh no. We lost this page</h1>
                <p class="not-found__text">We searched everywhere but couldn’t find what  you’re looking for. <br />Let’s find a better place for you to go.</p>
                <a href="/" class="not-found__button">Back to homepage</a>
            </div>
        `;

        document.addEventListener('click', function (e: Event) {
            const $button: HTMLElement | null = e.target.closest('.not-found__button');
            if ($button !== null) {
                e.preventDefault();
                Router.get('/')
            }
        });
    }

    getPageCode() {
        this.setDOMStructure();
        return this.pageWrap;
    }
}