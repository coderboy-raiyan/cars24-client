import baseApi from "../../../api/baseApi";

const ManageCarsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createCar: builder.mutation({
      query: (body) => {
        return {
          url: "/cars",
          method: "POST",
          body,
        };
      },
    }),
  }),
});

export const { useCreateCarMutation } = ManageCarsApi;
