import {Route} from "../types/routing.types";

export class Routing {
    private routes = {
        '/': {
            title: 'Main',
            renderFn: window.alert
        },
        '/user/authorization': {
            title: 'Authorization',
            renderFn: window.alert
        },
        '/user/registration': {
            title: 'Registration',
            renderFn: window.alert
        },
        '/folder/{name}': {
            title: 'Category',
            renderFn: window.alert,
            regEx: /^\/folder\/(\w+)$/g,
        },
        '/product/{name}': {
            title: 'Product',
            regEx: /^\/product\/(\w+)$/g,
            renderFn: window.alert
        },
        '/404': {
            title: 'Page Not Found',
            renderFn: window.alert,
        }
    };

    get(url: string): void {
        const routingPath = this.routes[url];

        if (routingPath) {
            this.staticPath(routingPath);
            window.history.pushState({}, routingPath.title, document.location.href);
        } else {
            this.combinePath(url)
        }
    }

    staticPath({title, renderFn}) {
        document.title = title;
        renderFn(title);
    }

    combinePath(url: string, key: string | number | null = null): void {
        const urlToArrSlice = url.split('/').slice(1);

        if (urlToArrSlice.length < 2) {
            this.redirect404();
            return;
        }

        const pathRoute = Object.values(this.routes).find((value) => {
            if (value.regEx) {
                return url.match(value.regEx) === url;
            }
            return false;
        });

        if (pathRoute === undefined) {
            this.redirect404();
            return;
        }

        pathRoute.renderFn(key);

    }

    static redirect(url: string): void {
        this.get(url);
    }

    redirect404(): void {
        Routing.redirect('/404');
    }
}