import React, { useState, useEffect, useContext } from "react";
import { FaArrowDown, FaTrash } from "react-icons/fa";
import { FaRankingStar } from "react-icons/fa6";
import { IoIosDocument } from "react-icons/io";
import { useParams, useNavigate } from "react-router-dom";
import {
  useDeleteJobApplicationMutation,
  useGetEmployerJobByIdQuery,
  useUpdateJobCandidateStatusMutation,
} from "../../../slices/jobApiSlice";
import { useGetUserCvMutation } from "../../../slices/userApiSlice";
import RankModal from "../RankingModal";
import BackArrow from "../../layout/BackArrow";
import PageContext from "../../../context/pagesContext";

const UserJobStatus = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const { data: jobData, isLoading } = useGetEmployerJobByIdQuery(jobId);
  const [isDropdownOpen, setIsDropdownOpen] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const candidatesPerPage = 5;
  const [candidates, setCandidates] = useState([]);
  const [rankModalOpen, setRankModalOpen] = useState(false);
  const [selectedCandidateId, setSelectedCandidateId] = useState(null);
  const [deleteJobApplication] = useDeleteJobApplicationMutation();
  const [getUserCv] = useGetUserCvMutation();
  const [updateJobCandidateStatus] = useUpdateJobCandidateStatusMutation();
  const [coverLetterModalOpen, setCoverLetterModalOpen] = useState(false);
  const [selectedCoverLetter, setSelectedCoverLetter] = useState("");
  const { successToast, errorToast } = useContext(PageContext);

  useEffect(() => {
    if (jobData?.data?.job?.candidates) {
      setCandidates(jobData.data.job.candidates);
    }
  }, [jobData]);

  const indexOfLastCandidate = currentPage * candidatesPerPage;
  const indexOfFirstCandidate = indexOfLastCandidate - candidatesPerPage;
  const currentCandidates = candidates.slice(
    indexOfFirstCandidate,
    indexOfLastCandidate
  );

  const handleViewCv = async (userId) => {
    const result = await getUserCv({ userId, notifaction: true }).unwrap();
    if (result?.cvUrl) {
      window.open(result.cvUrl, "_blank");
    } else {
      errorToast("No CV found for this user.");
    }
  };

  const toggleDropdown = (candidateId) => {
    setIsDropdownOpen(isDropdownOpen === candidateId ? null : candidateId);
  };

  const handleStatusChange = async (userId, status) => {
    await updateJobCandidateStatus({ jobId, userId, status }).unwrap();
    toggleDropdown(userId);
  };

  const handleDeleteApplication = async (candidate) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${candidate.user.firstName}'s application?`
    );
    if (!confirmDelete) return;
    await deleteJobApplication({ jobId, userId: candidate.user._id }).unwrap();
    refetch();
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleFilterChange = (e) => {
    const selectedStatus = e.target.value;
    console.log(e.target.value);
    setCandidates(
      e.target.value === "All"
        ? jobData?.data.job.candidates
        : jobData?.data.job.candidates.filter(
            (candidate) => candidate.status === selectedStatus
          )
    );
  };

  const handleRankModalOpen = (candidateId) => {
    setSelectedCandidateId(candidateId);
    setRankModalOpen(true);
  };

  const handleViewCoverLetter = (coverLetter) => {
    setSelectedCoverLetter(coverLetter);
    setCoverLetterModalOpen(true);
  };

  return (
    <div className="container mx-auto p-8">
      <div className="flex justify-start mb-4">
        <BackArrow color={"black"} url={-1} />
      </div>

      <h2 className="text-2xl font-bold mb-4 text-right">סטטוס מועמד</h2>
      <div className="mb-4">
        <label htmlFor="statusFilter">Filter by Status:</label>
        <select
          id="statusFilter"
          onChange={handleFilterChange}
          className="ml-2 p-2 border rounded"
        >
          <option value="All">All</option>
          <option value="fit">התקבל</option>
          <option value="pending">בהמתנה</option>
          <option value="unfit">בראיון</option>
        </select>
      </div>
      <div className="flex justify-center">
        <table className="table-auto w-full   bg-gray-200  shadow-lg shadow-gray-500 rounded-lg">
          <thead>
            <tr>
              <th className=" py-3 text-center">אופציות</th>
              <th className=" py-3 text-center">מכתב מקדים</th>
              <th className=" py-3 text-center">קורות חיים</th>
              <th className=" py-3 text-center hidden md:table-cell">
                מספר טלפון
              </th>
              <th className="py-3 text-center hidden md:table-cell">
                שם משפחה
              </th>
              <th className="py-3 text-center hidden md:table-cell">שם פרטי</th>
              <th className="py-3 text-center md:hidden">פרטים אישיים</th>
              <th className="py-3 text-center">סטטוס</th>
            </tr>
          </thead>
          <tbody className="">
            {candidates.map((candidate) => (
              <tr key={candidate.user._id} className="border-b border-gray-400">
                <td className="relative flex justify-center px-4 py-3 text-center">
                  <div className="flex flex-col gap-3 md:flex-row">
                    <button
                      onClick={() => toggleDropdown(candidate.user._id)}
                      className="bg-blue-500 text-white px-4 py-2 rounded ml-2 flex justify-center "
                    >
                      <FaArrowDown />
                    </button>
                    <button
                      onClick={() => handleRankModalOpen(candidate.user._id)}
                      className="bg-blue-500 text-white px-4 py-2 rounded ml-2 flex justify-center "
                    >
                      <FaRankingStar className="text-xl" />
                    </button>
                    <button
                      onClick={() => handleDeleteApplication(candidate)}
                      className=" bg-red-500 text-white px-4 py-2 rounded ml-2 flex justify-center"
                    >
                      <FaTrash />
                    </button>
                  </div>
                  {isDropdownOpen === candidate.user._id && (
                    <div className="absolute mt-2 bg-white border rounded shadow-lg z-50">
                      <ul>
                        <li
                          className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                          onClick={() =>
                            handleStatusChange(candidate.user._id, "fit")
                          }
                        >
                          התקבל
                        </li>
                        <li
                          className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                          onClick={() =>
                            handleStatusChange(candidate.user._id, "pending")
                          }
                        >
                          בהמתנה
                        </li>
                        <li
                          className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                          onClick={() =>
                            handleStatusChange(candidate.user._id, "unfit")
                          }
                        >
                          בראיון
                        </li>
                      </ul>
                    </div>
                  )}
                </td>

                <td className="px-1 md:px-4 py-2 text-right">
                  <div className="flex justify-center">
                    <button
                      onClick={() =>
                        handleViewCoverLetter(
                          candidate.coverLetter || "No Cover Letter"
                        )
                      }
                      className="bg-green-500 text-white px-4 py-2 rounded"
                    >
                      <IoIosDocument className="text-2xl" />
                    </button>
                  </div>
                </td>
                <td className="px-1 py-2 text-right md:px-4">
                  <div className="flex justify-center">
                    <button
                      onClick={() => handleViewCv(candidate.user._id)}
                      className="bg-blue-500 text-white px-4 py-2 rounded"
                    >
                      <IoIosDocument className="text-2xl" />
                    </button>
                  </div>
                </td>

                <td className="px-4 py-2 text-center hidden md:table-cell">
                  {candidate.user.phoneNumber}
                </td>
                <td className="px-4 py-2 text-center text-nowrap hidden md:table-cell">
                  {candidate.user.lastName}
                </td>
                <td className="px-4 py-2 text-center text-nowrap hidden md:table-cell">
                  {candidate.user.firstName}
                </td>
                <td className="px-4 py-2 text-center md:hidden">
                  {`${candidate.user.firstName} ${candidate.user.lastName} ${candidate.user.phoneNumber}`}
                </td>
                <td className="px-4 py-2 text-center">
                  <span
                    className={`px-4 py-2 rounded-full text-white ${
                      candidate.status === "fit"
                        ? "bg-green-500"
                        : candidate.status === "pending"
                        ? "bg-yellow-500"
                        : "bg-blue-500"
                    }`}
                  >
                    {candidate.status === "fit"
                      ? "התקבל"
                      : candidate.status === "pending"
                      ? "בהמתנה"
                      : "בראיון"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center mt-4">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 mx-1 bg-gray-300 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={indexOfLastCandidate >= candidates.length}
          className="px-4 py-2 mx-1 bg-gray-300 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {rankModalOpen && (
        <RankModal
          userId={selectedCandidateId}
          onClose={() => setRankModalOpen(false)}
        />
      )}

      {coverLetterModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
          <div className="bg-white p-5 rounded-lg">
            <h2 className="text-lg font-bold mb-4">מכתב מקדים</h2>
            <p className="text-gray-800">{selectedCoverLetter}</p>
            <button
              onClick={() => setCoverLetterModalOpen(false)}
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              סגור
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserJobStatus;
