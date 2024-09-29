import { format } from "date-fns";
import { MouseEvent } from "react";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import Loader from "../../../../components/Loader/Loader";
import { BookingConstants } from "../../../../constant/booking.constant";
import {
  useGetAllBookingsQuery,
  useReturnCarMutation,
  useUpdateBookingMutation,
} from "../../../../redux/features/admin/ManageCars/ManageCars.api";
import { TBooking } from "../../../../types/booking.type";
import convertStringToDateAndTime from "../../../../utils/convertStringToDateAndTime";

function ManageBookings() {
  const [returnCar, { isLoading: rLoading }] = useReturnCarMutation();
  const [updateBooking, { isLoading: bLoading }] = useUpdateBookingMutation();
  const { data, isFetching } = useGetAllBookingsQuery(null, {});

  const handleReturnCar = (
    e: MouseEvent<HTMLButtonElement>,
    booking: TBooking
  ) => {
    e.stopPropagation();
    Swal.fire({
      title: "Do you want to return this Car?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Yes",
      denyButtonText: `No`,
    }).then(async (result) => {
      e.stopPropagation();

      if (result.isConfirmed) {
        try {
          await returnCar({
            bookingId: booking._id,
            endTime: format(new Date(), "HH:mm"),
          });

          toast.success("Car has been returned Successfully!", {
            className: "text-sm",
          });
        } catch (error) {
          console.log(error);
        }
      }

      Swal.fire("Done!", "", "success");
    });
  };

  const handleUpdateBookingStatus = async (
    e: MouseEvent<HTMLButtonElement>,
    booking: TBooking,
    status: string
  ) => {
    e.stopPropagation();
    Swal.fire({
      title: "Do you want to update this Booking Status?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Yes",
      denyButtonText: `No`,
    }).then(async (result) => {
      e.stopPropagation();

      if (result.isConfirmed) {
        try {
          await updateBooking({
            id: booking?._id,
            data: { status },
          });

          toast.success("Booking updated Successfully!", {
            className: "text-sm",
          });
        } catch (error) {
          console.log(error);
        }
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
            <th>Car name</th>
            <th>Start Date and time</th>
            <th>Booking Status</th>
            <th>Payment Status</th>
            <th>Total Cost</th>
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
            {data?.data?.map((booking, i) => (
              <tr key={booking?._id}>
                <th>{i + 1}</th>
                <td>{booking?.car?.name}</td>
                <td>
                  {convertStringToDateAndTime(
                    booking?.date as string,
                    booking?.startTime as string
                  )}
                </td>
                <td>
                  {booking?.status === "completed" ? (
                    <span className="bg-green-500 p-1 rounded-xl capitalize text-xs font-semibold text-white">
                      {booking?.status}
                    </span>
                  ) : (
                    <span className="bg-gray-100 py-1 px-2 capitalize rounded-xl text-xs font-semibold text-gray-900">
                      {booking?.status}
                    </span>
                  )}
                </td>
                <td>
                  {booking?.paymentStatus === "completed" ? (
                    <span className="bg-green-500 p-1 rounded-xl capitalize text-xs font-semibold text-white">
                      {booking?.paymentStatus}
                    </span>
                  ) : (
                    <span className="bg-gray-100 py-1 px-2 capitalize rounded-xl text-xs font-semibold text-gray-900">
                      {booking?.paymentStatus}
                    </span>
                  )}
                </td>
                <td>{booking?.totalCoast || "N/A"}</td>

                <td className="space-x-2 flex items-center justify-center py-5">
                  <button
                    disabled={
                      booking?.status === "completed" ||
                      booking?.status === "approved" ||
                      bLoading
                    }
                    onClick={(e) =>
                      handleUpdateBookingStatus(
                        e,
                        booking,
                        BookingConstants.BookingStatus.approved
                      )
                    }
                    className="bg-cyan-600 text-xs py-2 disabled:bg-opacity-40 px-3 text-white rounded-lg font-semibold"
                  >
                    Approve
                  </button>
                  <button
                    disabled={
                      booking?.status === "completed" ||
                      booking?.status === "canceled" ||
                      bLoading
                    }
                    onClick={(e) =>
                      handleUpdateBookingStatus(
                        e,
                        booking,
                        BookingConstants.BookingStatus.canceled
                      )
                    }
                    className="bg-cyan-600 disabled:bg-opacity-40 text-xs py-2 px-3 text-white rounded-lg font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={(e) => handleReturnCar(e, booking)}
                    disabled={
                      booking?.status === "completed" ||
                      booking?.status === "canceled" ||
                      rLoading
                    }
                    className="bg-red-500 disabled:bg-opacity-40 text-xs py-2 px-3 text-white rounded-lg font-semibold"
                  >
                    Return
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        )}
      </table>
    </div>
  );
}

export default ManageBookings;
