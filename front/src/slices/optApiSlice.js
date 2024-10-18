import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const optApiSlice = createApi({
  reducerPath: "otp",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
    // baseUrl: "http://localhost:8000/api",
    // baseUrl: "https://job-board-gzcc.onrender.com/api",
  }),
  endpoints: (builder) => ({
    sendOtp: builder.mutation({
      query: () => ({
        url: "/otp/sendOtp",
        method: "post",
        credentials: "include",
      }),
    }),
    validateOtp: builder.mutation({
      query: (data) => ({
        url: "/otp/validateOtp",
        method: "post",
        body: data,
        credentials: "include",
      }),
    }),
  }),
});

export const { useSendOtpMutation, useValidateOtpMutation } = optApiSlice;
