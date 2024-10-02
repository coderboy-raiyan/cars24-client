import { TResponseRedux } from "../../../types/apiResponse.type";
import { TCar } from "../../../types/car.type";
import baseApi from "../../api/baseApi";

const CarsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllCars: builder.query({
      query: (queries: Record<string, string> | null) => {
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
    getFeaturedCars: builder.query({
      query: () => {
        return {
          url: "/cars/featured",
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
    getSingleCarUsingSlug: builder.query({
      query: (slug: string) => {
        const params = new URLSearchParams();

        if (slug) {
          params.append("slug", slug);
        }

        return {
          url: `/cars`,
          method: "GET",
          params,
        };
      },
      transformResponse: (response: TResponseRedux<TCar[]>) => {
        return {
          data: response?.data,
          message: response?.message,
        };
      },
    }),
  }),
});

export const {
  useGetAllCarsQuery,
  useGetSingleCarQuery,
  useGetFeaturedCarsQuery,
  useGetSingleCarUsingSlugQuery,
} = CarsApi;
