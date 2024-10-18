import React from "react";
import { useNavigate } from "react-router-dom";

const EmployerCard = ({ employer }) => {
  const navigate = useNavigate();

  return (
    <div
      className="bg-white shadow-md rounded-lg p-4 cursor-pointer overflow-hidden"
      onClick={() =>
        navigate(`/employer-page/${employer.id}`, {
          state: { employer },
        })
      }
    >
      <img
        src={employer.companyLogo}
        alt={employer.companyName}
        className="w-24 h-24 rounded-full mx-auto mb-4"
      />
      <h2 className="text-xl font-bold text-center">{employer.companyName}</h2>
      <p className="text-center text-gray-600">{employer.companySize} עובדים</p>
    </div>
  );
};

export default EmployerCard;
