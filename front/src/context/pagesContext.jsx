import React, { createContext, useState } from "react";
import { toast } from "react-toastify";

const PageContext = createContext();

const Provider = ({ children }) => {
  // State to manage user login and registration
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [activeJob, setActiveJob] = useState(null);
  const [editingJob, setEditingJob] = useState(null);

  // State to manage login/register modal
  const [openLogRegModal, setOpenLogRegModal] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [whosLogin, setWhosLogin] = useState("");
  const [failedLogin, setFailedLogin] = useState(false);
  const [selectedLoginType, setSelectedLoginType] = useState("employee");
  const [showForgetPasswordForm, setShowForgetPasswordForm] = useState(false);
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [isOtpModalOpen, setOtpModalOpen] = useState(false);
  const [userData, setUserData] = useState({});

  // State to manage employer login and registration
  const [isEmployerLoginOpen, setIsEmployerLoginOpen] = useState(false);
  const [isEmployerRegisterOpen, setIsEmployerRegisterOpen] = useState(false);

  const successToast = (text) =>
    toast.success(text, {
      toastId: text,
      position: "top-center",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      closeButton: false,
      theme: "dark",
    });

  const errorToast = (text) =>
    toast.error(text, {
      toastId: text,
      position: "top-center",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      closeButton: false,
      theme: "dark",
    });

  const confirmToast = (text) => {
    return new Promise((resolve, reject) => {
      toast(
        <div>
          <p>{text}</p>
          <div className="flex justify-between">
            <button
              onClick={() => {
                resolve(true); // Resolve the promise with true if Yes is clicked
                toast.dismiss(); // Close the toast after clicking Yes
              }}
            >
              Yes
            </button>
            <button
              onClick={() => {
                resolve(false); // Resolve the promise with false if No is clicked
                toast.dismiss(); // Close the toast after clicking No
              }}
            >
              No
            </button>
          </div>
        </div>,
        {
          position: "top-center",
          autoClose: false,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
          theme: "dark",
        }
      );
    });
  };

  function getCookie(name) {
    const cookies = document.cookie.split(";");

    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();

      // Check if the cookie starts with the desired name
      if (cookie.startsWith(`${name}=`)) {
        return cookie.substring(name.length + 1); // Return the cookie value
      }
    }

    return null; // Return null if the cookie is not found
  }

  return (
    <PageContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        isLoginOpen,
        setIsLoginOpen,
        isRegisterOpen,
        setIsRegisterOpen,
        isEmployerLoginOpen,
        setIsEmployerLoginOpen,
        isEmployerRegisterOpen,
        setIsEmployerRegisterOpen,
        activeJob,
        setActiveJob,
        editingJob,
        setEditingJob,

        openLogRegModal,
        setOpenLogRegModal,
        isLogin,
        setIsLogin,
        whosLogin,
        setWhosLogin,
        failedLogin,
        setFailedLogin,
        selectedLoginType,
        setSelectedLoginType,
        showForgetPasswordForm,
        setShowForgetPasswordForm,
        showRegisterForm,
        setShowRegisterForm,
        isOtpModalOpen,
        setOtpModalOpen,
        successToast,
        errorToast,
        confirmToast,
        getCookie,
        userData,
        setUserData,
      }}
    >
      {children}
    </PageContext.Provider>
  );
};

export { Provider };
export default PageContext;