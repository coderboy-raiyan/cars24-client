export type TSiderItems = {
  key: string;
  label: JSX.Element | string;
  children?: {
    key: string;
    label: JSX.Element;
  }[];
};
