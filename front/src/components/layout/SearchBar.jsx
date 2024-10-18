import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGetAllJobsQuery } from "../../slices/jobApiSlice"; // Adjust the import based on your file structure
import axios from "axios";
import Spinner from "./Spinner";

function JobSearchBar() {
  const navigate = useNavigate();
  const [jobField, setJobField] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [location, setLocation] = useState("");
  const [jobType, setJobType] = useState("");
  const [generalSearch, setGeneralSearch] = useState("");
  const [activeTab, setActiveTab] = useState("byField");
  const [cities, setCities] = useState([]);
  const [filteredCities, setFilteredCities] = useState([]);
  // State for search parameters
  const [searchParams, setSearchParams] = useState({});

  const {
    data: jobs,
    error,
    isLoading,
  } = useGetAllJobsQuery(searchParams, {
    skip: !Object.keys(searchParams).length, // Skip query if no params
  });

  // useEffect(() => {
  //   const fetchCities = async () => {
  //     try {
  //       const response = await axios.get(
  //         "https://data.gov.il/api/3/action/datastore_search",
  //         {
  //           params: {
  //             resource_id: "b7cf8f14-64a2-4b33-8d4b-edb286fdbd37",
  //             limit: 1000,
  //           },
  //         }
  //       );
  //       const cityList = response.data.result.records.map(
  //         (city) => city["שם_ישוב"]
  //       );
  //       setCities(cityList);
  //     } catch (error) {
  //       console.error("Error fetching cities:", error);
  //     }
  //   };

  //   fetchCities();
  // }, []);

  const handleJobFieldChange = (e) => setJobField(e.target.value);
  const handleJobTitleChange = (e) => setJobTitle(e.target.value);

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
    if (e.target.value.length > 1) {
      setFilteredCities(
        cities.filter((city) =>
          city.toLowerCase().includes(e.target.value.toLowerCase())
        )
      );
    } else {
      setFilteredCities([]);
    }
  };

  const handleJobTypeChange = (e) => setJobType(e.target.value);
  const handleGeneralSearchChange = (e) => setGeneralSearch(e.target.value);

  const handleSearch = () => {
    let filters;
    if (activeTab === "byField") {
      filters = {
        ...(jobField && { jobField }),
        ...(jobTitle && { jobTitle }),
        ...(location && { jobCity: location }), // Ensure this is correct
        ...(jobType && { jobType }),
      };
    } else {
      filters = {
        ...(generalSearch && { generalSearch }),
      };
    }
    // const filters = {
    //   ...(jobField && { jobField }),
    //   ...(jobTitle && { jobTitle }),
    //   ...(location && { jobCity: location }), // Ensure this is correct
    //   ...(jobType && { jobType }),
    //   ...(generalSearch && { generalSearch }),
    // };

    setSearchParams(filters); // Update search params state
    navigate(`/all-jobs?${new URLSearchParams(filters).toString()}`);
    setSearchParams({});
  };

  return (
    <div className="drop-shadow-lg rounded-lg bg-gray-200 p-5 flex flex-col items-center justify-center">
      <div className="flex justify-center mb-5 max-w">
        <span
          className={`mx-4 text-gray-600 cursor-pointer ${
            activeTab === "byField"
              ? "font-semibold border-b-2 border-orange-500"
              : ""
          } text-center`}
          onClick={() => setActiveTab("byField")}
        >
          חיפוש לפי תחום
        </span>
        <span
          className={`mx-4 text-gray-600 cursor-pointer ${
            activeTab === "general"
              ? "font-semibold border-b-2 border-orange-500"
              : ""
          } text-center`}
          onClick={() => setActiveTab("general")}
        >
          חיפוש חופשי
        </span>
      </div>

      {activeTab === "byField" ? (
        <div className="flex flex-col justify-center md:flex-row w-full">
          <div className="flex flex-col items-center mb-4 md:mb-0 md:mr-4 text-center">
            <span className="text-gray-600 text-md mb-1 text-center">תחום</span>
            <input
              type="text"
              placeholder="בחרו תחום"
              className="w-full md:w-44 lg:w-48 p-2 rounded-full border border-gray-300 text-md text-center"
              value={jobField}
              onChange={handleJobFieldChange}
            />
          </div>

          <div className="flex flex-col items-center mb-4 md:mb-0 md:mr-4 text-center ">
            <span className="text-gray-600 text-md mb-1 text-center">
              תפקידים
            </span>
            <input
              type="text"
              placeholder="בחרו תפקידים"
              className="w-full md:w-44 lg:w-48 p-2 rounded-full border border-gray-300 text-md text-center"
              value={jobTitle}
              onChange={handleJobTitleChange}
            />
          </div>

          <div className="flex flex-col items-center mb-4 md:mb-0 md:mr-4 text-center relative">
            <span className="text-gray-600 text-md mb-1 text-center">
              מיקום
            </span>
            <input
              type="text"
              placeholder="בחרו עיר"
              className="w-full md:w-44 lg:w-48 p-2 rounded-full border border-gray-300 text-md text-center"
              value={location}
              onChange={handleLocationChange}
              onBlur={() => setFilteredCities([])}
            />
            {filteredCities.length > 0 && (
              <ul className="absolute bg-white border border-gray-300 mt-14 rounded-lg max-h-40 overflow-y-auto z-20 md:w-48">
                {filteredCities.map((city, index) => (
                  <li
                    key={index}
                    className="p-2 cursor-pointer hover:bg-gray-200"
                    onClick={() => {
                      setLocation(city);
                      setFilteredCities([]);
                    }}
                  >
                    {city}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="flex flex-col items-center mb-4 md:mb-0 text-center">
            <span className="text-gray-600 text-md mb-1 text-center">
              סוג משרה
            </span>
            <select
              className="w-full md:w-44 lg:w-48 p-2 rounded-full border border-gray-300 text-md text-center"
              value={jobType}
              onChange={handleJobTypeChange}
            >
              <option value="">בחרו סוג משרה</option>
              <option value="Full-Time">משרה מלאה</option>
              <option value="Part-Time">משרה חלקית</option>
              <option value="Freelance">פרילנס</option>
            </select>
          </div>
        </div>
      ) : (
        <div className="flex justify-center w-full">
          <input
            type="text"
            placeholder="השתמש בפסיק כדי לחפש יותר ממילת מפתח אחת, לדוגמא: פיתוח, ירושלים"
            className="w-full p-2 rounded-full border border-gray-300 text-md text-center placeholder:font-bold placeholder:text-gray-500"
            value={generalSearch}
            onChange={handleGeneralSearchChange}
          />
        </div>
      )}

      <button
        className="bg-orange-500 text-white rounded-full w-12 h-12 flex items-center justify-center mt-5"
        onClick={handleSearch}
      >
        <i className="fa fa-search"></i>
      </button>

      {/* Display job results */}
      {isLoading && (
        <p>
          <Spinner />
        </p>
      )}
      {error && <p>Error fetching jobs: {error.message}</p>}
      {jobs && jobs.length > 0 && (
        <div className="mt-4">
          <h2 className="text-lg font-semibold">Available Jobs:</h2>
          <ul>
            {jobs.map((job) => (
              <li key={job.id} className="border-b py-2">
                {job.title} - {job.jobCity}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default JobSearchBar;
