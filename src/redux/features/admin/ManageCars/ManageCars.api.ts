import { TResponseRedux } from "../../../../types/apiResponse.type";
import { TBooking } from "../../../../types/booking.type";
import { TCar } from "../../../../types/car.type";
import baseApi from "../../../api/baseApi";

const ManageCarsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createCar: builder.mutation({
      query: (body) => {
        return {
          url: "/cars/create-car",
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["cars"],
    }),
    getAllCars: builder.query({
      query: (queries: Record<string, string>) => {
        const params = new URLSearchParams();

        if (queries && Object.values(queries)?.length) {
          Object.entries(queries).map(([key, val]) => {
            params.append(key, val);
          });
        }

        return {
          url: "/cars",
          method: "GET",
          params,
        };
      },
      providesTags: ["cars"],
      transformResponse: (response: TResponseRedux<TCar[]>) => {
        return {
          data: response?.data,
          message: response?.message,
        };
      },
    }),
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
    getSingleCar: builder.query({
      query: (id: string) => {
        return {
          url: `/cars/${id}`,
          method: "GET",
        };
      },
      transformResponse: (response: TResponseRedux<TCar>) => {
        return {
          data: response?.data,
          message: response?.message,
        };
      },
    }),
    updateCar: builder.mutation({
      query: (data) => {
        return {
          url: `/cars/${data?.id}`,
          method: "PATCH",
          body: data?.data,
        };
      },
      invalidatesTags: ["cars"],
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
    returnCar: builder.mutation({
      query: (data) => {
        return {
          url: `/cars/return`,
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: ["cars", "bookings"],
    }),
    deleteCar: builder.mutation({
      query: (id: string) => {
        return {
          url: `/cars/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["cars"],
    }),
  }),
});

export const {
  useGetAllCarsQuery,
  useCreateCarMutation,
  useGetSingleCarQuery,
  useUpdateCarMutation,
  useDeleteCarMutation,
  useGetAllBookingsQuery,
  useReturnCarMutation,
  useUpdateBookingMutation,
} = ManageCarsApi;
