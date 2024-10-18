import React, { useContext, useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import eye icons
import PageContext from "../../context/pagesContext";
import EmployerEmployeeGroupBtns from "./EmployerEmployeeGroupBtns";
import { useLoginMutation } from "../../slices/authApiSlice";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false); // State for "Remember Me"
  const [showPassword, setShowPassword] = useState(false); // State for password visibility

  const [login] = useLoginMutation();

  const {
    setOpenLogRegModal,
    setIsLogin,
    setWhosLogin,
    selectedLoginType,
    setShowForgetPasswordForm,
    setShowRegisterForm,
    successToast,
    errorToast,
    setUserData,
  } = useContext(PageContext);

  // Load email from localStorage if it exists
  useEffect(() => {
    const savedEmail = localStorage.getItem("savedEmail");
    if (savedEmail) {
      setEmail(savedEmail);
      setRememberMe(true);
    }
  }, []);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    login({ email, password }).then((res) => {
      if (res.data) {
        successToast("Login Successfuly");
        setOpenLogRegModal(false);
        setIsLogin(true);
        selectedLoginType === "employee"
          ? setWhosLogin("employee")
          : setWhosLogin("employer");
        setUserData(res.data.data);
      } else {
        errorToast("Email or Password has not been found!");
        setEmail("");
        setPassword("");
      }
    });
  };

  return (
    <form className="space-y-4 md:space-y-6" onSubmit={handleLoginSubmit}>
      <div className="flex justify-center">{<EmployerEmployeeGroupBtns />}</div>
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
          className="bg-gray-50/60 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
          placeholder="name@company.com"
          required
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
      </div>
      <div className="relative">
        <label
          htmlFor="password"
          className="block mb-2 font-bold text-white drop-shadow-outline"
        >
          Password
        </label>
        <input
          type={showPassword ? "text" : "password"} // Toggle input type
          name="password"
          placeholder="••••••••"
          className="bg-gray-50/60 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5"
          required
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        {/* Eye icon for toggling password visibility */}
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)} // Toggle the showPassword state
          className="absolute right-2 top-2/3 transform -translate-y-1/2"
        >
          {showPassword ? <FaEyeSlash /> : <FaEye />}{" "}
          {/* Show the appropriate icon */}
        </button>
      </div>
      <div className="flex flex-col items-center justify-between sm:flex-row">
        <div className="flex  items-center">
          <div className="flex  items-center h-5">
            <input
              id="remember"
              aria-describedby="remember"
              type="checkbox"
              className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 "
              checked={rememberMe} // Bind checkbox state
              onChange={() => setRememberMe(!rememberMe)} // Toggle rememberMe state
            />
          </div>
          <div className="ml-3 ">
            <label
              htmlFor="remember"
              className="font-medium text-white drop-shadow-outline"
            >
              Remember me
            </label>
          </div>
        </div>
        <button
          type="button"
          onClick={() => {
            setShowForgetPasswordForm(true);
          }}
          className="drop-shadow-outline font-bold text-white hover:underline "
        >
          Forget Password?
        </button>
      </div>
      <button
        type="submit"
        className="w-full drop-shadow-outline text-white bg-primary-500 hover:bg-primary-500/90 focus:ring-4 focus:outline-none focus:ring-primary-300 font-bold rounded-tr-xl rounded-bl-xl  px-5 py-2.5 text-center "
      >
        <p className="drop-shadow-outline">Sign in</p>
      </button>
      <p className="text-sm font-semibold text-gray-100 drop-shadow-outline ">
        Don’t have an account yet?{" "}
        <button
          type="button"
          onClick={() => {
            setShowRegisterForm(true);
          }}
          className="text-base font-bold text-white hover:underline "
        >
          Sign up
        </button>
      </p>
    </form>
  );
};

export default LoginForm;
