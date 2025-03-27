const Product = require("../../models/Product");

const getFilteredProducts = async (req, res) => {
  try {
    const { category = [], brand = [], sortBy = "price-lowtohigh" } = req.query;

    let filters = {};

    if (category.length) {
      filters.category = { $in: category.split(",") };
    }

    if (brand.length) {
      filters.brand = { $in: brand.split(",") };
    }

    let sort = {};

    switch (sortBy) {
      case "price-lowtohigh":
        sort.price = 1;

        break;
      case "price-hightolow":
        sort.price = -1;

        break;
      case "title-atoz":
        sort.title = 1;

        break;

      case "title-ztoa":
        sort.title = -1;

        break;

      default:
        sort.price = 1;
        break;
    }

    const products = await Product.find(filters).sort(sort);

    res.status(200).json({
      success: true,
      data: products,
    });
  } catch (e) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Some error occured",
    });
  }
};

const getProductDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);

    if (!product)
      return res.status(404).json({
        success: false,
        message: "Product not found!",
      });

    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (e) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Some error occured",
    });
  }
};

const getFeaturedProducts = async (req, res) => {
  const minRating = 4; // Đánh giá tối thiểu
  const limit = 10; // Số lượng sản phẩm cần lấy

  try {
    const featuredProducts = await Product.find({ rating: { $gte: minRating } })
      .limit(limit);

    // Kiểm tra nếu không có sản phẩm nào được tìm thấy
    if (featuredProducts.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No featured products found.",
      });
    }

    res.status(200).json({
      success: true,
      data: featuredProducts,
    });
  } catch (error) {
    console.error(error); // Ghi log lỗi để dễ dàng kiểm tra
    res.status(500).json({
      success: false,
      message: "Some error occurred",
    });
  }
};
const getTopRatedProducts = async (req, res) => {
  try {
    const topRatedProducts = await Product.aggregate([
      {
        $match: { averageReview: { $gte: 4 } } // Lọc sản phẩm có đánh giá trung bình từ 4 trở lên
      },
      {
        $sort: { averageReview: -1 } // Sắp xếp theo đánh giá trung bình giảm dần
      },
      { $limit: 20 } // Giới hạn kết quả là 10 sản phẩm
    ]);

    if (topRatedProducts.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No top rated products found.",
      });
    }

    res.status(200).json({
      success: true,
      data: topRatedProducts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Some error occurred",
    });
  }
};
module.exports = { getFilteredProducts, getProductDetails,getTopRatedProducts };
