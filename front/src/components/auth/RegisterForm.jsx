import React, { useContext, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import eye icons
import EmployerEmployeeGroupBtns from "./EmployerEmployeeGroupBtns";
import PageContext from "../../context/pagesContext";
import { useCreateEmployerMutation } from "../../slices/employerApiSlice";
import { useCreateUserMutation } from "../../slices/userApiSlice";

const RegisterForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [companyName, setCompanyName] = useState("");

  const {
    setShowRegisterForm,
    selectedLoginType,
    setOpenLogRegModal,
    setIsLogin,
    successToast,
    errorToast,
  } = useContext(PageContext);

  const [createUser] = useCreateUserMutation();
  const [createEmployer] = useCreateEmployerMutation();

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    const registerAction =
      selectedLoginType === "employee" ? createUser : createEmployer;
    registerAction({
      email,
      password,
      confirmPassword,
    }).then((res) => {
      if (res.data) {
        successToast("Account has Been Created");
        setShowRegisterForm(false);
        // setOpenLogRegModal(false);
        // setIsLogin(true);
      } else {
        errorToast("Failed to Register");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
      }
    });
  };

  return (
    <form className="space-y-4 md:space-y-6" onSubmit={handleRegisterSubmit}>
      <div className="flex justify-center">
        <EmployerEmployeeGroupBtns />
      </div>
      <MyInput type={email} placeholder={"Email"} setFunc={setEmail} />
      <MyInput
        type={password}
        placeholder={"Password"}
        setFunc={setPassword}
        isPassword={true}
      />
      <MyInput
        type={confirmPassword}
        placeholder={"Confirm Password"}
        setFunc={setConfirmPassword}
        isPassword={true}
      />
      <button
        type="submit"
        className="w-full drop-shadow-outline text-white bg-primary-500 hover:bg-primary-500/90 focus:ring-4 focus:outline-none focus:ring-primary-300 font-bold rounded-tr-xl rounded-bl-xl  px-5 py-2.5 text-center "
      >
        <p className="drop-shadow-outline">Sign Up</p>
      </button>
      <p className="text-sm font-semibold text-gray-100 drop-shadow-outline ">
        Don’t have an account yet?{" "}
        <button
          type="button"
          onClick={() => {
            setShowRegisterForm(false);
          }}
          className="text-base font-bold text-white hover:underline "
        >
          Log In
        </button>
      </p>
    </form>
  );
};

export default RegisterForm;

function MyInput({ type, placeholder, setFunc, isPassword }) {
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

  return (
    <div className="relative">
      <input
        placeholder={placeholder}
        type={isPassword && !showPassword ? "password" : "text"} // Toggle password visibility
        className="bg-gray-50/60 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5"
        required
        value={type}
        onChange={(e) => {
          setFunc(e.target.value);
        }}
      />
      {isPassword && (
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)} // Toggle the showPassword state
          className="absolute right-2 top-1/2 transform -translate-y-1/2"
        >
          {showPassword ? <FaEye /> : <FaEyeSlash />}{" "}
          {/* Show the appropriate icon */}
        </button>
      )}
    </div>
  );
}
