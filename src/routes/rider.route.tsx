import ManageBookings from "../pages/Dashboard/AdminDashboard/ManageBookings/ManageBookings";
import AddCars from "../pages/Dashboard/AdminDashboard/ManageCars/AddCars";
import RiderDashboard from "../pages/Dashboard/RiderDashboard/RiderDashboard";
import { TRoutes } from "../types/route.type";

const riderRoutes: TRoutes[] = [
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
        path: "cars/add-cars",
        element: <AddCars />,
      },
    ],
  },
];

export default riderRoutes;
