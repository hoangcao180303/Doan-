const express = require("express");



const {
  handleImageUpload,
  addProduct,
  editProduct,
  fetchAllProducts,
  deleteProduct,
  getTotalSoldQuantity 
} = require("../../controllers/admin/products-controller");

const { upload } = require("../../helpers/cloudinary");
const router = express.Router();


router.get("/sold-quantities", getTotalSoldQuantity);
router.post("/upload-image", upload.single("my_file"), handleImageUpload);
router.post("/add", addProduct);
router.put("/edit/:id", editProduct);
router.delete("/delete/:id", deleteProduct);
router.get("/get", fetchAllProducts);




module.exports = router;
