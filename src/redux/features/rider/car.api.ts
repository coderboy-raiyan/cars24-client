import { TResponseRedux } from "../../../types/apiResponse.type";
import { TCar } from "../../../types/car.type";
import baseApi from "../../api/baseApi";

const CarsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
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
  }),
});

export const { useGetAllCarsQuery, useGetSingleCarQuery } = CarsApi;
