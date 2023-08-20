export class View {

    private readonly $mainContent: HTMLElement = document.createElement('main');

    renderStartElements() {
        const $header = document.createElement('div');
        $header.innerText = 'Header';
        const $footer = document.createElement('div');
        $footer.innerText = 'Footer';

        const $app = document.querySelector('#app');
        if ($app) {
            $app.append($header, this.$mainContent, $footer);
        }
    }

    static renderMainPage() {

    }

    static renderRegistrationPage() {

    }

    static renderLoginPage() {

    }

    static render404Page() {

    }
}