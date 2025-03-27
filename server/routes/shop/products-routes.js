const express = require("express");

const {
  getFilteredProducts,
  getProductDetails,
  getTopRatedProducts
} = require("../../controllers/shop/products-controller");

const router = express.Router();

router.get("/get", getFilteredProducts);
router.get("/get/:id", getProductDetails);
router.get("/top-rated", getTopRatedProducts);

module.exports = router;
