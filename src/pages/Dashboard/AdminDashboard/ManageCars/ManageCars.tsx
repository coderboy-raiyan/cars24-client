import { MouseEvent, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import Loader from "../../../../components/Loader/Loader";
import {
  useDeleteCarMutation,
  useGetAllCarsQuery,
} from "../../../../redux/features/admin/ManageCars/ManageCars.api";

function ManageCars() {
  const [deleteCar] = useDeleteCarMutation();
  const [status, setStatus] = useState("available");
  const { data, isFetching } = useGetAllCarsQuery({ status });

  const handleDeleteCar = (e: MouseEvent<HTMLButtonElement>, id: string) => {
    e.stopPropagation();
    Swal.fire({
      title: "Do you want to delete this Car?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Yes",
      denyButtonText: `No`,
    }).then(async () => {
      e.stopPropagation();

      try {
        await deleteCar(id);
        toast.success("Image has been deleted Successfully!", {
          className: "text-sm",
        });
      } catch (error) {
        console.log(error);
      }

      Swal.fire("Done!", "", "success");
    });
  };

  return (
    <div className="overflow-x-auto h-[500px] overflow-y-scroll">
      <div>
        <p className="text-sm font-semibold text-gray-600 my-2">
          Select car status
        </p>
        <select
          onChange={(e) => setStatus(e.target.value)}
          className="select select-bordered w-full max-w-xs"
        >
          <option value="available">Available</option>
          <option value="unavailable">Booked</option>
        </select>
      </div>
      <table className="table table-zebra">
        {/* head */}
        <thead>
          <tr className="text-center">
            <th></th>
            <th>Name</th>
            <th>Price Per Hour</th>
            <th>Features</th>
            <th>Car type</th>
            <th>Electric</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        {isFetching ? (
          <tbody>
            <tr>
              <td>
                <Loader />
              </td>
            </tr>
          </tbody>
        ) : (
          <tbody>
            {/* row 1 */}
            {data?.data?.map((car, i) => (
              <tr key={car?.slug}>
                <th>{i + 1}</th>
                <td>{car?.name}</td>
                <td>{car?.pricePerHour}</td>
                <td>
                  <div
                    key={i}
                    className="flex space-x-2 items-center w-2/3 flex-wrap h-[50px] overflow-y-scroll"
                  >
                    {car?.features?.map((feature, i) => (
                      <p
                        key={i}
                        className="p-2 flex-1 text-center text-xs  border shadow bg-gray-100  rounded-full leading-tight"
                      >
                        {feature}
                      </p>
                    ))}
                  </div>
                </td>
                <td>{car?.carType}</td>
                <td>{car?.isElectric ? <span>Yes</span> : <span>No</span>}</td>
                <td>
                  {car?.status === "available" ? (
                    <span className="bg-green-600 text-xs p-1 text-white rounded-lg font-semibold">
                      Available
                    </span>
                  ) : (
                    <span className="bg-yellow-600 text-xs p-1 text-white rounded-lg font-semibold">
                      Booked
                    </span>
                  )}
                </td>
                <td className="space-x-2 flex items-center justify-center py-5">
                  <button
                    onClick={(e) => handleDeleteCar(e, car?._id)}
                    className="bg-red-500 text-xs py-2 px-3 text-white rounded-lg font-semibold"
                  >
                    Delete
                  </button>

                  <Link to={`/admin/dashboard/cars/update/${car?._id}`}>
                    <button className="bg-green-600 text-xs py-2 px-3 text-white rounded-lg font-semibold">
                      Edit
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        )}
      </table>
    </div>
  );
}

export default ManageCars;
