import baseApi from "../api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (body) => {
        return {
          url: "/auth/login",
          method: "POST",
          body,
        };
      },
    }),
    registerRider: builder.mutation({
      query: (body) => {
        return {
          url: "/auth/register-rider",
          method: "POST",
          body,
        };
      },
    }),
    registerAdmin: builder.mutation({
      query: (body) => {
        return {
          url: "/auth/register-admin",
          method: "POST",
          body,
        };
      },
    }),
    getUserProfile: builder.query({
      query: () => {
        return {
          url: "/users/me",
          method: "GET",
        };
      },
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterAdminMutation,
  useRegisterRiderMutation,
  useGetUserProfileQuery,
} = authApi;
export default authApi;
