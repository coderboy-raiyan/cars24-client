import adminRoutes from "../../../routes/admin.route";
import generateSiderComponents from "../../../utils/generateSIderComponents";
import generateSiderRoutes from "../../../utils/generateSiderRoutes";

function Sider() {
  const siderItems = generateSiderRoutes(adminRoutes);
  console.log(siderItems);
  return (
    <div className="drawer lg:drawer-open ">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu min-h-full w-64 p-4 bg-[#001529] !text-white pt-20 space-y-2">
          {/* Sidebar content here */}
          {generateSiderComponents(siderItems)}
        </ul>
      </div>
    </div>
  );
}

export default Sider;
