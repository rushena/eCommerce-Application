import {Routing} from "../Router/Router";
import {createFooter} from './components/footer';
import {Header} from './components/header';
import {PageNotFound} from './pages/404.page';
import {MainPage} from "./pages/Main.page";
import createLoginPage from "./pages/login";
import createRegistrationPage from "./pages/registration";

interface IView {
  routing: Routing,
  setRouting: (Routing) => void,
  renderStartElements: () => void
}

export class View implements IView {

  static readonly $mainContent: HTMLElement = document.createElement('div');
  private routing!;
  private readonly $footer = createFooter();
  private readonly $header = new Header().element;
  private readonly $notFound = new PageNotFound().getPageCode();
  private readonly $mainPage = new MainPage().getElement();
  private readonly $loginPage = createLoginPage();
  private readonly $RegistrationPage = createRegistrationPage();

  setRouting(routing: Routing) {
    this.routing = routing;
  }

  renderStartElements(): void {
      document.body.append(this.$header, View.$mainContent, this.$footer);
  }

  static renderMainPage() {
    View.$mainContent.innerHTML = this.$mainPage;
  }

  static renderRegistrationPage() {
    View.$mainContent.innerHTML = this.$RegistrationPage;
  }

  static renderLoginPage() {
    View.$mainContent.innerHTML = this.$loginPage;
  }

  static render404Page() {
    View.$mainContent.innerHTML = this.$notFound;
  }
}