import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { useGetAllJobsQuery } from "../slices/jobApiSlice";
import JobCard from "../components/jobs/JobCard";
import JobSearchBar from "../components/layout/SearchBar";
import Spinner from "../components/layout/Spinner";

const AllJobs = () => {
  const locations = useLocation();
  const searchParams = new URLSearchParams(locations.search);
  const filters = Object.fromEntries(searchParams.entries());
  const jobsPerPage = 9;
  const [currentPage, setCurrentPage] = useState(1);

  // Always call the query hook unconditionally
  const { data: jobsData, error, isLoading } = useGetAllJobsQuery(filters);
  filters;

  if (isLoading)
    return (
      <div>
        <Spinner />
      </div>
    );
  if (error) return <div>Error: {error.message}</div>;

  const jobs = jobsData?.data || [];
  const lastJobIndex = currentPage * jobsPerPage;
  const firstJobIndex = lastJobIndex - jobsPerPage;
  const currentJobs = jobs.slice(firstJobIndex, lastJobIndex);

  const totalPages = Math.ceil(jobs.length / jobsPerPage);

  // // Ensure early returns do not skip Hooks
  // if (jobs.length === 0) {
  //   return <div>No jobs available.</div>;
  // }

  return (
    <div>
      <JobSearchBar />
      <div className="container mx-auto p-4">
        {jobs.length === 0 ? (
          <div className="flex justify-center text-gray-500 text-lg">
            No jobs available.
          </div>
        ) : (
          <>
            <div className="flex justify-center">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {currentJobs.map((job) => (
                  <JobCard key={job._id} job={job} />
                ))}
              </div>
            </div>
            {totalPages > 1 && (
              <div className="flex justify-center items-center space-x-2 mt-4">
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                  className={`px-4 py-2 rounded-full ${
                    currentPage === 1
                      ? "bg-gray-300"
                      : "bg-gray-200 text-gray-800"
                  }`}
                >
                  &#8592; {/* Left arrow */}
                </button>
                <span className="text-lg font-semibold bg-transparent">{`Page ${currentPage} of ${totalPages}`}</span>
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  className={`px-4 py-2 rounded-full ${
                    currentPage === totalPages
                      ? "bg-gray-300"
                      : "bg-gray-200 text-gray-800"
                  }`}
                >
                  &#8594; {/* Right arrow */}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AllJobs;
