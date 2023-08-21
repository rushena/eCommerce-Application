import { createFooter } from './components/footer';
import Header from './components/header';
import { PageNotFound } from './Pages/404.page';
import { MainPage } from './Pages/Main.page';
import createLoginPage from './Pages/login';
import createRegistrationPage from './Pages/registration';
import { doOnAuthSubmit } from '../Controller/login/doOnSubmit';
import { doOnRegistrationSubmit } from '../Controller/registration/doOnSubmit';

interface IView {
  renderStartElements: () => void;
}

export class View implements IView {
  private readonly $footer = createFooter();
  private header = Header.getInstance({ isLogged: false, cartItems: 0 });
  private readonly $header = this.header.element;

  static readonly $mainContent: HTMLElement = document.createElement('div');
  static readonly $notFound = new PageNotFound().getPageCode();
  static readonly $mainPage = new MainPage().getElement();
  static readonly $loginPage = createLoginPage();
  static readonly $RegistrationPage = createRegistrationPage();

  renderStartElements(): void {
    document.body.append(this.$header, View.$mainContent, this.$footer);
    this.header.addListeners();
  }

  static renderMainPage() {
    View.$mainContent.innerHTML = View.$mainPage;
  }

  static renderRegistrationPage() {
    View.$mainContent.append(View.$RegistrationPage);
    const formToSend = document.querySelector(
      '.registration-form'
    )! as HTMLFormElement;
    formToSend.addEventListener('submit', (event: SubmitEvent) =>
      doOnRegistrationSubmit(event)
    );
  }

  static renderLoginPage() {
    View.$mainContent.append(View.$loginPage);
    const formToSend = document.querySelector(
      '.login-form'
    )! as HTMLFormElement;
    formToSend.addEventListener('submit', (event: SubmitEvent) =>
      doOnAuthSubmit(event)
    );
  }

  static render404Page() {
    View.$mainContent.innerHTML = View.$notFound.outerHTML;
  }
}
