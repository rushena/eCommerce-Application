export type Route = {
  title: string;
  renderFn: (id?: string | number) => void;
  regEx?: RegExp;
};

export type Routes = {
  [key: string]: Route;
};
