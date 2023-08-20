import {View} from "./View/View";
import {Routing} from "./Router/Router";

export class App {
    private readonly routing: Routing = new Routing();
    private readonly view: View = new View();

    start() {
        this.view.setRouting(this.routing);
        this.view.renderStartElements();

        this.routing.get(document.location.pathname);
    }
}