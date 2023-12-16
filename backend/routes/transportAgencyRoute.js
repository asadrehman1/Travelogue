const express = require("express");
const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");
const {
  createVehicle,
  getAllVehicles,
  getSingleVehicle,
  updateVehicle,
  deleteVehicle,
  createVehicleReview,
  getVehicleReviews,
  deleteVehicleReview,
  updateVehicleStock,
  getAllTranportAgencyVehicles,
  bookVehicle
} = require("../controllers/transportAgencyController");

const router = express.Router();
router.get("/vehicle/reviews", getVehicleReviews);
router.post('/book-vehicle', bookVehicle);
router.post(
  "/transportagency/vehcile/new",
  isAuthenticatedUser,
  authorizeRoles("transportAgency"),
  createVehicle
);
router.get(
  "/transportagency/vehicles",
  isAuthenticatedUser,
  authorizeRoles("transportAgency"),
  getAllTranportAgencyVehicles
);
router.put("/updateVehicleStock/stock/:vehicleId",updateVehicleStock);
router.get("/vehicles", getAllVehicles);
router.get("/vehicle/:id", getSingleVehicle);
router.put(
  "/transportagency/vehcile/:id",
  isAuthenticatedUser,
  authorizeRoles("transportAgency"),
  updateVehicle
);
router.delete(
  "/transportagency/vehcile/:id",
  isAuthenticatedUser,
  authorizeRoles("transportAgency"),
  deleteVehicle
);
router.put("/vehicle/review", isAuthenticatedUser, createVehicleReview);
router.delete(
  "/vehicle/review",
  isAuthenticatedUser,
  authorizeRoles("transportAgency"),
  deleteVehicleReview
);
module.exports = router;
