import { FaUserCircle } from "react-icons/fa";
import { FaCaretDown } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  return (
    <header className="shadow py-2 sticky top-0 z-[999] bg-white">
      <nav className="flex justify-between max-w-7xl mx-auto items-center">
        {/* logo */}
        <div className="w-[80%] flex items-center space-x-4">
          <div className="flex-1">
            <Link to="/">
              <img
                src="https://fastly-production.24c.in/cars24/seo/static/1_20230830_1693395013.png"
                alt=""
                className="w-[80px]"
              />
            </Link>
          </div>
          {/* Menus */}
          <div className="flex-1">
            <ul className="flex space-x-6">
              <li className="hover:text-red-500 transition-all">
                <Link to="/about-us">About us</Link>
              </li>
              <li className="hover:text-red-500 transition-all">
                <Link to="/booking">Booking</Link>
              </li>
              <li className="hover:text-red-500 transition-all">
                <Link to="/contact-us">Contact us</Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Accounts and options */}
        <div className="w-[20%] flex justify-end">
          <div className="dropdown dropdown-hover w-2/3">
            <div tabIndex={0} className="btn m-1 flex-col">
              <FaUserCircle />
              <div>
                <p className="text-xs font-normal">Hello Sign in</p>
                <p>
                  Accounts <FaCaretDown className="inline" />
                </p>
              </div>
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content menu bg-base-100 rounded-box z-[1] w-[200px] p-4 shadow"
            >
              <li>
                <button
                  onClick={() => {
                    navigate("/sign-in");
                  }}
                  className="bg-btn-base w-full hover:bg-btn-base-hover text-white py-2 px-4 rounded text-sm font-semibold"
                >
                  Login/Sign up
                </button>
              </li>
              <li>
                <a>Item 2</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
