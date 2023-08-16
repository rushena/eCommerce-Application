export function Router() {
    this.routes = {
        '/': {
            title: 'Main',
            renderFn: alert
        },
        '/user/authorization': {
            title: 'Authorization',
            renderFn: alert
        },
        '/user/registration': {
            title: 'Registration',
            renderFn: alert
        },
    };

    this.get = function(url: string) {
        console.log(url);
    }

    this.addRoute = function(path, title, cb) {
        this.routes[path] = {
            title,
            renderFn: cb
        };

        return this;
    }
}