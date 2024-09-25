import ManageBookings from "../pages/Dashboard/AdminDashboard/ManageBookings/ManageBookings";
import RiderDashboard from "../pages/Dashboard/RiderDashboard/RiderDashboard";
import { TRoutes } from "../types/route.type";

const adminRoutes: TRoutes[] = [
  {
    path: ":id",
    element: <RiderDashboard />,
  },
  {
    name: "Bookings",
    path: "bookings",
    element: <ManageBookings />,
  },
  {
    name: "Manage Cars",
    children: [
      {
        name: "Add Cars",
        path: "add-cars",
        element: <RiderDashboard />,
      },
    ],
  },
];

export default adminRoutes;
