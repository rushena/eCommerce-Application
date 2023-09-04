export type Route = {
  title: string;
  renderFn: (queryParams?: URLSearchParams) => void;
  regEx?: RegExp;
};

export type Routes = {
  [key: string]: Route;
};
