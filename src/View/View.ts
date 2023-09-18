import { createFooter } from './components/footer';
import Header from './components/header';
import { PageNotFound } from './pages/404.page';
import { MainPage } from './pages/Main.page';
import createLoginPage from './pages/login';
import createRegistrationPage from './pages/registration';
import { doOnAuthSubmit } from '../Controller/login/doOnSubmit';
import { doOnRegistrationSubmit } from '../Controller/registration/doOnSubmit';
import { ProfilePageView } from './pages/Profile.page';
import { Catalog } from './pages/catalog';
import { AboutPage } from './pages/about.page';

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
  static readonly $aboutPage = new AboutPage().getElement();
  static $catalogPage = new Catalog();

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
    View.$mainContent.innerHTML = '';
    View.$mainContent.append(View.$mainPage);
  }

  static renderProfilePage() {
    /* const isAuthCustomer: boolean = Boolean(
      window.localStorage.getItem('check')
    ); */
    const isAuthCustomer = window.localStorage.getItem('check');

    if (isAuthCustomer !== 'true') {
      const link = document.createElement('a');
      link.setAttribute('href', '/user/authorization');
      link.click();
    } else {
      const $page = new ProfilePageView();

      View.$mainContent.innerHTML = '';
      View.$mainContent.append($page.getElement());
    }
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
    localStorage.setItem('check', 'false');
    header.loginElement = false;
    View.$mainContent.innerHTML = '';
    View.$mainContent.append(View.$mainPage);
  }

  static renderCatalog(queryParams?: URLSearchParams) {
    View.$mainContent.innerHTML = '';
    View.$mainContent.append(View.$catalogPage.getElement(queryParams));
  }

  static render404Page() {
    View.$mainContent.innerHTML = View.$notFound.outerHTML;
  }

  static renderAboutPage() {
    View.$mainContent.innerHTML = View.$notFound.outerHTML;
  }
}
