// Mine 9.8
import React, { useContext } from "react";
import PageContext from "../../context/pagesContext";
import { IoIosClose } from "react-icons/io";

import ForgetPasswordForm from "./ForgetPasswordForm";

import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

const LoginResiterForm = () => {
  const {
    setOpenLogRegModal,
    showForgetPasswordForm,
    setShowForgetPasswordForm,
    showRegisterForm,
  } = useContext(PageContext);

  const closeModal = () => {
    setOpenLogRegModal(false);
    setShowForgetPasswordForm(false);
  };

  return (
    <section className="bg-gray-300/30 rounded-2xl backdrop-blur border border-gray-400/40 shadow">
      <button
        type="button"
        data-autofocus
        onClick={closeModal}
        className="inline-flex w-full justify-center rounded-md p-4 text-sm font-semibold text-white sm:mt-0 sm:w-auto"
      >
        <IoIosClose
          onClick={closeModal}
          className="text-4xl text-white text-right rounded-md ring-1 ring-gray-500 bg-gray-500/30 hover:bg-gray-500/20"
        />
      </button>
      <div className="flex flex-col items-center justify-center px-6 pb-8 mx-auto ">
        {/* bg-gradient-to-tl from-orange-300 via-orange-400 to-orange-500 */}
        <div className="w-full rounded-lg shadow md:mt-0  sm:max-w-md xl:p-0   bg-gradient-to-tl from-orange-300 via-orange-400 to-orange-500">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            {showRegisterForm ? (
              <RegisterForm />
            ) : showForgetPasswordForm ? (
              <ForgetPasswordForm />
            ) : (
              <LoginForm />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginResiterForm;
