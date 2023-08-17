import {View} from "../View/View";

export class Routing {
    private routes = {
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
            renderFn: View.renderLoginPage
        },
        '/404': {
            title: 'Page Not Found',
            renderFn: View.render404Page
        }
    };

    static get(url: string): void {
        const routingPath = this.routes[url];

        if (routingPath) {
            this.staticPath(routingPath);
            window.history.pushState({}, routingPath.title, document.location.href);
        } else {
            this.combinePath(url)
        }
    }

    static redirect(url: string): void {
        Routing.get(url);
    }

    static redirect404(): void {
        Routing.redirect('/404');
    }

    staticPath({title, renderFn}) {
        document.title = title;
        renderFn(title);
    }

    combinePath(url: string): void {
        const urlToArrSlice = url.split('/').slice(1);

        if (urlToArrSlice.length < 2) {
            Routing.redirect404();
            return;
        }

        const pathRoute = Object.values(this.routes).find((value) => {
            if (value.regEx) {
                return url.match(value.regEx) === url;
            }
            return false;
        });

        if (pathRoute === undefined) {
            Routing.redirect404();
            return;
        }

        pathRoute.renderFn();
    }
}