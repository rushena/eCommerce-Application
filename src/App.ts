import {View} from "./View/View";
import {Routing} from "./Router/Router";

interface IApp {
  routing: Routing,
  view: View,
  start: () => void
}

export class App implements IApp {
  private readonly routing: Routing = new Routing();
  private readonly view: View = new View();

  start(): void {
    this.view.setRouting(this.routing);
    this.view.renderStartElements();

    this.routing.get(document.location.pathname);

    document.addEventListener('click', (e: Event): void => {
      const $link: HTMLElement | null = (e.target as HTMLElement).closest('a');
      if (!$link) return;

      e.preventDefault();

      const url: string = $link.getAttribute('href');

      if (url === '#' || !url) return;

      this.routing.get(url);
    })
  }
}