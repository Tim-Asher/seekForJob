// Mine 9.8
import React, { useContext } from "react";
import PageContext from "../../context/pagesContext";
import { LiaIndustrySolid } from "react-icons/lia";

const EmployerEmployeeGroupBtns = ({ id }) => {
  const { selectedLoginType, setSelectedLoginType } = useContext(PageContext);
  return (
    <ul className="grid w-full gap-2 md:gap-6 md:grid-cols-2">
      <li>
        <input
          type="radio"
          id="hosting-small"
          name="hosting"
          value="hosting-small"
          className="hidden peer"
          checked={selectedLoginType === "employee"}
          onChange={(e) => {
            setSelectedLoginType("employee");
          }}
          required
        />
        <label
          htmlFor="hosting-small"
          className="inline-flex  items-center justify-between w-full px-5 py-2 text-gray-500 bg-gray-200/70 border-2 border-gray-400 shadow rounded-lg cursor-pointer peer-checked:underline   peer-checked:border-primary-600 peer-checked:text-primary-500  peer-checked:bg-gray-100 hover:text-gray-600 hover:bg-gray-200"
        >
          <svg
            className="w-5 h-5 me-2 "
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
          </svg>
          <div className="block">
            <div className="w-full text-lg font-bold ">Employee</div>
          </div>
        </label>
      </li>
      <li>
        <input
          type="radio"
          id="hosting-big"
          name="hosting"
          value="hosting-big"
          className="hidden peer"
          checked={selectedLoginType === "employer"}
          onChange={(e) => {
            setSelectedLoginType("employer");
          }}
        />
        <label
          htmlFor="hosting-big"
          className="inline-flex  items-center justify-between w-full px-5 py-2 text-gray-500 bg-gray-200/70 border-2 border-gray-400 shadow rounded-lg cursor-pointer peer-checked:underline   peer-checked:border-primary-600 peer-checked:text-primary-500  peer-checked:bg-gray-100 hover:text-gray-600 hover:bg-gray-200"
        >
          <LiaIndustrySolid className="w-5 h-5 me-2" />
          <div className="block">
            <div className="w-full text-lg font-bold">Employer</div>
          </div>
        </label>
      </li>
    </ul>
  );
};

export default EmployerEmployeeGroupBtns;
