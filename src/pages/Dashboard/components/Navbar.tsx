import { IoIosMenu } from "react-icons/io";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="navbar bg-white border-b shadow shadow-base-200 w-full ">
      <div className="flex-none lg:hidden">
        <label
          htmlFor="my-drawer-2"
          aria-label="open sidebar"
          className="btn btn-square btn-ghost text-4xl"
        >
          <IoIosMenu />
        </label>
      </div>
      <div className="mx-2 flex-1 px-2">
        <Link to="/">
          <img
            src="https://fastly-production.24c.in/cars24/seo/static/1_20230830_1693395013.png"
            alt=""
            className="w-[80px]"
          />
        </Link>
      </div>
      <div className="hidden flex-none lg:block">
        <ul className="menu menu-horizontal">
          {/* Navbar menu content here */}
          <li>
            <a>Navbar Item 1</a>
          </li>
          <li>
            <a>Navbar Item 2</a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
