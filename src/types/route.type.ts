export type TRoutes = {
  path?: string;
  name?: string;
  element?: JSX.Element;
  children?: {
    path?: string;
    name?: string;
    element: JSX.Element;
  }[];
};
