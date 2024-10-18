import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApiSlice = createApi({
  reducerPath: "users",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
    // baseUrl: "http://localhost:8000/api",
    // baseUrl: "https://job-board-gzcc.onrender.com/api",
  }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    createUser: builder.mutation({
      query: (data) => ({
        url: "/users/register",
        method: "post",
        body: data,
      }),
    }),
    logoutUser: builder.mutation({
      query: () => ({
        url: "/users/logOut",
        method: "get",
        credentials: "include",
      }),
    }),

    validateToken: builder.mutation({
      query: () => ({
        url: "/users/validateToken",
        method: "get",
        credentials: "include",
      }),
    }),
    getUserData: builder.query({
      query: () => ({
        url: "/users/getUser",
        method: "get",
        credentials: "include",
      }),
      providesTags: ["User"],
    }),
    updateUser: builder.mutation({
      query: (data) => ({
        url: "/users/updateUser",
        method: "PATCH",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["User"],
    }),
    getUsers: builder.query({
      query: ({ query }) => ({
        url: `/users/getUsers?${query}`,
        method: "get",
        // body: filterData,
      }),
    }),

    getUserCv: builder.mutation({
      query: (data) => ({
        url: "/users/getUserCv",
        method: "post",
        body: data,
        credentials: "include",
      }),
    }),
    updateCandidateRatings: builder.mutation({
      query: ({ userId, ratings, notes }) => ({
        url: `/users/${userId}/rate`,
        method: "PATCH",
        body: { ratings, notes },
        credentials: "include",
      }),
      invalidatesTags: ["User"],
    }),
    getCandidateRatings: builder.query({
      query: (userId) => ({
        url: `/users/${userId}/ratings`,
        method: "GET",
      }),
      providesTags: ["User"],
    }),
    getNotifications: builder.query({
      query: () => ({
        url: `/users/notifications`,
        method: "GET",
        credentials: "include",
      }),
      invalidatesTags: ["User"],
    }),
    deleteNotifications: builder.mutation({
      query: () => ({
        url: `/users/deleteNotifications`,
        method: "DELETE",
        credentials: "include",
      }),
      providesTags: ["User"],
    }),
    markNotificationAsRead: builder.mutation({
      query: ({ notificationId }) => ({
        url: `/users/notifications/read/${notificationId}`,
        method: "PATCH",
        credentials: "include",
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useLogoutUserMutation,
  useCreateUserMutation,
  useValidateTokenMutation,
  useGetUserDataQuery,
  useUpdateUserMutation,
  useGetUsersQuery,
  useGetUserCvMutation,
  useGetCandidateRatingsQuery,
  useUpdateCandidateRatingsMutation,
  useGetNotificationsQuery,
  useDeleteNotificationsMutation,
  useMarkNotificationAsReadMutation,
} = userApiSlice;
