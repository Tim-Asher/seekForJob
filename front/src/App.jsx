import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "./context/pagesContext";
// import Footer from "./components/Footer";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
// import ThankYouPage from "./pages/ThankYouPage";
// import Spinner from "./components/Spinner";

// Lazy loaded components
const UploadCV = lazy(() => import("./components/profile/user/UploadCV"));
const ThankYouPage = lazy(() => import("./pages/ThankYouPage"));
const Spinner = lazy(() => import("./components/layout/Spinner"));
const Footer = lazy(() => import("./components/layout/Footer"));
const ResetPassword = lazy(() => import("./pages/resetPasswordPage"));
const ProfilePage = lazy(() => import("./pages/ProfileFormUser"));
const EditProfile = lazy(() => import("./components/profile/user/editProfile"));
const AccountSettings = lazy(() => import("./components/auth/AccountSettings"));
const ProfilePageEmployer = lazy(() => import("./pages/ProfileFormEmployer"));
const EditEmployerProfile = lazy(() =>
  import("./components/profile/employer/EmployerEditProfile")
);
const NewMainMenu = lazy(() => import("./components/layout/NewMainMenu"));
const LoginRegisterModal = lazy(() =>
  import("./components/auth/LoginRegisterModal")
);
const Home = lazy(() => import("./pages/Home"));
const ResumeBuilder = lazy(() => import("./pages/ResumeBuilder"));
const SearchUserByEmployer = lazy(() =>
  import("./components/profile/employer/SearchUserByEmployer")
);
const ManageJobsPage = lazy(() =>
  import("./components/profile/employer/ManageJobs")
);
const UserJobStatus = lazy(() =>
  import("./components/profile/employer/UserJobStatus")
);
const RatingsPage = lazy(() =>
  import("./components/profile/employer/RatingsPage")
);
const JobApplied = lazy(() => import("./components/profile/user/jobApplied"));
const Alljobs = lazy(() => import("./pages/Alljobs"));
const ReviewsPage = lazy(() =>
  import("./components/profile/user/ReviewPageForUser")
);
const EmployerReviewsPage = lazy(() =>
  import("./components/profile/employer/ReviewPageEmployer")
);
const AddJobModal = lazy(() =>
  import("./components/profile/employer/AddJobModal")
);
const EmployerList = lazy(() => import("./pages/EmployerList"));
const EmployerDetails = lazy(() => import("./pages/EmployerDetails"));
const About = lazy(() => import("./pages/About"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Accessibility = lazy(() => import("./pages/Accessibility"));
const UserAgreement = lazy(() => import("./pages/UserAgreement"));
const JobPageApply = lazy(() => import("./pages/JobPageApply"));

function App() {
  return (
    <Provider>
      <Router>
        <div className="App">
          <ToastContainer />
          <Suspense
            fallback={
              <div>
                <Spinner />
              </div>
            }
          >
            <NewMainMenu />

            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="employer-page" element={<EmployerList />}>
                <Route path=":id" element={<EmployerDetails />} />
              </Route>
              <Route path="/Accessibility" element={<Accessibility />} />
              <Route path="/Privacy" element={<Privacy />} />
              <Route path="/UserAgreement" element={<UserAgreement />} />
              <Route path="/all-jobs" element={<Alljobs />} />
              <Route path="/jobApply/:id" element={<JobPageApply />} />
              <Route path="/resetPassword" element={<ResetPassword />} />
              <Route path="/resume-builder" element={<ResumeBuilder />} />
              <Route path="/thank-you" element={<ThankYouPage />} />

              <Route path="/profile" element={<ProfilePage />}>
                <Route path="edit-profile" element={<EditProfile />} />
                <Route path="account-settings" element={<AccountSettings />} />
                <Route path="upload-cv" element={<UploadCV />} />
                <Route
                  path="/profile/reviews/:userId"
                  element={<ReviewsPage />}
                />
                <Route
                  path="/profile/job-applied/:userId"
                  element={<JobApplied />}
                />
              </Route>
              <Route path="/employer-profile" element={<ProfilePageEmployer />}>
                <Route
                  path="EditEmployerProfile"
                  element={<EditEmployerProfile />}
                />
                <Route
                  path="searchUserByEmployer"
                  element={<SearchUserByEmployer />}
                />
                <Route
                  path="/employer-profile/employer-reviews/:employerId"
                  element={<EmployerReviewsPage />}
                />
                <Route path="account-settings" element={<AccountSettings />} />
                <Route path="manage-jobs" element={<ManageJobsPage />} />
                <Route path="add-job" element={<AddJobModal />} />
                <Route
                  path="/employer-profile/manage-jobs/:jobId/UserJobStatus"
                  element={<UserJobStatus />}
                />
                <Route
                  path="/employer-profile/ratings/:userId"
                  element={<RatingsPage />}
                />
              </Route>
              <Route path="/about" element={<About />} />
            </Routes>
            <Footer />
          </Suspense>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
