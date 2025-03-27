const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(

  {
    image: String,
    title: String,
    description: String,
    category: String,
    brand: String,
    price: Number,
    salePrice: Number,
    totalStock: Number,
    averageReview: Number,
    sizes: [
      {
          size: { type: String, required: true },
          quantity: { type: Number, required: true },
      },
  ], 
  },

  
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
