import { NavLink } from "react-router-dom";
import { TRoutes } from "../types/route.type";
import { TSiderItems } from "../types/sider.type";

function generateSiderRoutes(routes: TRoutes[]) {
  return routes?.reduce((state: TSiderItems[], route) => {
    if (route?.name && route?.path) {
      state.push({
        key: route?.path,
        label: (
          <NavLink
            className={({ isActive }) =>
              `${
                isActive ? "bg-[#1677ff]" : "text-white"
              } focus:text-white focus:bg-[#1677ff] hover:bg-gray-700`
            }
            to={route?.path}
          >
            {route?.name}
          </NavLink>
        ),
      });
    }
    if (route?.children?.length) {
      const children: TSiderItems["children"] = [];
      route?.children?.forEach((nestedMenuItems) => {
        children.push({
          key: route.path!,
          label: (
            <NavLink
              className={({ isActive }) =>
                `${
                  isActive ? "bg-[#1677ff]" : "text-white"
                } focus:text-white focus:bg-[#1677ff] hover:bg-gray-700`
              }
              to={nestedMenuItems?.path as string}
            >
              {nestedMenuItems?.name}
            </NavLink>
          ),
        });
      });

      state?.push({
        key: route.name!,
        label: route.name!,
        children,
      });
    }
    return state;
  }, []);
}

export default generateSiderRoutes;
