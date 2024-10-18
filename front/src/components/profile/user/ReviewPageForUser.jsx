import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGetCandidateRatingsQuery } from "../../../slices/userApiSlice"; // Import the Redux query
import { FaArrowLeft, FaArrowRight } from "react-icons/fa"; // Import arrow icons
import BackArrow from "../../layout/BackArrow";
import Spinner from "../../layout/Spinner";

const ReviewsPage = () => {
  const { userId } = useParams(); // Get userId from the URL
  const navigate = useNavigate(); // For navigating back

  // State for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 5; // Number of reviews per page

  const {
    data: reviewsData,
    error,
    isLoading,
  } = useGetCandidateRatingsQuery(userId); // Use the Redux query
  //   (reviewsData?.data[0].ratings.resume);

  if (isLoading)
    return (
      <p>
        <Spinner />
      </p>
    );
  if (error)
    return (
      <div>
        <BackArrow color={"black"} url={-1} />{" "}
        <p>Failed to fetch reviews: {error.message}</p>
      </div>
    );

  // Calculate the reviews for the current page
  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = reviewsData.data.slice(
    indexOfFirstReview,
    indexOfLastReview
  );

  // Determine the total number of pages
  const totalPages = Math.ceil(reviewsData.data.length / reviewsPerPage);

  // Handle page change
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Handle next and previous buttons
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <div className="p-4">
      {/* Back arrow */}

      <BackArrow color={"black"} url={-1} />
      <div className="text-right">
        <h1 className="text-3xl font-bold p-3">הדירוגים שלי</h1>

        {/* Reviews */}
        {currentReviews && currentReviews.length > 0 ? (
          <div className="space-y-4">
            {currentReviews.map((review, index) => (
              <div key={index} className="p-4 bg-white shadow rounded">
                {/* <p className="text-lg font-bold">דירוג:</p> */}
                <p className="text-gray-600">
                  קורות חיים: {review.ratings.resume}
                </p>
                <p className="text-gray-600">
                  ראיון אישי: {review.ratings.interview}
                </p>
                <p className="text-gray-600">מבחנים: {review.ratings.tests}</p>
                <p className="text-gray-600 mt-2">הערות: {review.notes}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>אין ביקורות להצגה</p>
        )}

        {/* Pagination */}
        <div className="mt-8 flex justify-center items-center space-x-4">
          {/* Previous Page Arrow */}
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1} // Disable if on first page
            className={`px-4 py-2 border rounded ${
              currentPage === 1 ? "cursor-not-allowed opacity-50" : ""
            }`}
          >
            <FaArrowLeft />
          </button>

          {/* Page numbers */}
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => paginate(i + 1)}
              className={`px-4 py-2 border rounded ${
                currentPage === i + 1 ? "bg-gray-300" : "bg-white"
              }`}
            >
              {i + 1}
            </button>
          ))}

          {/* Next Page Arrow */}
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages} // Disable if on last page
            className={`px-4 py-2 border rounded ${
              currentPage === totalPages ? "cursor-not-allowed opacity-50" : ""
            }`}
          >
            <FaArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewsPage;
