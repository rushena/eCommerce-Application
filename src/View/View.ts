import { createFooter } from './components/footer';
import Header from './components/header';
import { PageNotFound } from './Pages/404.page';
import { MainPage } from './Pages/Main.page';
import createLoginPage from './Pages/login';
import createRegistrationPage from './Pages/registration';

interface IView {
  renderStartElements: () => void;
}

export class View implements IView {
  private readonly $footer = createFooter();
  private readonly $header = new Header().element;

  static readonly $mainContent: HTMLElement = document.createElement('div');
  static readonly $notFound = new PageNotFound().getPageCode();
  static readonly $mainPage = new MainPage().getElement();
  static readonly $loginPage = createLoginPage();
  static readonly $RegistrationPage = createRegistrationPage();

  renderStartElements(): void {
    document.body.append(this.$header, View.$mainContent, this.$footer);
  }

  static renderMainPage() {
    View.$mainContent.innerHTML = ''
    View.$mainContent.append(View.$mainPage);
  }

  static renderRegistrationPage() {
    View.$mainContent.innerHTML = View.$RegistrationPage.outerHTML;
  }

  static renderLoginPage() {
    View.$mainContent.innerHTML = View.$loginPage.outerHTML;
  }

  static render404Page() {
    View.$mainContent.innerHTML = View.$notFound.outerHTML;
  }
}