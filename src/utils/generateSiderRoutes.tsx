import { Link } from "react-router-dom";
import { TRoutes } from "../types/route.type";
import { TSiderItems } from "../types/sider.type";

function generateSiderRoutes(routes: TRoutes[]) {
  return routes?.reduce((state: TSiderItems[], route) => {
    if (route?.name && route?.path) {
      state.push({
        key: route?.path,
        label: <Link to={route?.path}>{route?.name}</Link>,
      });
    }
    if (route?.children?.length) {
      const children: TSiderItems["children"] = [];
      route?.children?.forEach((nestedMenuItems) => {
        children.push({
          key: route.path!,
          label: (
            <Link to={nestedMenuItems?.path as string}>
              {nestedMenuItems?.name}
            </Link>
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
