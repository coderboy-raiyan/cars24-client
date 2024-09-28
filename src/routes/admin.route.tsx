import ManageBookings from "../pages/Dashboard/AdminDashboard/ManageBookings/ManageBookings";
import AddCars from "../pages/Dashboard/AdminDashboard/ManageCars/AddCars";
import ManageCars from "../pages/Dashboard/AdminDashboard/ManageCars/ManageCars";
import UpdateCar from "../pages/Dashboard/AdminDashboard/ManageCars/UpdateCar";

import { TRoutes } from "../types/route.type";

const adminRoutes: TRoutes[] = [
  {
    path: "cars/update/:id",
    element: <UpdateCar />,
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
        name: "Car Listing",
        path: "cars/manage-cars",
        element: <ManageCars />,
      },
      {
        name: "Add Cars",
        path: "cars/add-cars",
        element: <AddCars />,
      },
    ],
  },
];

export default adminRoutes;
