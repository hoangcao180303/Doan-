const Cart = require("../../models/Cart");
const Product = require("../../models/Product");

const addToCart = async (req, res) => {
  try {
    const { userId, productId, quantity, size } = req.body;

    if (!userId || !productId || quantity <= 0 || !size) {
        return res.status(400).json({
            success: false,
            message: "Invalid data provided!",
        });
    }

    const product = await Product.findById(productId);
    if (!product) {
        return res.status(404).json({
            success: false,
            message: "Product not found",
        });
    }

    let cart = await Cart.findOne({ userId });
    if (!cart) {
        cart = new Cart({ userId, items: [] });
    }

    // Kiểm tra xem sản phẩm với kích thước cụ thể đã tồn tại chưa
    const findCurrentProductIndex = cart.items.findIndex(
        (item) => item.productId.toString() === productId && item.size === size
    );

    if (findCurrentProductIndex === -1) {
        // Nếu chưa tồn tại, thêm mới
        cart.items.push({ productId, quantity, size });
    } else {
        // Nếu đã tồn tại, cập nhật số lượng
        cart.items[findCurrentProductIndex].quantity += quantity;
    }

    await cart.save();

    res.status(200).json({
        success: true,
        data: cart,
    });
} catch (error) {
    res.status(500).json({
        success: false,
        message: error.message || "An error occurred",
    });
}
};

const fetchCartItems = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User id is manadatory!",
      });
    }

    const cart = await Cart.findOne({ userId }).populate({
      path: "items.productId",
      select: "image title price salePrice",
    });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found!",
      });
    }

    const validItems = cart.items.filter(
      (productItem) => productItem.productId
    );

    if (validItems.length < cart.items.length) {
      cart.items = validItems;
      await cart.save();
    }

    const populateCartItems = validItems.map((item) => ({
      productId: item.productId._id,
      image: item.productId.image,
      title: item.productId.title,
      price: item.productId.price,
      salePrice: item.productId.salePrice,
      quantity: item.quantity,
      size: item.size
    }));

    res.status(200).json({
      success: true,
      data: {
        ...cart._doc,
        items: populateCartItems,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error",
    });
  }
};

const updateCartQuantity = async (req, res) => {
  try {
    const { userId, productId, quantity, size } = req.body;

    if (!userId || !productId || quantity < 0 || !size) {
        return res.status(400).json({
            success: false,
            message: "Invalid data provided!",
        });
    }

    const cart = await Cart.findOne({ userId });
    if (!cart) {
        return res.status(404).json({
            success: false,
            message: "Cart not found!",
        });
    }

    // Tìm chỉ số của sản phẩm với kích thước cụ thể
    const findCurrentProductIndex = cart.items.findIndex(
        (item) => item.productId.toString() === productId && item.size === size
    );

    if (findCurrentProductIndex === -1) {
        return res.status(404).json({
            success: false,
            message: "Cart item not present!",
        });
    }

    // Cập nhật số lượng
    if (quantity === 0) {
        // Nếu số lượng bằng 0, xóa sản phẩm khỏi giỏ hàng
        cart.items.splice(findCurrentProductIndex, 1);
    } else {
        // Cập nhật số lượng nếu khác 0
        cart.items[findCurrentProductIndex].quantity = quantity;
    }

    await cart.save();

    // Populate lại cart items
    await cart.populate({
        path: "items.productId",
        select: "image title price salePrice",
    });

    const populateCartItems = cart.items.map((item) => ({
        productId: item.productId ? item.productId._id : null,
        image: item.productId ? item.productId.image : null,
        title: item.productId ? item.productId.title : "Product not found",
        price: item.productId ? item.productId.price : null,
        salePrice: item.productId ? item.productId.salePrice : null,
        quantity: item.quantity,
        size: item.size
    }));

    res.status(200).json({
        success: true,
        data: {
            ...cart._doc,
            items: populateCartItems,
        },
    });
} catch (error) {
    console.log(error);
    res.status(500).json({
        success: false,
        message: "Error",
    });
}
};

// const deleteCartItem = async (req, res) => {
//   try {
//     const { userId, productId, size } = req.params;
//     if (!userId || !productId || !size) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid data provided!",
//       });
//     }

//     const cart = await Cart.findOne({ userId }).populate({
//       path: "items.productId",
//       select: "image title price salePrice",
//     });

//     if (!cart) {
//       return res.status(404).json({
//         success: false,
//         message: "Cart not found!",
//       });
//     }

//     cart.items = cart.items.filter(
//       (item) => item.productId._id.toString() !== productId
//     );

//     await cart.save();

//     await cart.populate({
//       path: "items.productId",
//       select: "image title price salePrice",
//     });

//     const populateCartItems = cart.items.map((item) => ({
//       productId: item.productId ? item.productId._id : null,
//       image: item.productId ? item.productId.image : null,
//       title: item.productId ? item.productId.title : "Product not found",
//       price: item.productId ? item.productId.price : null,
//       salePrice: item.productId ? item.productId.salePrice : null,
//       quantity: item.quantity,
//     }));

//     res.status(200).json({
//       success: true,
//       data: {
//         ...cart._doc,
//         items: populateCartItems,
//       },
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({
//       success: false,
//       message: "Error",
//     });
//   }
// };

const deleteCartItem = async (req, res) => {
  try {
    const { userId, productId, size } = req.params;
    if (!userId || !productId || !size) {
      return res.status(400).json({
        success: false,
        message: "Invalid data provided!",
      });
    }

    const cart = await Cart.findOne({ userId }).populate({
      path: "items.productId",
      select: "image title price salePrice",
    });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found!",
      });
    }

    console.log("Deleting item with productId:", productId, "and size:", size);

    // Lọc sản phẩm
    cart.items = cart.items.filter(
      (item) => 
        !(item.productId._id.toString() === productId && item.size === size)
    );

    await cart.save();

    await cart.populate({
      path: "items.productId",
      select: "image title price salePrice",
    });

    const populateCartItems = cart.items.map((item) => ({
      productId: item.productId ? item.productId._id : null,
      image: item.productId ? item.productId.image : null,
      title: item.productId ? item.productId.title : "Product not found",
      price: item.productId ? item.productId.price : null,
      salePrice: item.productId ? item.productId.salePrice : null,
      quantity: item.quantity,
      size: item.size // Đảm bảo giữ lại kích thước
    }));

    res.status(200).json({
      success: true,
      data: {
        ...cart._doc,
        items: populateCartItems,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error",
    });
  }
};

module.exports = {
  addToCart,
  updateCartQuantity,
  deleteCartItem,
  fetchCartItems,
};
