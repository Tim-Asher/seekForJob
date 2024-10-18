import React, { useState } from "react";
import EmployerCard from "../components/layout/EmployerCard.jsx";
import { Outlet, useLocation } from "react-router-dom";
import { useGetEmployersQuery } from "../slices/employerApiSlice.js";
import Spinner from "../components/layout/Spinner.jsx";

const employersPerPage = 8;

const EmployerList = () => {
  const location = useLocation();
  const isMainRoute = location.pathname === "/employer-page";
  const [currentPage, setCurrentPage] = useState(1);
  const { data: employers = [], isLoading, isError } = useGetEmployersQuery();
  employers;

  const indexOfLastEmployer = currentPage * employersPerPage;
  const indexOfFirstEmployer = indexOfLastEmployer - employersPerPage;
  const currentEmployers = employers.slice(
    indexOfFirstEmployer,
    indexOfLastEmployer
  );

  const totalPages = Math.ceil(employers.length / employersPerPage);

  // Handle loading and error states
  if (isLoading)
    return (
      <div>
        <Spinner />
      </div>
    );
  if (isError) return <div>Error loading employers</div>;

  return (
    <>
      <Outlet />
      {isMainRoute && (
        <div className="container mx-auto p-4" dir="rtl">
          {currentEmployers.length > 0 ? (
            <>
              <div className="flex flex-wrap -mx-4 justify-center">
                {currentEmployers.map((employer) => (
                  <div
                    key={employer.id}
                    className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4"
                  >
                    <EmployerCard employer={employer} />
                  </div>
                ))}
              </div>
              <div className="flex justify-center mt-4">
                {Array.from({ length: totalPages }, (_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentPage(index + 1)}
                    className={`mx-1 px-3 py-1 rounded-lg ${
                      currentPage === index + 1
                        ? "bg-orange-500 text-white"
                        : "bg-gray-300 text-gray-700"
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center text-gray-500 mt-8">
              No employers found.
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default EmployerList;
