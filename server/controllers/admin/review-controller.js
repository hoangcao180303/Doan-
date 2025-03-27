const ProductReview = require("../../models/Review");

const getOverallAverageRating = async (req, res) => {
    try {
        const reviews = await ProductReview.find({});
        const totalRatings = reviews.length;
        const sumRatings = reviews.reduce((sum, review) => sum + review.reviewValue, 0);
        
        const overallAverageRating = totalRatings > 0 ? (sumRatings / totalRatings).toFixed(2) : 0; // Tính số sao trung bình

        res.status(200).json({
            success: true,
            overallAverageRating, // Trả về số sao trung bình cho tất cả sản phẩm
            totalRatings, // Trả về tổng số lượt đánh giá
        });
    } catch (e) {
        console.error(e);
        res.status(500).json({
            success: false,
            message: "Some error occurred!",
        });
    }
};

const getAllReviews = async (req, res) => {
    try {
      const listOfReviews = await ProductReview.find({});
      res.status(200).json({
        success: true,
        data: listOfReviews,
      });
    } catch (e) {
      console.log(e);
      res.status(500).json({
        success: false,
        message: "Error occured",
      });
    }
  };

  const deleteReview = async (req, res) => {
    try {
      const { id } = req.params;
      const review = await ProductReview.findByIdAndDelete(id);
  
      if (!review)
        return res.status(404).json({
          success: false,
          message: "Review not found",
        });
  
      res.status(200).json({
        success: true,
        message: "Review delete successfully",
      });
    } catch (e) {
      console.log(e);
      res.status(500).json({
        success: false,
        message: "Error occured",
      });
    }
  };
module.exports = {
    getOverallAverageRating,
    getAllReviews,
    deleteReview
};