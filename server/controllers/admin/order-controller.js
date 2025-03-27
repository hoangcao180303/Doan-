const Order = require("../../models/Order");

const getAllOrdersOfAllUsers = async (req, res) => {
  try {
    const orders = await Order.find({});

    if (!orders.length) {
      return res.status(404).json({
        success: false,
        message: "No orders found!",
      });
    }

    res.status(200).json({
      success: true,
      data: orders,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured!",
    });
  }
};

const getOrderDetailsForAdmin = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found!",
      });
    }

    res.status(200).json({
      success: true,
      data: order,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured!",
    });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { orderStatus } = req.body;

    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found!",
      });
    }

    await Order.findByIdAndUpdate(id, { orderStatus });

    res.status(200).json({
      success: true,
      message: "Order status is updated successfully!",
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured!",
    });
  }
};

const getAllOrderstoCount = async (req, res) => {
  try {
    const count = await Order.countDocuments(); // Đếm số lượng đơn hàng

    res.status(200).json({
      success: true,
      data: count, // Trả về số lượng đơn hàng
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occurred!",
    });
  }
};

const getTotalIncome = async (req, res) => {
  try {
      const totalIncome = await Order.aggregate([
          {
              $group: {
                  _id: null, // Không phân nhóm
                  total: { $sum: "$totalAmount" }, // Tính tổng thu nhập từ trường totalAmount
              },
          },
      ]);

      res.status(200).json({
          success: true,
          data: totalIncome[0] ? totalIncome[0].total : 0, // Trả về tổng thu nhập hoặc 0
      });
  } catch (e) {
      console.log(e);
      res.status(500).json({
          success: false,
          message: "Some error occurred!",
      });
  }
};

const getIncomByDay = async (req, res) => {
  try {
    const revenues = await Order.aggregate([
        {
            $group: {
                _id: { $dayOfMonth: "$orderDate" },
                totalRevenue: { $sum: "$totalAmount" }
            }
        },
        {
            $sort: { _id: 1 }
        }
    ]);

    res.status(200).json(revenues);
} catch (error) {
    console.error(error);
    res.status(500).json({ message: "Có lỗi xảy ra" });
}
}


const getIncomByMonth = async (req, res) => {
  try {
    const revenues = await Order.aggregate([
        {
            $group: {
                _id: { $month: "$orderDate" },
                totalRevenue: { $sum: "$totalAmount" }
            }
        },
        {
            $sort: { _id: 1 }
        }
    ]);

    res.status(200).json(revenues);
} catch (error) {
    console.error(error);
    res.status(500).json({ message: "Có lỗi xảy ra" });
}
}

const getIncomByYear = async (req, res) => {
  try {
    const revenues = await Order.aggregate([
        {
            $group: {
                _id: { $year: "$orderDate" },
                totalRevenue: { $sum: "$totalAmount" }
            }
        },
        {
            $sort: { _id: 1 }
        }
    ]);

    res.status(200).json(revenues);
} catch (error) {
    console.error(error);
    res.status(500).json({ message: "Có lỗi xảy ra" });
}
}
const getOrdersByDate = async (req, res) => {
  try {
    const { date } = req.query;

    if (!date) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid date in YYYY-MM-DD format!",
      });
    }

    // Chuyển đổi chuỗi ngày thành đối tượng Date
    const startDate = new Date(date);
    const endDate = new Date(date);
    endDate.setDate(endDate.getDate() + 1); // Lấy hết các đơn hàng trong ngày đó

    const orders = await Order.find({
      orderDate: { $gte: startDate, $lt: endDate },
    });

    if (!orders.length) {
      return res.status(404).json({
        success: false,
        message: "No orders found for the given date!",
      });
    }

    res.status(200).json({
      success: true,
      data: orders,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occurred!",
    });
  }
};

module.exports = {
  getAllOrdersOfAllUsers,
  getOrderDetailsForAdmin,
  updateOrderStatus,
  getAllOrderstoCount,
  getTotalIncome,
  getIncomByDay,
  getIncomByMonth,
  getIncomByYear
};
