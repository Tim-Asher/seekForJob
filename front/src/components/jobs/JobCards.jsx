import React, { useState, useEffect } from "react";
import JobCard from "./JobCard";
import Spinner from "../layout/Spinner";
import { useGetRandomJobsQuery } from "../../slices/jobApiSlice"; // Import the hook

const JobCards = ({ isHome }) => {
  const { data: jobs, isLoading } = useGetRandomJobsQuery(); // Fetch random jobs
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading]);

  return (
    <div
      className={
        "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mt-10 mx-auto w-8/12"
      }
    >
      {loading ? (
        <Spinner />
      ) : (
        <>
          {jobs?.data.map((job) =>
            isHome ? (
              <JobCard key={job._id} job={job} />
            ) : (
              <Alljobs key={job._id} job={job} />
            )
          )}
        </>
      )}
    </div>
  );
};

export default JobCards;
