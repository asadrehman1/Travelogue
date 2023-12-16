const express = require("express");
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getSingleProduct,
  createProductReview,
  getProductsReviews,
  deleteProductReview,
  getAdminProducts,
  updateStock,
  bookPackage
} = require("../controllers/productController");
const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");

const router = express.Router();

router.get("/products", getAllProducts);
router.post("/book-package", bookPackage);
router.put("/updateStock/stock/:productId",updateStock);
router.get("/product/:id", getSingleProduct);
router.post(
  "/admin/product/new",
  isAuthenticatedUser,
  authorizeRoles("travelAgency"),
  createProduct
);
router.get(
  "/admin/products",
  isAuthenticatedUser,
  authorizeRoles("travelAgency"),
  getAdminProducts
);
router.put(
  "/admin/product/:id",
  isAuthenticatedUser,
  authorizeRoles("travelAgency"),
  updateProduct
);
router.delete(
  "/admin/product/:id",
  isAuthenticatedUser,
  authorizeRoles("travelAgency"),
  deleteProduct
);
router.put("/review", isAuthenticatedUser, createProductReview);
router.get("/reviews", getProductsReviews);
router.delete("/review", isAuthenticatedUser, deleteProductReview);
module.exports = router;
