import { RouteObject } from "react-router-dom";
import { TRoutes } from "../types/route.type";

const generateRoutes = (routes: TRoutes[]) => {
  return routes?.reduce((state: RouteObject[], route) => {
    if (route?.children && route?.children?.length) {
      route?.children?.forEach((childRoutes) => {
        state.push({
          path: `${childRoutes?.path}`,
          element: childRoutes?.element,
        });
      });
    }
    if (route?.path && route?.name) {
      state.push({
        path: `${route?.path}`,
        element: route?.element,
      });
    }
    if (!route?.name && route?.path) {
      state.push({
        path: `${route?.path}`,
        element: route?.element,
      });
    }
    return state;
  }, []);
};

export default generateRoutes;
