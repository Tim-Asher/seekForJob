import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { useGetEmployerDetailsByJobIdQuery } from "../../slices/employerApiSlice";

const JobCard = ({ job }) => {
  const navigate = useNavigate();

  const {
    data: employerDetails,
    error: employerDetailsError,
    isLoading: isEmployerDetailsLoading,
  } = useGetEmployerDetailsByJobIdQuery({ employerId: job.author });
  job;

  const openJobPage = () => {
    navigate(`/jobApply/${job._id}`, { state: { job: job } }); // Navigate to the JobPageApply
  };

  return (
    <>
      <div
        id={job._id}
        className="pb-20 relative flex-1 flex-col justify-between max-w-sm p-6 shadow-lg shadow-gray-500 backdrop-brightness-90 border-gray-700 text-right mb-5 rounded-xl"
      >
        <img
          src={employerDetails?.companyLogo || job.picture}
          alt={employerDetails?.companyName || job.author}
          className="w-full rounded-lg mb-2"
        />
        <a href="#" className="text-2xl  font-bold text-amber-600">
          {employerDetails?.companyName || "Company Name"}
        </a>
        <h5 className="text-2xl text-gray-900 my-4 ">{job.jobTitle}</h5>
        <p className="mb-5 font-normal text-gray-900" dir="rtl">
          {job.jobDescription.length > 300
            ? job.jobDescription.slice(0, 300) + "\u2026"
            : job.jobDescription}
        </p>
        <div className="absolute bottom-5 right-5">
          <button
            onClick={openJobPage}
            className="min-w-36 px-3 py-2 text-sm font-medium text-white bg-amber-500 rounded-lg hover:bg-amber-600 focus:ring-4 focus:outline-none focus:ring-blue-300"
          >
            לפרטים נוספים &#8592;
          </button>
        </div>
      </div>
    </>
  );
};

export default JobCard;

function ShowMyDetails({ userDetails }) {
  return (
    <div className="flex justify-center border-t-2 pt-4">
      <p className="text-right">
        <strong>:ניסיון</strong> {userDetails?.data?.experience}
      </p>
      <span className="border-r border-orange-500 mx-3"></span>
      <p className="text-right">
        <strong>:מקצוע</strong> {userDetails?.data?.profession}
      </p>
      <span className="border-r border-orange-500 mx-3"></span>
      <p className="text-right">
        <strong>:עיר</strong> {userDetails?.data?.city}
      </p>
      <span className="border-r border-orange-500 mx-3"></span>
      <p className="text-right">
        <strong>טלפון נייד:</strong> {userDetails?.data?.phoneNumber}
      </p>
      <span className="border-r border-orange-500 mx-3"></span>
      <p className="text-right">
        <strong>:דואר אלקטרוני</strong> {userDetails?.data?.email}
      </p>
    </div>
  );
}
