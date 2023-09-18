import { View } from './View/View';
import { Routing } from './Router/Router';

interface IApp {
  routing: Routing;
  view: View;
  start: () => void;
}

export class App implements IApp {
  private readonly _routing: Routing = new Routing();
  private readonly _view: View = new View();

  get routing(): Routing {
    return this._routing;
  }

  get view(): View {
    return this._view;
  }

  start(): void {
    this.view.renderStartElements();

    this.routing.get(document.location.pathname, true, document.location.href);

    document.addEventListener('click', (e: Event): void => {
      const $link: HTMLElement | null = (e.target as HTMLElement).closest('a');
      if ($link === null) return;

      if ($link.classList.contains('without-routing')) return;

      e.preventDefault();

      const url: string | null = $link.getAttribute('href');

      if (url === '#' || !url) return;

      this.routing.get(url);
    });
  }
}
