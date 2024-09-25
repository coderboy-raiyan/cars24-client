import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sider from "../components/Sider";

function AdminDashboard() {
  return (
    <div className="drawer">
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        {/* Navbar */}
        <Navbar />
        {/* Page content here */}
        <Outlet />
      </div>
      <Sider />
    </div>
  );
}

export default AdminDashboard;
