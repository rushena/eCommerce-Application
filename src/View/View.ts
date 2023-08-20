import {Routing} from "../Router/Router";

export class View {

    static readonly $mainContent: HTMLElement = document.createElement('main');
    private routing!;

    setRouting(routing: Routing) {
        this.routing = routing;
    }

    renderStartElements() {
        const $header = document.createElement('div');
        $header.innerHTML = `
            <ul>
                <li><a href="/">Main</a></li>
                <li><a href="/user/authorization">authorization</a></li>
                <li><a href="/user/registration">registration</a></li>
            </ul>
        `;

        $header.addEventListener('click', (e) => {
            const link: HTMLElement | null = e.target.closest('a');

            if (link) {
                e.preventDefault();
                this.routing.get(link.getAttribute('href'));
            }
        })
        const $footer = document.createElement('div');
        $footer.innerText = 'Footer';

        const $app = document.querySelector('#app');
        if ($app) {
            $app.append($header, View.$mainContent, $footer);
        }
    }

    static renderMainPage() {
        View.$mainContent.innerHTML = 'Main Content';
    }

    static renderRegistrationPage() {
        View.$mainContent.innerHTML = 'Registration Content';
    }

    static renderLoginPage() {
        View.$mainContent.innerHTML = 'Login Content';
    }

    static render404Page() {
        View.$mainContent.innerHTML = '404 Content';
    }
}