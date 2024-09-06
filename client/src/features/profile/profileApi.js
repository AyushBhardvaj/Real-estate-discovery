import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const profileApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }),
  reducerPath: "profileAPI",
  tagTypes: [],
  endpoints: (build) => ({
    updateProfile: build.mutation({
      query: (body) => ({
        url: "/user/profile",
        method: "PUT",
        credentials: "include",
        body,
      }),
      providesTags: "",
    }),
    getUserListings: build.mutation({
      query: () => ({
        url: "/user/listings",
        method: "GET",
        credentials: "include",
      }),
      providesTags: "",
    }),
    deleteListing: build.mutation({
      query: (id) => ({
        url: `/user/listings/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
      providesTags: "",
    }),
  }),
});

export const { useUpdateProfileMutation, useGetUserListingsMutation, useDeleteListingMutation } =
  profileApi;
export { profileApi };
