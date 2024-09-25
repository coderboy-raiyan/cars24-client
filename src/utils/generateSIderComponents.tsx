import { TSiderItems } from "../types/sider.type";

const generateSiderComponents = (items: TSiderItems[]) => {
  return items.map((item) => {
    if (item?.children?.length) {
      return (
        <li key={crypto.randomUUID()}>
          <details>
            <summary>{item?.key}</summary>
            <ul>
              {item?.children?.map((submenu) => (
                <li className="my-2" key={crypto.randomUUID()}>
                  {submenu?.label}
                </li>
              ))}
            </ul>
          </details>
        </li>
      );
    }
    return <li key={crypto.randomUUID()}>{item?.label}</li>;
  });
};

export default generateSiderComponents;
