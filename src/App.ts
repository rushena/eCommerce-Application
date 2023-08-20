import {View} from "./View/View";
import {Routing} from "./Router/Router";

export class App {
    private readonly view: View = new View();

    start() {
        this.view.renderStartElements();
        Routing.get(document.location.pathname);
    }
}