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
    }),
  }),
});

export const { useCreateCarMutation } = ManageCarsApi;
