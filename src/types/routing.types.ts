export type Route = {
    title: string,
    renderFn: (id?: string | number) => null,
    regEx?: RegExp
}

export type Routes = {
    [key: string]: Route
}