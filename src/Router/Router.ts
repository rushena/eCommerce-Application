import {View} from "../View/View";

export class Routing {
    readonly routes = {
        '/': {
            title: 'Main',
            renderFn: View.renderMainPage
        },
        '/user/authorization': {
            title: 'Authorization',
            renderFn: View.renderLoginPage
        },
        '/user/registration': {
            title: 'Registration',
            renderFn: View.renderRegistrationPage
        },
        '/404': {
            title: 'Page Not Found',
            renderFn: View.render404Page
        }
    };

    constructor() {
        window.addEventListener('popstate', () => {
            console.log(window.history);
            this.get(document.location.pathname, false);
        })
    }

    get(url: string, writeInHistory = true): void {
        const routingPath = this.routes[url];

        if (routingPath) {
            this.staticPath(routingPath);

        } else {
            this.combinePath(url)
        }

        if (writeInHistory) {
            window.history.pushState({}, '', url);
        }
    }

    staticPath({title, renderFn}) {
        document.title = title;
        renderFn(title);
    }

    combinePath(url: string): void {
        const urlToArrSlice = url.split('/').slice(1);

        if (urlToArrSlice.length < 2) {
            this.get('/404');
            return;
        }

        const pathRoute = Object.values(this.routes).find((value) => {
            if (value.regEx) {
                return url.match(value.regEx) === url;
            }
            return false;
        });

        if (pathRoute === undefined) {
            this.get('/404');
            return;
        }

        pathRoute.renderFn();
    }
}