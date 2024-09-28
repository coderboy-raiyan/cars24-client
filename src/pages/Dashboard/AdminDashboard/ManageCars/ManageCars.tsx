import { MouseEvent } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import Loader from "../../../../components/Loader/Loader";
import {
  useDeleteCarMutation,
  useGetAllCarsQuery,
} from "../../../../redux/features/admin/ManageCars/ManageCars.api";

function ManageCars() {
  const [deleteCar, { isLoading }] = useDeleteCarMutation();
  const { data, isFetching } = useGetAllCarsQuery(null, {
    refetchOnMountOrArgChange: isLoading,
  });

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
                        className="p-1 flex-1 text-center text-xs  border shadow bg-gray-100  rounded-full"
                      >
                        {feature}
                      </p>
                    ))}
                  </div>
                </td>
                <td>{car?.carType}</td>
                <td>{car?.isElectric ? <span>Yes</span> : <span>No</span>}</td>
                <td className="space-x-2 flex">
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
