import baseApi from "../../api/baseApi";

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
  useCreateCarMutation,
  useUpdateCarMutation,
  useDeleteCarMutation,
  useReturnCarMutation,
} = ManageCarsApi;
