import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const listingApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }),
  reducerPath: "listingAPI",
  tagTypes: [],
  endpoints: (build) => ({
    createListing: build.mutation({
      query: (body) => ({
        url: "/listing",
        method: "POST",
        credentials: "include",
        body,
      }),
      providesTags: "",
    }),
    updateListing: build.mutation({
      query: ({ id, body }) => ({
        url: `/listing/${id}`,
        method: "PUT",
        credentials: "include",
        body,
      }),
      providesTags: "",
    }),
  }),
});

export const { useCreateListingMutation, useUpdateListingMutation } =
  listingApi;
export { listingApi };
