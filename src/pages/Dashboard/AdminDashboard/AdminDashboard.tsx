import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sider from "../components/Sider";

function AdminDashboard() {
  return (
    <div className="drawer bg-[#f5f5f5] h-screen">
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        {/* Navbar */}
        <Navbar />
        {/* Page content here */}
        <div className="bg-white rounded-lg  shadow p-10 m-5">
          <Outlet />
        </div>
      </div>
      <Sider />
    </div>
  );
}

export default AdminDashboard;
