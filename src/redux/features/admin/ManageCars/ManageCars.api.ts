import { TResponseRedux } from "../../../../types/apiResponse.type";
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
    }),
    getAllCars: builder.query({
      query: () => {
        return {
          url: "/cars",
          method: "GET",
        };
      },
      transformResponse: (response: TResponseRedux<TCar[]>) => {
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
    }),
    deleteCar: builder.mutation({
      query: (id: string) => {
        return {
          url: `/cars/${id}`,
          method: "DELETE",
        };
      },
    }),
  }),
});

export const {
  useGetAllCarsQuery,
  useCreateCarMutation,
  useGetSingleCarQuery,
  useUpdateCarMutation,
  useDeleteCarMutation,
} = ManageCarsApi;
