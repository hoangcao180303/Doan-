const express = require("express");
const { getOverallAverageRating,getAllReviews,deleteReview } = require("../../controllers/admin/review-controller");

const router = express.Router();

// Route để lấy số sao trung bình cho tất cả sản phẩm
router.get("/overall-average-rating", getOverallAverageRating);
router.get("/get",getAllReviews)
router.delete("/delete/:id",deleteReview)

module.exports = router;