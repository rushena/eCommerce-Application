export class PageNotFound {
    private pageWrap: HTMLElement;

    constructor() {
        this.pageWrap = this.createWrap();
    }

    createWrap(): HTMLElement {
        const $page = document.createElement('div');
        $page.classList.add('not-found');

        return $page;
    }

    static renderPage() {

    }
}