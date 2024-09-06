import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const authApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }),
  reducerPath: "authAPI",
  tagTypes: [],
  endpoints: (build) => ({
    loginUser: build.mutation({
      query: (body) => ({
        url: "/auth/login",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body,
      }),
    }),
    registerUser: build.mutation({
      query: (body) => ({
        url: "/auth/signup",
        method: "POST",
        credentials: "include",
        body,
      }),
    }),
    googleLogin: build.mutation({
      query: ({ googleCode }) => ({
        url: `/auth/google`,
        method: "GET",
        credentials: "include",
        params: { code: googleCode },
      }),
    }),
    logoutUser: build.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }),
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useLogoutUserMutation,
  useGoogleLoginMutation,
} = authApi;
export { authApi };
