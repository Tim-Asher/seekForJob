import React from "react";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="w-full flex flex-col items-center justify-evenly my-10 text-right gap-2 md:gap-0 md:flex-row">
        <ul>
          <li>
            <h5 className="text-2xl font-bold">
              <button
                onClick={() => {
                  window.scrollTo(0, 0);
                  navigate("Accessibility");
                }}
              >
                הצהרת נגישות
              </button>
            </h5>
          </li>
        </ul>
        <ul>
          <li>
            <h5 className="text-2xl font-bold">
              <button
                onClick={() => {
                  window.scrollTo(0, 0);
                  navigate("Privacy");
                }}
              >
                מדיניות פרטיות
              </button>
            </h5>
          </li>
        </ul>
        <ul>
          <li>
            <h5 className="text-2xl font-bold">
              <button
                onClick={() => {
                  window.scrollTo(0, 0);
                  navigate("UserAgreement");
                }}
              >
                תנאי שימוש
              </button>
            </h5>
          </li>
        </ul>
        <ul>
          <li>
            <h5 className="text-2xl font-bold">
              <button
                onClick={() => {
                  window.scrollTo(0, 0);
                  navigate("About");
                }}
              >
                אודות
              </button>
            </h5>
          </li>
        </ul>
      </div>
      <div className="flex flex-col items-center ">
        <div className="flex items-center justify-center py-4">
          <span className="absolute px-3 text-center font-medium text-gray-900 -translate-x-1/2 left-1/2 rounded-full bg-[#f18c19]">
            כל הזכויות שמורות לחברת טימי בע"מ - אלכס יופית 2, מגדל מליני, ערד
          </span>
        </div>
        <div className="w-full">
          <div className="flex justify-around items-center">
            <img
              src="/images/jobSeekLogoNew.png"
              alt="JobSeek"
              className="h-32"
            />
            <ul className="flex">
              <li>
                <a href="http://facebook.com/JobSeek">
                  <i className="bx bx-lg bxl-facebook-circle"></i>
                </a>
              </li>
              <li>
                <a href="http://linkedin.com/JobSeek">
                  <i className="bx bx-lg bxl-linkedin-square"></i>
                </a>
              </li>
              <li>
                <a href="http://youtube.com/JobSeek">
                  <i className="bx bx-lg bxl-youtube"></i>
                </a>
              </li>
              <li>
                <a href="http://tiktok.com/JobSeek">
                  <i className="bx bx-lg bxl-tiktok"></i>
                </a>
              </li>
              <li>
                <a href="http://instagram.com/JobSeek">
                  <i className="bx bx-lg bxl-instagram-alt"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
