import { Link } from "react-router-dom";
import generateSiderComponents from "../../../utils/generateSIderComponents";

export type TSiderItems = {
  key: string;
  label: JSX.Element;
  children?: {
    key: string;
    label: JSX.Element;
  }[];
};

const items: TSiderItems[] = [
  {
    key: "Nav-1",
    label: <Link to="">Nav 1</Link>,
  },
  {
    key: "Nav-2",
    label: <Link to="">Nav 2</Link>,
  },
  {
    key: "manage-cars",
    label: <Link to="">Manage Cars</Link>,
    children: [
      {
        key: "1",
        label: <Link to="/">Add Cars</Link>,
      },
    ],
  },
];

function Sider() {
  return (
    <div className="drawer lg:drawer-open ">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu min-h-full w-72 p-4 bg-[#001529] text-white">
          {/* Sidebar content here */}
          {generateSiderComponents(items)}
        </ul>
      </div>
    </div>
  );
}

export default Sider;
