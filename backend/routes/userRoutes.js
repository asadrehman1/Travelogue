const express = require("express");
const {
  registerUser,
  loginUser,
  logoutUser,
  forgotPassword,
  resetPassword,
  getUserDetails,
  updatePassword,
  updateProfile,
  getAllUsers,
  getSingleUser,
  updateUserRole,
  deleteUser,
  getAllUnapprovedUsers,
  updateApprovelStatus,
  getUser,
  getSingleBlogUser,
  contact
} = require("../controllers/userController");
const router = express.Router();
const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");
const checkApprovedStatus = require('../middlewares/checkApprovedStatus');

router.post("/register", registerUser);
router.post("/contact", contact);
router.get("/getUser/:id", getUser);
router.get("/getBlogUser/:id", getSingleBlogUser);
router.post("/login", checkApprovedStatus, loginUser);
router.post("/password/forgot", forgotPassword);
router.put("/password/reset/:token", resetPassword);
router.get("/logout", logoutUser);
router.get("/me", isAuthenticatedUser, getUserDetails);
router.put("/password/update", isAuthenticatedUser, updatePassword);
router.put("/me/update", isAuthenticatedUser, updateProfile);
router.get
router.get(
  "/admin/users",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  getAllUsers
);
router.get(
  "/admin/requests",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  getAllUnapprovedUsers
);
router.get(
  "/admin/user/:id",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  getSingleUser
);
router.put(
  "/admin/user/:id",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  updateUserRole
);
router.put(
  "/admin/request/:id",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  updateApprovelStatus
);
router.delete(
  "/admin/user/:id",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  deleteUser
);

module.exports = router;
