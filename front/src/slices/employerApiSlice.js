import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const employerApiSlice = createApi({
  reducerPath: "employers",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
    // baseUrl: "https://job-board-gzcc.onrender.com/api",
    // baseUrl: "http://localhost:8000/api",
  }),
  tagTypes: ["Employer"],
  endpoints: (builder) => ({
    createEmployer: builder.mutation({
      query: (data) => ({
        url: "/employer/register",
        method: "post",
        body: data,
      }),
    }),
    getEmployerData: builder.query({
      query: () => ({
        url: "/employer/getEmployerProfile",
        method: "get",
        credentials: "include",
      }),
      providesTags: ["Employer"],
    }),
    updateEmployer: builder.mutation({
      query: (data) => ({
        url: "/employer/updateEmployerProfile",
        method: "PATCH",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["Employer"],
    }),
    addEmployerReview: builder.mutation({
      query: ({ employerId, review }) => ({
        url: `/employer/${employerId}/reviews`,
        method: "post",
        body: review,
        credentials: "include",
      }),
      invalidatesTags: ["Employer"],
    }),
    getEmployerReviews: builder.query({
      query: ({ employerId }) => ({
        url: `/employer/employerReviews/${employerId}`,
        method: "get",
      }),
      providesTags: ["Employer"],
    }),
    getEmployerDetailsByJobId: builder.query({
      query: ({ employerId }) => ({
        url: `/employer/employer-details/${employerId}`,
        method: "get",
      }),
      providesTags: ["Employer"],
    }),
    getProfilePicture: builder.query({
      query: () => ({
        url: "/employer/get-profile-picture", // Ensure this matches your backend route
        method: "get",
        credentials: "include", // Make sure you're sending credentials for auth
      }),
      providesTags: ["Employer"],
    }),

    // New endpoint for updating the profile picture
    updateProfilePicture: builder.mutation({
      query: (profilePicture) => ({
        url: "/employer/updateProfilePicture",
        method: "PUT",
        body: { profilePicture }, // Send the profile picture URL
        credentials: "include",
      }),
      invalidatesTags: ["Employer"], // Invalidate employer data after update
    }),
    getEmployers: builder.query({
      query: () => ({
        url: "/employer",
        method: "GET",
        credentials: "include", // If you need to include credentials (cookies)
      }),
      providesTags: ["Employer"], // Tag for caching and re-fetching if needed
    }),
    getEmployerById: builder.query({
      query: (id) => ({
        url: `/employer/${id}`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["Employer"],
    }),
  }),
});

export const {
  useCreateEmployerMutation,
  useGetEmployerDataQuery,
  useUpdateEmployerMutation,
  useAddEmployerReviewMutation,
  useGetEmployerReviewsQuery,
  useGetEmployerDetailsByJobIdQuery,
  useGetProfilePictureQuery,
  useUpdateProfilePictureMutation,
  useGetEmployersQuery,
  useGetEmployerByIdQuery,
} = employerApiSlice;