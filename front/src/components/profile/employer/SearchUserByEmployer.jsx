import React, { useState, useEffect, useContext } from "react";
import { FaSearch } from "react-icons/fa";
import {
  useGetUserCvMutation,
  useGetUsersQuery,
} from "../../../slices/userApiSlice";
import { useNavigate } from "react-router-dom";
import BackArrow from "../../layout/BackArrow";
import PageContext from "../../../context/pagesContext";
import Spinner from "../../layout/Spinner";

const SearchUserByEmployer = () => {
  const [profession, setProfession] = useState("");
  const [city, setCity] = useState("");
  const [experience, setExperience] = useState("");
  const { successToast, errorToast } = useContext(PageContext);
  const [query, setQuery] = useState(""); // Initialize query as an empty string

  const {
    data: users,
    isLoading,
    error,
    isFetching,
    refetch,
  } = useGetUsersQuery(
    { query },
    {
      skip: query === "", // Skip if no query parameters are set
    }
  );

  const [getUserCv] = useGetUserCvMutation();
  const navigate = useNavigate();

  const handleSearch = () => {
    let tempQuery = "";
    if (profession) tempQuery += `profession=${profession}&`;
    if (city) tempQuery += `city=${city}&`;
    if (experience) tempQuery += `experience=${experience}&`;

    // Remove the trailing '&' if present
    tempQuery = tempQuery.slice(0, -1);
    if (tempQuery === "") {
      errorToast("have to input search to find users");
    } else {
      setQuery(tempQuery);
    }
  };

  const handleViewCv = async (userId) => {
    getUserCv({ userId }).then((result) => {
      if (result?.data?.cvUrl) {
        window.open(result.data.cvUrl, "_blank");
      } else {
        errorToast("No CV found for this user");
      }
    });
  };

  return (
    <div className="relative flex flex-col items-center w-full pt-3">
      <div className="absolute top-4 left-4">
        <BackArrow color={"black"} url={"/employer-profile"} />
      </div>
      <div className="flex items-center justify-center bg-orange-500 py-4 px-6 rounded-xl  md:rounded-full shadow-lg  md:max-w-fit">
        <div className="flex flex-col space-y-3 md:space-y-0 items-center justify-center md:flex-row md:space-x-4  ">
          <input
            type="text"
            value={profession}
            onChange={(e) => setProfession(e.target.value)}
            placeholder="חפש על פי מקצוע"
            className="p-2 border text-right border-gray-300 rounded focus:outline-none focus:border-orange-500"
          />
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="חפש על פי עיר"
            className="p-2 border text-right border-gray-300 rounded focus:outline-none focus:border-orange-500"
          />
          <input
            type="number"
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
            placeholder="חפש על פי ניסיון"
            className="p-2 border text-right border-gray-300 rounded focus:outline-none focus:border-orange-500"
          />
          <button
            onClick={handleSearch}
            className="bg-white p-3 rounded-full flex items-center justify-center text-orange-500 text-xl"
          >
            <FaSearch />
          </button>
        </div>
      </div>
      {/* Render Search Results in a Table */}
      <div className="mt-8 mx-auto max-w-4xl">
        {isLoading || isFetching ? (
          <p>
            <Spinner />
          </p>
        ) : error ? (
          <p>Error: {error.message}</p>
        ) : users && users.length > 0 ? (
          <table className="w-full bg-white shadow-lg rounded-lg overflow-hidden">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-2 px-1 md:px-4 border-b">קורות חיים</th>
                <th className="py-2 px-1 md:px-4 border-b">ניסיון</th>
                <th className="py-2 px-1 md:px-4 border-b">מקצוע</th>
                <th className="py-2 px-1 md:px-4 border-b">שם מלא</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id} className="hover:bg-gray-50">
                  <td className="py-2 px-1 md:px-4 border-b">
                    <button
                      onClick={() => handleViewCv(user._id)}
                      className="bg-blue-500 text-white px-1 md:px-4 py-1 rounded hover:bg-blue-600"
                    >
                      View CV
                    </button>
                  </td>
                  <td className="py-2 px-1 md:px-4 border-b">
                    {user.experience} years
                  </td>
                  <td className="py-2 px-1 md:px-4 border-b">
                    {user.profession}
                  </td>
                  <td className="py-2 px-1 md:px-4 border-b">{`${user.firstName} ${user.lastName}`}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-center">No search results found.</p>
        )}
      </div>
    </div>
  );
};

export default SearchUserByEmployer;
