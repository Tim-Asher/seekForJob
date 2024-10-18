import React, { useContext, useEffect, useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebase-config";
import { FaUserCircle, FaLock, FaFileAlt, FaStar } from "react-icons/fa";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  useGetUserDataQuery,
  useUpdateUserMutation,
} from "../slices/userApiSlice";
import BackArrow from "../components/layout/BackArrow";
import PageContext from "../context/pagesContext";

const ProfilePage = () => {
  const [firstName, setFirstName] = useState("Guest");
  const [lastName, setLastName] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const { successToast, errorToast } = useContext(PageContext);
  const [file, setFile] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const isMainRoute = location.pathname === "/profile";
  const { isLogin, userData } = useContext(PageContext);

  const [updateUser] = useUpdateUserMutation(); // Mutation to update user data

  useEffect(() => {
    if (userData) {
      setFirstName(userData.firstName);
      setLastName(userData.lastName);
      setProfilePicture(userData.profilePicture); // Set profile picture from user data
    }
  }, [userData]);

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];
    if (
      selectedFile &&
      ["image/png", "image/jpeg", "image/jpg"].includes(selectedFile.type)
    ) {
      setFile(selectedFile);
      await handleUpload(selectedFile);
    } else {
      errorToast("Please upload a valid PNG, JPG, or JPEG file.");
      setFile(null);
    }
  };

  const handleUpload = async (selectedFile) => {
    const storageRef = ref(
      storage,
      `profile-pictures/${Date.now()}_${selectedFile.name}`
    );
    const uploadTask = uploadBytesResumable(storageRef, selectedFile);

    uploadTask.on(
      "state_changed",
      null,
      (error) => {
        console.error("Error uploading file:", error);
        errorToasts("Error uploading file.");
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        setProfilePicture(downloadURL);

        // Update the user profile picture URL in MongoDB
        try {
          await updateUser({ profilePicture: downloadURL }).unwrap();
          successToast("Profile picture updated successfully.");
        } catch (error) {
          console.error("Failed to save profile picture:", error);
          errorToast("Failed to save profile picture.");
        }
      }
    );
  };

  const handleNavigateToRatings = () => {
    if (userData) {
      navigate(`/profile/reviews/${userData._id}`);
    } else {
      errorToast("User ID not found, unable to navigate.");
    }
  };

  const handleNavigateToJobApplied = () => {
    if (userData) {
      navigate(`/profile/job-applied/${userData._id}`);
    } else {
      errorToast("User ID not found, unable to navigate.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 text-right">
      <div className="bg-gradient-to-b from-gray-700 to-gray-900 py-8">
        <div className="px-6">
          <BackArrow color={"white"} url={"/"} />
        </div>
        <div className="relative flex flex-col items-center">
          <div className="relative w-32 h-32">
            {profilePicture ? (
              <img
                src={profilePicture}
                alt="Profile"
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <FaUserCircle className="text-white" size={128} />
            )}
            <input
              type="file"
              accept="image/png, image/jpeg, image/jpg"
              onChange={handleFileChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
          </div>
          <h2 className="text-white text-2xl font-semibold mt-2">
            {firstName} {lastName}
          </h2>
        </div>
      </div>
      <Outlet />
      {isMainRoute && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-8 max-w-4xl mx-auto">
          <ProfileCard
            icon={<FaUserCircle size={30} />}
            label="הפרופיל שלי"
            onClick={() => {
              const user = userData;
              navigate("edit-profile", { state: { user } });
            }}
          />
          <ProfileCard
            icon={<FaLock size={30} />}
            label="הגדרות חשבון ופרטיות"
            onClick={() => navigate("account-settings")}
          />
          <ProfileCard
            icon={<FaFileAlt size={30} />}
            label="קורות החיים שלי"
            onClick={() => navigate("upload-cv")}
          />
          <ProfileCard
            icon={<FaFileAlt size={30} />}
            label="משרות שהגשתי אליהן"
            onClick={handleNavigateToJobApplied}
          />
          <ProfileCard
            icon={<FaStar size={30} />}
            label="הדירוגים שלי"
            onClick={handleNavigateToRatings}
          />
        </div>
      )}
    </div>
  );
};

const ProfileCard = ({ icon, label, onClick }) => {
  return (
    <div
      className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center justify-center text-center hover:shadow-xl transition-shadow cursor-pointer"
      onClick={onClick}
    >
      <div className="text-cyan-500">{icon}</div>
      <span className="mt-4 text-lg font-semibold">{label}</span>
    </div>
  );
};

export default ProfilePage;
