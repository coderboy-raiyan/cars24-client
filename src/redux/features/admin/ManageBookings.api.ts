import { TResponseRedux } from "../../../types/apiResponse.type";
import { TBooking } from "../../../types/booking.type";
import baseApi from "../../api/baseApi";

const ManageBookingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllBookings: builder.query({
      query: (queries: Record<string, string> | null) => {
        const params = new URLSearchParams();

        if (queries && Object.values(queries)?.length) {
          Object.entries(queries).map(([key, val]) => {
            params.append(key, val);
          });
        }

        return {
          url: "/bookings",
          method: "GET",
          params,
        };
      },
      providesTags: ["bookings"],
      transformResponse: (response: TResponseRedux<TBooking[]>) => {
        return {
          data: response?.data,
          message: response?.message,
        };
      },
    }),

    updateBooking: builder.mutation({
      query: (data) => {
        return {
          url: `/bookings/${data?.id}`,
          method: "PATCH",
          body: data?.data,
        };
      },
      invalidatesTags: ["bookings"],
    }),
  }),
});

export const { useGetAllBookingsQuery, useUpdateBookingMutation } =
  ManageBookingApi;
