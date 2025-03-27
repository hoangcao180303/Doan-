const express = require("express");

const {
  addToCart,
  fetchCartItems,
  deleteCartItem,
  updateCartQuantity,
} = require("../../controllers/shop/cart-controller");

const router = express.Router();

router.post("/add", addToCart);
router.get("/get/:userId", fetchCartItems);
router.put("/update-cart", updateCartQuantity);
router.delete("/:userId/:productId/:size", deleteCartItem);

module.exports = router;
