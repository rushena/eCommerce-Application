export function Router() {
    this.routes = {
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
    };

    this.get = function(url: string) {
        const routingPath = this.routes[url];

        if (routingPath) {
            this.simplePath(routingPath);
            window.history.pushState({}, routingPath.title, url);
        }
    }

    this.simplePath = function({title, renderFn}) {
        document.title = title;
        renderFn(title);
    }

    this.addRoute = function(path, title, cb) {
        this.routes[path] = {
            title,
            renderFn: cb
        };

        return this;
    }
}