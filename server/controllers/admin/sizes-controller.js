

const Size = require("../../models/Size");

const addProductSize = async (req, res) => {
  try {
    const { productId, size, stock } =
      req.body;
    const newSize = new Size({
      productId,
      size,
      stock
    });
    await newSize.save();
    res.status(201).json({
      success: true,
      data: newSize,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error",
    });
  }
};

const getProductSizes = async (req, res) => {
  try {
    const { productId } = req.params;

    const sizes = await Size.find({ productId });
    res.status(200).json({
      success: true,
      data: sizes,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error",
    });
  }
};

module.exports = { addProductSize, getProductSizes };
