import { useEffect, useState } from "react";
import { UserConstants } from "../../../constant/user.constant";
import { useAppSelector } from "../../../redux/hooks";
import adminRoutes from "../../../routes/admin.route";
import riderRoutes from "../../../routes/rider.route";
import { TSiderItems } from "../../../types/sider.type";
import { TUser, TUserRole } from "../../../types/user.type";
import generateSiderComponents from "../../../utils/generateSIderComponents";
import generateSiderRoutes from "../../../utils/generateSiderRoutes";
import verifyJwt from "../../../utils/verifyJwt";

function Sider() {
  const { accessToken } = useAppSelector((auth) => auth?.auth);
  const [role, setRole] = useState<null | TUserRole>(null);
  const [siderItems, setSiderItems] = useState<TSiderItems[] | null>(null);

  useEffect(() => {
    if (accessToken) {
      const verifiedUser = verifyJwt(accessToken as string) as TUser;
      setRole(
        verifiedUser?.role === "superAdmin" ? "admin" : verifiedUser?.role
      );
    }
  }, [accessToken]);

  useEffect(() => {
    if (role) {
      switch (role) {
        case UserConstants.UserRoles.admin:
          setSiderItems(generateSiderRoutes(adminRoutes));
          break;
        case UserConstants.UserRoles.superAdmin:
          setSiderItems(generateSiderRoutes(adminRoutes));
          break;
        case UserConstants.UserRoles.rider:
          setSiderItems(generateSiderRoutes(riderRoutes));
          break;

        default:
          break;
      }
    }
  }, [role]);

  return (
    <div className="drawer lg:drawer-open ">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>

        <ul className="menu w-64 h-screen p-4 bg-[#001529] !text-white pt-20 space-y-2">
          {/* Sidebar content here */}
          {siderItems && generateSiderComponents(siderItems as TSiderItems[])}
        </ul>
      </div>
    </div>
  );
}

export default Sider;
