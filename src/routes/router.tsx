import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import ProtectedRoute from "../layouts/ProtectedRoute";
import SignIn from "../pages/Auth/SignIn";
import SignUp from "../pages/Auth/SignUp";
import Cars from "../pages/cars/Cars";
import AdminDashboard from "../pages/Dashboard/AdminDashboard/AdminDashboard";
import RiderDashboard from "../pages/Dashboard/RiderDashboard/RiderDashboard";
import Home from "../pages/Home/Home";
import generateRoutes from "../utils/generateRoutes";
import adminRoutes from "./admin.route";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/sign-in",
        element: <SignIn />,
      },
      {
        path: "/sign-up",
        element: <SignUp />,
      },
      {
        path: "/cars",
        element: <Cars />,
      },
    ],
  },
  {
    path: "/admin/dashboard",
    element: (
      <ProtectedRoute requiredRoles={["admin", "superAdmin"]}>
        <AdminDashboard />
      </ProtectedRoute>
    ),
    children: generateRoutes(adminRoutes),
  },
  {
    path: "/rider/dashboard",
    element: (
      <ProtectedRoute requiredRoles={["rider"]}>
        <RiderDashboard />
      </ProtectedRoute>
    ),
    children: [],
  },
]);

export default router;
