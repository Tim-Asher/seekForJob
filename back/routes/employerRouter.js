const express = require("express");
const EmployerController = require("../controllers/EmployerController");
// const authForEmployer = require("../middlewares/authForEmployer");
const authController = require("../controllers/authController");
const router = express.Router();

// רגיסטר+העלת תמונה
router.post(
  "/register",
  // upload.single("companyLogo"),
  EmployerController.createEmployerUser
);
router.get("/logout", authController.logOut);
router.post("/login", EmployerController.loginEmployer);
router.get(
  "/getEmployerProfile",
  authController.protect,
  EmployerController.getEmployerProfile
);
router.post(
  "/:employerId/reviews",
  authController.protect,
  EmployerController.addEmployerReview
);
router.get(
  "/employerReviews/:employerId",
  EmployerController.getCandidateRatings
);
router.get(
  "/employer-details/:employerId",
  EmployerController.getEmployerDetailsForJob
);
router
  .route("/updateProfilePicture")
  .put(authController.protect, EmployerController.updateProfilePicture);

router.get(
  "/get-profile-picture",
  authController.protect,
  EmployerController.getProfilePicture
);

router
  .route("/updateEmployerProfile")
  .patch(authController.protect, EmployerController.updateEmployerProfile);
router.post("/forgotPassword", EmployerController.forgotPassword);
router.post("/resetPassword/:token", EmployerController.resetPassword);
router.post(
  "/resetPassword/:plainResetToken",
  EmployerController.resetPassword
);
router
  .route("/updateEmployerProfile")
  .put(authController.protect, EmployerController.updateEmployerProfile);
router.get("/employers/logout", (req, res) => {
  res.clearCookie("jwt", {
    secure: true,
    sameSite: "none",
  });
  res.status(200).json({ message: "Logged out successfully" });
});
router.get("/", EmployerController.getEmployers);
router.get("/:id", EmployerController.getEmployerById);

module.exports = router;
