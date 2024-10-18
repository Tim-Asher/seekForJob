import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { FaMapMarkerAlt } from "react-icons/fa";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useGetEmployerByIdQuery } from "../slices/employerApiSlice";
import axios from "axios";
import { useGetAllJobsByEmployerIdQuery } from "../slices/jobApiSlice";
import BackArrow from "../components/layout/BackArrow";

const EmployerDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { employer } = location.state || {};

  const { data: companyJobPosts } = useGetAllJobsByEmployerIdQuery(id);

  const [currentJobPage, setCurrentJobPage] = useState(1);
  const [currentCommentPage, setCurrentCommentPage] = useState(1);
  const [selectedJob, setSelectedJob] = useState(null);
  const [expandedComment, setExpandedComment] = useState(null);
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [resume, setResume] = useState(null);
  const [companyLocation, setCompanyLocation] = useState(null);

  const customIcon = new L.divIcon({
    html: `<div style="font-size:45px;color:OrangeRed;"><i class="fa fa-map-marker-alt"></i></div>`,
    iconSize: [30, 30], // Size of the icon
    iconAnchor: [15, 30], // Anchor point of the icon
    className: "", // Remove default Leaflet styles
  });

  const {
    companyName,
    companyLogo,
    companySize,
    companyDescription,
    companyAdress,
    companyCity,
    companyContact,
    reviesAvg,
    reviews,
  } = employer || {};

  const jobsPerPage = 3;
  const commentsPerPage = 3;

  useEffect(() => {
    if (employer) {
      const getLatLng = async () => {
        const apiKey = import.meta.env.VITE_API_WEATERMAP; // Place your API key here
        const url = `https://api.openweathermap.org/geo/1.0/direct?q=${companyCity},il&limit=1&appid=${apiKey}`;

        try {
          const response = await axios.get(url);

          const { lat, lon } = response.data[0];

          return { lat, lng: lon };
        } catch (error) {
          console.error("Error fetching geolocation:", error);
          return null;
        }
      };
      if (employer.companyAdress) {
        getLatLng().then((location) => {
          setCompanyLocation({ lat: location.lat, lng: location.lng });
        });
      }
    }
  }, [employer]);

  const indexOfLastJob = currentJobPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = companyJobPosts?.data.slice(
    indexOfFirstJob,
    indexOfLastJob
  );

  const indexOfLastComment = currentCommentPage * commentsPerPage;
  const indexOfFirstComment = indexOfLastComment - commentsPerPage;
  const currentComments = reviews?.slice(
    indexOfFirstComment,
    indexOfLastComment
  );

  const totalJobPages = Math.ceil(companyJobPosts?.data.length / jobsPerPage);
  const totalCommentPages = Math.ceil(reviews.length / commentsPerPage);

  const handleApply = (job) => {
    navigate(`/jobApply/${job._id}`, { state: { job } });
  };

  const calculateAvg = (ratings) => {
    const { process, responseTime, attitude } = ratings;
    const total = process + responseTime + attitude;
    const average = total / 3;
    return Math.round(average); // Round to nearest whole number for star rendering
  };
  return (
    <div className="container mx-auto p-4" style={{ direction: "rtl" }}>
      <div className="flex justify-end">
        <BackArrow url={-1} />
      </div>
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="flex flex-col md:flex-row items-center md:items-start">
          <img
            src={employer?.companyLogo}
            alt={employer?.companyName}
            className="w-24 h-24 md:w-32 md:h-32 rounded-full mx-auto md:mx-0"
          />
          <div className="md:mr-6 text-center md:text-right">
            <h2 className="text-2xl font-bold text-orange-600">
              {employer?.companyName}
            </h2>
            <p className="text-gray-700">{employer?.companySize} עובדים</p>
            <p className="text-gray-700">{employer?.companyDescription}</p>
          </div>
        </div>
        <div className="mt-6">
          <h3 className="text-xl font-bold mb-2">מיקום</h3>
          <div className="h-64">
            {companyLocation && (
              <MapContainer
                center={[companyLocation.lat, companyLocation.lng]}
                zoom={13}
                scrollWheelZoom={false}
                className="h-full w-full z-0"
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker
                  position={[companyLocation.lat, companyLocation.lng]}
                  icon={customIcon}
                >
                  <Popup>{employer?.companyName}</Popup>
                </Marker>
              </MapContainer>
            )}
          </div>
        </div>
        <div className="mt-6">
          <h3 className="text-xl font-bold mb-2">
            משרות פתוחות ({companyJobPosts?.data.length || 0})
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {currentJobs?.map((job) => (
              <div
                key={job._id}
                className="bg-gray-100 p-4 rounded-lg shadow-md"
              >
                <h4 className="text-lg font-bold">{job.jobTitle}</h4>
                <button
                  className="mt-2 px-4 py-2 bg-orange-500 text-white rounded-lg"
                  onClick={() => setSelectedJob(job)}
                >
                  פרטים נוספים
                </button>
                <button
                  className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg"
                  onClick={() => handleApply(job)}
                >
                  הגש מועמדות
                </button>
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-4">
            {Array.from({ length: totalJobPages }, (_, index) => (
              <button
                key={index}
                className={`mx-1 px-3 py-1 rounded-full ${
                  currentJobPage === index + 1
                    ? "bg-orange-500 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
                onClick={() => setCurrentJobPage(index + 1)}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
        {selectedJob && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full md:w-1/2 lg:w-1/3">
              <h3 className="text-2xl font-bold mb-2">
                {selectedJob.jobTitle}
              </h3>
              <p className="text-gray-700">{selectedJob.jobDescription}</p>
              <button
                className="mt-4 px-4 py-2 bg-orange-500 text-white rounded-lg"
                onClick={() => setSelectedJob(null)}
              >
                סגור
              </button>
            </div>
          </div>
        )}
        {isApplyModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full md:w-1/2 lg:w-1/3">
              <h3 className="text-2xl font-bold mb-4">
                הגשת מועמדות ל{selectedJob.jobTitle}
              </h3>
              <input type="file" onChange={handleResumeChange} />
              <button
                className="mt-4 px-4 py-2 bg-green-500 text-white rounded-lg"
                onClick={handleSubmitApplication}
              >
                שלח מועמדות
              </button>
              <button
                className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg"
                onClick={() => setIsApplyModalOpen(false)}
              >
                ביטול
              </button>
            </div>
          </div>
        )}
        <div className="mt-6">
          <h3 className="text-xl font-bold mb-2">דירוג ממוצע</h3>
          <div className="flex items-center">
            {Array.from({ length: 5 }, (_, index) => (
              <svg
                key={index}
                className={`w-6 h-6 ${
                  index < reviesAvg ? "text-orange-500" : "text-gray-300"
                }`}
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 .587l3.668 7.568L24 9.432l-6 5.849 1.413 8.223L12 18.9l-7.413 4.604L6 15.281 0 9.432l8.332-1.277L12 .587z" />
              </svg>
            ))}
          </div>
          <div className="mt-6">
            <h3 className="text-xl font-bold mb-2">
              תגובות משתמשים ({reviews.length})
            </h3>

            {/* קומנטים בלי אנימציה עובד*/}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {currentComments.map((comment, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-lg">
                  <p className="font-bold">
                    <span>
                      {comment.userId.firstName
                        ? `${comment.userId.firstName} ${comment.userId.lastName}`
                        : `${comment.userId}`}
                    </span>
                  </p>
                  <p className="text-gray-500 text-sm">
                    {new Date(comment.dueDate).toLocaleDateString()}
                  </p>

                  <div className="flex mb-2">
                    {Array.from(
                      { length: calculateAvg(comment.ratings) },
                      (_, index) => (
                        <svg
                          key={index}
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          className="w-5 h-5 text-yellow-500"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.945a1 1 0 00.95.69h4.29c.97 0 1.372 1.24.588 1.81l-3.47 2.522a1 1 0 00-.364 1.118l1.287 3.945c.3.92-.755 1.688-1.538 1.118l-3.47-2.522a1 1 0 00-1.176 0l-3.47 2.522c-.783.57-1.838-.198-1.538-1.118l1.286-3.945a1 1 0 00-.364-1.118L2.83 9.372c-.783-.57-.38-1.81.588-1.81h4.29a1 1 0 00.95-.69l1.286-3.945z" />
                        </svg>
                      )
                    )}
                  </div>

                  <p className="text-gray-700">
                    {expandedComment === index
                      ? comment.notes
                      : comment.notes.length > 100
                      ? `${comment.notes.slice(0, 100)}...`
                      : comment.notes}
                  </p>
                  {comment.notes.length > 100 && (
                    <button
                      className="text-orange-500"
                      onClick={() =>
                        setExpandedComment(
                          expandedComment === index ? null : index
                        )
                      }
                    >
                      {expandedComment === index ? "הצג פחות" : "קרא עוד"}
                    </button>
                  )}
                </div>
              ))}
            </div>

            <div className="flex justify-center mt-4">
              {currentCommentPage > 1 && (
                <button
                  onClick={() => setCurrentCommentPage(currentCommentPage - 1)}
                ></button>
              )}
              {Array.from({ length: totalCommentPages }, (_, index) => (
                <button
                  key={index}
                  className={`mx-1 px-3 py-1 rounded-full ${
                    currentCommentPage === index + 1
                      ? "bg-orange-500 text-white"
                      : "bg-gray-200 text-gray-700"
                  }`}
                  onClick={() => {
                    setCurrentCommentPage(index + 1);
                    setExpandedComment(null);
                  }}
                >
                  {index + 1}
                </button>
              ))}
              {currentCommentPage < totalCommentPages && (
                <button
                  onClick={() => setCurrentCommentPage(currentCommentPage + 1)}
                ></button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployerDetails;
