import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const jobApiSlice = createApi({
  reducerPath: "jobApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
    // baseUrl: "http://localhost:8000/api",
    // baseUrl: "https://job-board-gzcc.onrender.com/api",
    credentials: "include",
  }),
  tagTypes: ["Job", "CV", "User"], // Add CV and User for caching
  endpoints: (builder) => ({
    // Delete a job by ID
    deleteJob: builder.mutation({
      query: (jobId) => ({
        url: `/jobs/deleteJob/${jobId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Job"], // Invalidate Job cache after deletion
    }),

    // Create a new job by employer
    createJob: builder.mutation({
      query: (data) => ({
        url: "/jobs/createJobByEmployer",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Job"],
    }),

    // Edit an existing job by employer
    editJob: builder.mutation({
      query: ({ id, updatedJob }) => ({
        url: `/jobs/editJobByEmployer/${id}`,
        method: "PATCH",
        body: updatedJob,
      }),
      invalidatesTags: ["Job"],
    }),

    // Fetch all jobs by the employer    <<----- fix for employer
    getEmployerJobs: builder.query({
      query: () => ({
        url: "/jobs/getEmployerJobs",
        method: "GET",
      }),
      providesTags: ["Job"],
    }),
    getAllJobs: builder.query({
      query: (searchFilters) => ({
        url: "/jobs/getAllJobs",
        method: "GET",
        params: searchFilters, // Send search filters as query parameters
      }),
      providesTags: ["Job"],
    }),

    // Fetch a single job by its ID, including candidates
    getEmployerJobById: builder.query({
      query: (jobId) => ({
        url: `/jobs/getJobById/${jobId}`,
        method: "GET",
      }),
      providesTags: ["Job"],
    }),

    // Fetch all jobs by the employer including the candidates who applied
    getEmployerJobsWithCandidates: builder.query({
      query: () => ({
        url: "/jobs/getEmployerJobsWithCandidates",
        method: "GET",
      }),
    }),

    // Update the status of a job candidate (e.g. "applied", "rejected", etc.)
    updateJobCandidateStatus: builder.mutation({
      query: ({ jobId, userId, status }) => ({
        url: `/jobs/updateCandidateStatus`,
        method: "PATCH",
        body: { jobId, userId, status },
      }),
      invalidatesTags: ["Job"],
    }),

    // Apply to a job
    applyToJob: builder.mutation({
      query: ({ jobId, coverLetter, selectedCV }) => ({
        url: `/jobs/applyToJob/${jobId}`,
        method: "POST",
        body: { coverLetter, selectedCV },
      }),
      invalidatesTags: ["Job"], // Invalidate the job tag to refetch the jobs if necessary
    }),

    // Fetch user's CVs
    getUserCVs: builder.query({
      query: (data) => ({
        url: "/cv/getUserCvs",
        data,
        method: "GET",
      }),
      providesTags: ["CV"],
    }),

    // Delete a CV by its ID
    deleteCV: builder.mutation({
      query: (cvId) => ({
        url: `/cv/deleteCv/${cvId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["CV"],
    }),

    // Fetch user details
    getUserDetails: builder.query({
      query: () => ({
        url: "/users/me",
        method: "GET",
      }),
      providesTags: ["User"],
    }),

    deleteJobApplication: builder.mutation({
      query: ({ jobId, userId }) => ({
        url: `/jobs/${jobId}/applications/${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Job"], // Invalidate the job tag to refresh data
    }),

    getFilteredJobCandidates: builder.query({
      query: ({ jobId, status }) => ({
        url: `/jobs/${jobId}/candidates`,
        params: { status },
        method: "GET",
      }),
      providesTags: ["Job"],
    }),

    // Add this inside the endpoints builder in your jobApiSlice
    getJobsAppliedByUser: builder.query({
      query: (userId) => ({
        url: `/jobs/jobs-for-candidate/${userId}`, // Assuming you have a backend route set up like this
        method: "GET",
      }),
      providesTags: ["Job"],
    }),

    getRandomJobs: builder.query({
      query: () => ({
        url: "/jobs/random-jobs", // This corresponds to the backend route we defined
        method: "GET",
      }),
      providesTags: ["Job"],
    }),

    searchJobs: builder.query({
      query: (searchFilters) => ({
        url: "/jobs/search", // Assuming your backend route is "/jobs/search"
        method: "POST", // POST method since you are using this in your backend
        body: searchFilters, // Send search filters as the body of the request
      }),
      providesTags: ["Job"], // You may want to cache this query similarly to the others
    }),
    getAllJobsByEmployerId: builder.query({
      query: (employerId) => ({
        url: `/jobs/getAllJobsByEmployerId/${employerId}`,
        method: "GET",
      }),
      providesTags: ["Jobs"],
    }),
    getStatisticsData: builder.query({
      query: () => ({
        url: `/jobs/statistics`,
        method: "GET",
      }),
    }),
  }),
});

// Export hooks generated by RTK Query
export const {
  useGetEmployerJobsQuery,
  useDeleteJobMutation,
  useCreateJobMutation,
  useEditJobMutation,
  useUpdateJobCandidateStatusMutation,
  useGetEmployerJobByIdQuery,
  useApplyToJobMutation,
  useGetUserCVsQuery,
  useDeleteCVMutation,
  useGetUserDetailsQuery, // Fetch user details
  useGetEmployerJobsWithCandidatesQuery,
  useDeleteJobApplicationMutation,
  useGetFilteredJobCandidatesQuery,
  useGetJobsAppliedByUserQuery,
  useGetRandomJobsQuery,
  useGetAllJobsQuery,
  useSearchJobsQuery,
  useGetAllJobsByEmployerIdQuery,
  useGetStatisticsDataQuery,
} = jobApiSlice;
