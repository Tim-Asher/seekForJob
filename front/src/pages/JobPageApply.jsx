import React, { useState, useContext } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import Modal from "react-modal";
import {
  useApplyToJobMutation,
  useGetUserCVsQuery,
  useDeleteCVMutation,
  useGetUserDetailsQuery,
} from "../slices/jobApiSlice";
import PageContext from "../context/pagesContext";
import { FaArrowLeft, FaTrash } from "react-icons/fa";
import BackArrow from "../components/layout/BackArrow";
import Spinner from "../components/layout/Spinner";
import { useMediaQuery } from "react-responsive";
import { CiCircleCheck } from "react-icons/ci";
import { FaFileDownload } from "react-icons/fa";

Modal.setAppElement("#root"); // Set the app element for accessibility

const JobPageApply = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { job } = location.state || {};
  const { isLogin, errorToast, successToast } = useContext(PageContext);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [coverLetter, setCoverLetter] = useState("");
  const [selectedCV, setSelectedCV] = useState(null);

  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  const [applyToJob, { isLoading: isApplying }] = useApplyToJobMutation();
  const { data: cvListData, isLoading: isCVsLoading } = useGetUserCVsQuery(
    undefined,
    { skip: !isModalOpen }
  );
  const { data: userDetails, isLoading: isUserLoading } =
    useGetUserDetailsQuery(undefined, { skip: !isModalOpen });
  const [deleteCV] = useDeleteCVMutation();

  if (!job) {
    errorToast("No job details available.");
    navigate(-1);
    return (
      <p>
        <Spinner />
      </p>
    );
  }

  const openModal = () => {
    if (!isLogin) {
      errorToast("Must Login to Apply!");
    } else {
      setIsModalOpen(true);
    }
  };

  const closeModal = () => setIsModalOpen(false);

  const handleSubmit = async () => {
    if (!selectedCV) {
      errorToast("Please select a CV before applying.");
      return;
    }
    try {
      await applyToJob({
        jobId: job._id,
        coverLetter,
        cvId: selectedCV,
      }).then((res) => {
        console.log(res);
        if (res.data?.status) {
          successToast("הגשת מועמדות נשלחה בהצלחה");
        } else {
          if (
            res.error.data.message === "You have already applied for this job"
          ) {
            errorToast(`כבר הגשת מועמדות למשרה זו`);
          } else {
            errorToast(`There was error appling to this job!`);
          }
        }
      });
      closeModal();
    } catch (err) {
      console.error("Error submitting application:", err);
    }
  };

  const handleDeleteCV = async (cvId) => {
    try {
      await deleteCV(cvId);
      successToast("CV deleted successfully!");
    } catch (error) {
      console.error("Error deleting CV:", error);
    }
  };

  const handleEditProfile = () => {
    if (userDetails) {
      navigate("/profile/edit-profile", { state: { user: userDetails.data } });
    } else {
      errorToast("User data not found or incomplete. Please try again.");
    }
  };
  const requirements = job.jobRequirements.split(",").map((req) => {
    const parts = req.trim().split(" ");
    const years = parts[0]; // Get the first part (number of years)
    const experience = parts.slice(1).join(" "); // Get everything else
    return ` ${years} ${experience}`;
  });

  return (
    <div>
      <div className="p-10">
        <BackArrow url={-1} />
      </div>
      <div className="bg-white shadow-lg rounded-lg p-6 text-right md:max-w-3xl lg:max-w-4xl mx-auto mt-5">
        <h1 className="text-3xl font-bold border-b-2 border-gray-600 pb-4 text-gray-800">
          {job.jobTitle}
        </h1>

        <h2 className="text-2xl font-bold mt-5 pb-1 text-gray-800">
          :תיאור המשרה
        </h2>
        <p className="bg-gradient-to-r from-gray-50 to-gray-100 p-6 rounded-lg shadow-lg transition duration-300 hover:shadow">
          {job.jobDescription}
        </p>

        <div className="py-4 border-t">
          <h2 className="text-2xl font-bold mt-4 mb-2 text-gray-800 border-b-2 border-gray-600 pb-2">
            פרטי המשרה
          </h2>
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-6 rounded-lg shadow-lg transition duration-300 hover:shadow-2xl">
            <h3 className="font-bold text-lg text-gray-700 mb-1">
              :היקף המשרה
            </h3>
            <p className="mb-4 text-gray-800">{job.jobType} •</p>
            <h3 className="font-bold text-lg text-gray-700 mb-1">:שכר</h3>
            <p className="mb-4 text-gray-800">{job.jobSalary} •</p>
            <h3 className="font-bold text-lg text-gray-700 mb-1">:עיר</h3>
            <p className="mb-4 text-gray-800">{job.jobCity} •</p>
            <h3 className="font-bold text-lg text-gray-700 mb-1">:תחום</h3>
            <p className="mb-4 text-gray-800"> {job.jobField} •</p>
            <h3 className="font-bold text-lg text-gray-700 mb-1">:דרישות</h3>
            {requirements.map((requirement, index) => (
              <h3 key={index} className="flex flex-row-reverse text-right mb-2">
                <span>•</span>
                <span className="px-1">
                  <p className="inline">{requirement}</p>
                </span>
              </h3>
            ))}
            <h3 className="font-bold text-lg text-gray-700 mb-1">
              :מתי פורסמה
            </h3>
            <p className="mb-4 text-gray-800">
              {new Date(job.dueDate).toLocaleDateString("he-IL")} •
            </p>
          </div>
        </div>

        <button
          onClick={openModal}
          className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          הגש מועמדות
        </button>

        <Modal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          className="Modal relative p-6 rounded-lg text-right w-full md:max-w-4xl mx-auto"
          overlayClassName="Overlay fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
        >
          <div className="bg-white p-6 rounded-lg text-right relative">
            <button
              onClick={() => {
                closeModal();
              }}
              className="absolute top-4 left-4 text-gray-600 hover:text-gray-800"
              aria-label="Back"
            >
              <FaArrowLeft /> {/* Arrow icon */}
            </button>

            <h2 className="text-xl font-bold mb-4">
              הגשת מועמדות למשרת {job.jobTitle}
            </h2>

            {isCVsLoading ? (
              <p>Loading CVs...</p>
            ) : (
              <div className="mb-4">
                <h4 className="font-bold">בחר קובץ קו"ח:</h4>
                {cvListData?.data?.cvs
                  ?.slice(0, isMobile ? 2 : cvListData.data.cvs.length) // Show only 2 on mobile, all on larger screens
                  .map((cv) => (
                    <div
                      key={cv._id}
                      className={`flex justify-between items-center p-3 bg-gray-200 rounded-lg mb-2 ${
                        selectedCV === cv._id ? "bg-green-200" : ""
                      }`}
                      onClick={() => setSelectedCV(cv._id)}
                    >
                      <div>
                        <p className="text-sm text-gray-800">
                          {cv.fileName.length > 10
                            ? `${cv.fileName.slice(0, 10)}...`
                            : cv.fileName}
                        </p>
                        <p className="text-xs text-gray-500">
                          עודכן: {new Date(cv.uploadedAt).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex justify-around space-x-4 pt-2">
                        <button
                          onClick={() => window.open(cv.cvUrl, "_blank")}
                          className="flex items-center p-2 rounded-full bg-blue-500 text-xl text-white underline"
                        >
                          <FaFileDownload className="inline " />
                          {/* צפייה בקובץ */}
                        </button>
                        <button
                          onClick={() => handleDeleteCV(cv._id)}
                          className="flex items-center p-2 rounded-full bg-red-500 text-xl text-white underline"
                        >
                          <FaTrash className="inline " />
                        </button>
                        <button
                          onClick={() => setSelectedCV(cv._id)}
                          className={` underline text-5xl  ${
                            selectedCV === cv._id
                              ? "text-orange-500"
                              : "text-gray-500"
                          }`}
                        >
                          <CiCircleCheck />
                          {/* בחירת קובץ */}
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            )}

            <div className="flex justify-end mb-4">
              <button
                onClick={() => navigate("/profile/upload-cv")}
                className="inline-flex items-center px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
              >
                לניהול קבצי קו"ח באזור האישי
                <FaArrowLeft className="ml-2" />
              </button>
            </div>

            {isUserLoading ? (
              <p>Loading user details...</p>
            ) : isMobile ? (
              <>
                <div className="mb-4 p-4 bg-gray-100 rounded-lg text-center">
                  <div className="flex justify-between items-center mb-2">
                    <button
                      onClick={handleEditProfile}
                      className="text-blue-500 underline"
                    >
                      לצפיה
                    </button>
                    <h3 className="font-bold">
                      :מועמדותך תוגש עם הפרטים הבאים
                    </h3>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="mb-4 p-4 bg-gray-100 rounded-lg text-center">
                  <div className="flex justify-between items-center mb-2">
                    <button
                      onClick={handleEditProfile}
                      className="text-blue-500 underline"
                    >
                      עריכה
                    </button>
                    <h3 className="font-bold">
                      :מועמדותך תוגש עם הפרטים הבאים
                    </h3>
                  </div>
                  <ShowMyDetails userDetails={userDetails} />
                </div>
              </>
            )}

            <div className="mb-4">
              <textarea
                className="mt-4 w-full p-2 border rounded-lg"
                placeholder="הקלד את מכתב המקדים שלך כאן"
                rows="4"
                onChange={(e) => setCoverLetter(e.target.value)}
              />
            </div>

            <button
              onClick={handleSubmit}
              className="w-full px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
            >
              הגש מועמדות
            </button>
            {isApplying && <p>Submitting application...</p>}
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default JobPageApply;

function ShowMyDetails({ userDetails }) {
  return (
    <div className="flex justify-center border-t-2 pt-4">
      <p className="text-right">
        {userDetails?.data?.experience} <strong>:ניסיון</strong>
      </p>
      <span className="border-r border-orange-500 mx-3"></span>
      <p className="text-right">
        {userDetails?.data?.profession} <strong>:מקצוע</strong>
      </p>
      <span className="border-r border-orange-500 mx-3"></span>
      <p className="text-right">
        {userDetails?.data?.city} <strong>:עיר</strong>
      </p>
      <span className="border-r border-orange-500 mx-3"></span>
      <p className="text-right">
        {userDetails?.data?.phoneNumber} <strong>:טלפון נייד</strong>
      </p>
      <span className="border-r border-orange-500 mx-3"></span>
      <p className="text-right">
        {userDetails?.data?.email} <strong>:דואר אלקטרוני</strong>
      </p>
    </div>
  );
}
