import { AiOutlineUser } from "react-icons/ai";
import { FaRegUserCircle, FaUserCircle } from "react-icons/fa";
import { FaCaretDown } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../redux/features/authSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";

function Header() {
  const { user, accessToken } = useAppSelector((auth) => auth?.auth);
  const dispatch = useAppDispatch();
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
          <div className="dropdown dropdown-hover w-full">
            <div tabIndex={0} className="btn m-1 flex-col">
              <FaUserCircle />
              <div>
                <p className="text-xs font-normal">
                  Hello, {accessToken ? user?.name : "Sign in"}
                </p>
                <p>
                  Accounts <FaCaretDown className="inline" />
                </p>
              </div>
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content menu bg-base-100 rounded-box z-[1] w-[350px] py-6 px-6 shadow right-24 top-20  !transition-all !duration-300"
            >
              {accessToken ? (
                <div className="bg-gray-100 p-4 space-y-4 rounded-md">
                  <Link
                    className="flex items-center space-x-1 py-2 border-b text-xs font-semibold text-gray-600"
                    to="dashboard"
                  >
                    <AiOutlineUser className="text-lg" />
                    <span>My Dashboard</span>
                  </Link>
                  <Link
                    className="flex items-center space-x-1 py-2 border-b text-xs font-semibold text-gray-600"
                    to="dashboard"
                  >
                    <FaRegUserCircle className="text-lg" />{" "}
                    <span>My Profile</span>
                  </Link>

                  <button
                    onClick={() => {
                      dispatch(logout());
                    }}
                    className="bg-btn-base rounded-lg text-white hover:bg-btn-base-hover uppercase font-semibold py-3 w-full"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <>
                  <button
                    onClick={() => {
                      navigate("/sign-in");
                    }}
                    className="bg-btn-base rounded-lg text-white hover:bg-btn-base-hover uppercase font-semibold py-3"
                  >
                    Log in/Sign up
                  </button>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
