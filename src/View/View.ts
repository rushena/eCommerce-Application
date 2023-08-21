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
  static readonly $mainContent: HTMLElement = document.createElement('div');
  static readonly $notFound = new PageNotFound().getPageCode();
  static readonly $mainPage = new MainPage().getElement();
  static readonly $loginPage = createLoginPage();
  static readonly $RegistrationPage = createRegistrationPage();

  renderStartElements(): void {
    const check = localStorage.getItem('check') === 'true';
    let option: { isLogged: boolean; cartItems: number };
    if (check === null) {
      option = { isLogged: true, cartItems: 0 };
    } else {
      option = { isLogged: check, cartItems: 0 };
    }
    const header = Header.getInstance(option);

    document.body.append(header.element, View.$mainContent, this.$footer);
    header.addListeners();
  }

  static renderMainPage() {
    View.$mainContent.innerHTML = ''
    View.$mainContent.append(View.$mainPage);
  }

  static renderRegistrationPage() {
    View.$mainContent.innerHTML = '';
    View.$mainContent.append(View.$RegistrationPage);
    const formToSend = document.querySelector(
      '.registration-form'
    )! as HTMLFormElement;
    formToSend.addEventListener('submit', (event: SubmitEvent) =>
      doOnRegistrationSubmit(event)
    );
  }

  static renderLoginPage() {
    View.$mainContent.innerHTML = '';
    View.$mainContent.append(View.$loginPage);
    const formToSend = document.querySelector(
      '.login-form'
    )! as HTMLFormElement;
    formToSend.addEventListener('submit', (event: SubmitEvent) =>
      doOnAuthSubmit(event)
    );
  }

  static renderLogout() {
    const header = Header.getInstance();
    header.loginElement = false;
    View.$mainContent.innerHTML = View.$mainPage;
  }

  static render404Page() {
    View.$mainContent.innerHTML = View.$notFound.outerHTML;
  }
}