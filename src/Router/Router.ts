import { View } from '../View/View';
import { Route, Routes } from '../types/routing.types';

export class Routing {
  private readonly routes: Routes;

  constructor() {
    this.routes = this.setRoutes();

    window.addEventListener('popstate', (e: PopStateEvent): void => {
      e.preventDefault();
      this.get(document.location.pathname, false, document.location.href);
    });
  }

  setRoutes(): Routes {
    return {
      '/': {
        title: 'Main',
        renderFn: View.renderMainPage,
      },
      '/user/authorization': {
        title: 'Authorization',
        renderFn: View.renderLoginPage,
      },
      '/user/registration': {
        title: 'Registration',
        renderFn: View.renderRegistrationPage,
      },
      '/logout': {
        title: 'logout',
        renderFn: View.renderLogout,
      },
      '/user': {
        title: 'Account Information',
        renderFn: View.renderProfilePage,
      '/catalog': {
        title: 'catalog',
        renderFn: View.renderCatalog,
      },
    } as Routes;
  }

  get(url: string, writeInHistory: boolean = true, fullUrl?: string): void {
    const routingPath = this.routes[url];

    if (routingPath) {
      if (fullUrl && fullUrl.includes('?')) {
        document.title = routingPath.title;
        this.callWithQuery(
          url,
          new URLSearchParams(fullUrl.slice(fullUrl.indexOf('?')))
        );
      } else {
        this.staticPath(routingPath);
      }
    } else {
      this.combinePath(url);
    }

    if (writeInHistory) {
      if (!fullUrl || !fullUrl.includes('?')) {
        window.history.pushState({}, '', url);
      }
    }
  }

  staticPath({ title, renderFn }: Route): void {
    document.title = title;
    renderFn();
  }

  combinePath(url: string): void {
    const urlToArrSlice = url.split('/').slice(1);

    if (urlToArrSlice.length < 2) {
      this.render404();
      return;
    }

    const pathRoute = Object.values(this.routes).find((value) => {
      if (value.regEx) {
        return value.regEx.test(url);
      }
      return false;
    });

    if (pathRoute === undefined) {
      this.render404();
      return;
    }

    pathRoute.renderFn();
  }

  callWithQuery(page: string, queryParams: URLSearchParams): void {
    const routingPath = this.routes[page];
    routingPath.renderFn(queryParams);
  }

  render404(): void {
    View.render404Page();
  }

  static get(url: string) {
    const anchor = document.createElement('a');
    anchor.setAttribute('href', url);
    anchor.click();
  }
}
