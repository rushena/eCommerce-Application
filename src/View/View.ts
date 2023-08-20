import {Routing} from "../Router/Router";

interface IView {
  routing: Routing,
  setRouting: (Routing) => void,
  renderStartElements: () => void
}

export class View implements IView {

  static readonly $mainContent: HTMLElement = document.createElement('div');
  private routing!;

  setRouting(routing: Routing) {
    this.routing = routing;
  }

  renderStartElements(): void {
    const $header = document.createElement('div');
    $header.innerHTML = `
      <ul>
        <li><a href="/">Main</a></li>
        <li><a href="/user/authorization">authorization</a></li>
        <li><a href="/user/registration">registration</a></li>
        <li><a href="/notfound">Not found</a></li>
      </ul>
    `;

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