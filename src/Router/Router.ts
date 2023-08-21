import { View } from '../View/View';
import { Route, Routes } from '../types/routing.types';

export class Routing {
  private readonly routes: Routes;

  constructor() {
    this.routes = this.setRoutes();

    window.addEventListener('popstate', (e: PopStateEvent): void => {
      e.preventDefault();
      this.get(document.location.pathname, false);
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
    } as Routes;
  }

  get(url: string, writeInHistory: boolean = true): void {
    console.log(window.history);
    const routingPath = this.routes[url];

    if (routingPath) {
      this.staticPath(routingPath);
    } else {
      this.combinePath(url);
    }

    if (writeInHistory) {
      window.history.pushState({}, '', url);
    }
  }

  staticPath({ title, renderFn }: Route): void {
    document.title = title;
    renderFn(title);
  }

  combinePath(url: string): void {
    const urlToArrSlice = url.split('/').slice(1);

    if (urlToArrSlice.length < 2) {
      this.render404();
      return;
    }

    const pathRoute = Object.values(this.routes).find((value) => {
      if (value.regEx) {
        return url.match(value.regEx) === url;
      }
      return false;
    });

    if (pathRoute === undefined) {
      this.render404();
      return;
    }

    pathRoute.renderFn();
  }

  render404(): void {
    View.render404Page();
  }
}
