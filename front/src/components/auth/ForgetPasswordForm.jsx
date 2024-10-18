// Mine 9.8
import React, { useContext, useState } from "react";
import PageContext from "../../context/pagesContext";
import { useForgotPasswordMutation } from "../../slices/authApiSlice";
import BackArrow from "../layout/BackArrow";
import { FaArrowLeft } from "react-icons/fa";

const ForgetPasswordForm = () => {
  const [email, setEmail] = useState("");
  const { setShowForgetPasswordForm, successToast, errorToast } =
    useContext(PageContext);
  const [forgotPassword] = useForgotPasswordMutation();
  const handleForgetPasswordForm = (e) => {
    e.preventDefault();
    forgotPassword({ email }).then((res) => {
      if (res.data) {
        successToast("Passwordhas been sent to your email.");
        setShowForgetPasswordForm(false);
      } else {
        errorToast("Email is not found!");
      }
    });
  };
  return (
    <div>
      <FaArrowLeft
        className="text-white cursor-pointer mb-6 drop-shadow-outline"
        size={30}
        onClick={() => setShowForgetPasswordForm(false)} // Navigate back to profile
      />
      <form
        className="space-y-4 md:space-y-6"
        onSubmit={handleForgetPasswordForm}
      >
        <h1 className=" drop-shadow-outline text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
          Forgot Password ?
        </h1>
        <div>
          <label
            htmlFor="email"
            className="block mb-2 font-bold text-white drop-shadow-outline"
          >
            Your email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className="bg-gray-50/60 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5"
            placeholder="name@company.com"
            required
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>

        <button
          type="submit"
          className="w-full drop-shadow-outline text-white bg-primary-500 hover:bg-primary-500/90 focus:ring-4 focus:outline-none focus:ring-primary-300 font-bold rounded-tr-xl rounded-bl-xl  px-5 py-2.5 text-center "
        >
          <p className="drop-shadow-outline">Reset Password</p>
        </button>
      </form>
    </div>
  );
};

export default ForgetPasswordForm;
