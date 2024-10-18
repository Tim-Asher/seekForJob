import React, { useEffect, useState } from "react";
import CountUp from "react-countup";
import { useGetStatisticsDataQuery } from "../../slices/jobApiSlice";

const Statistics = () => {
  const { data, error, isLoading } = useGetStatisticsDataQuery();
  const [jobsLastWeek, setJobsLastWeek] = useState(0);
  const [totalEmployers, setTotalEmployers] = useState(0);
  const [totalJobs, setTotalJobs] = useState(0);

  useEffect(() => {
    if (data) {
      setJobsLastWeek(data.jobsLastWeek);
      setTotalEmployers(data.totalEmployers);
      setTotalJobs(data.totalJobs);
    }
  }, [data]);

  return (
    <div className="mt-5 flex-auto content-center  w-screen ">
      <dl className="flex flex-col md:flex-row items-center justify-evenly p-4 text-orange-500 shadow-lg shadow-gray-500 bg-gray-300 ">
        <div className="flex flex-col items-center justify-center drop-shadow-outline">
          <dt className="mb-2 text-5xl font-extrabold ">
            <CountUp end={totalEmployers} />
          </dt>
          <dd className="text-2xl text-orange-600 font-bold ">
            חברות מגייסות עכשיו
          </dd>
        </div>
        <div className="flex flex-col items-center justify-center drop-shadow-outline">
          <dt className="mb-2 text-5xl font-extrabold">
            <CountUp end={totalJobs} />
          </dt>
          <dd className="text-2xl text-orange-600 font-bold">משרות באתר</dd>
        </div>
        <div className="flex flex-col items-center justify-center drop-shadow-outline">
          <dt className="mb-2 text-5xl font-extrabold">
            <CountUp end={jobsLastWeek} />
          </dt>
          <dd className="text-2xl text-orange-600 font-bold">
            משרות חדשות מהשבוע האחרון
          </dd>
        </div>
      </dl>
    </div>
  );
};

export default Statistics;
