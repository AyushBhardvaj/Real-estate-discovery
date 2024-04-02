import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const authApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }),
  reducerPath: "authAPI",
  tagTypes: [],
  endpoints: (build) => ({
    loginUser: build.mutation({
      query: (body) => ({
        url: "/login",
        method: "POST",
        credentials: "include",
        body,
      }),
    }),
    registerUser: build.mutation({
      query: (body) => ({
        url: "/register",
        method: "POST",
        body,
      }),
    }),
    logoutUser: build.mutation({
      query: () => ({
        url: "/logout",
        method: "POST",
        credentials: "include",
      }),
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useLogoutUserMutation,
} = authApi;
export { authApi };
