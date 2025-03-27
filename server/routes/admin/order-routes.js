const express = require("express");

const {
  getAllOrderstoCount,
  getAllOrdersOfAllUsers,
  getOrderDetailsForAdmin,
  updateOrderStatus,
  getTotalIncome,
  getIncomByDay,
  getIncomByMonth,
  getIncomByYear
} = require("../../controllers/admin/order-controller");

const router = express.Router();

router.get("/count", getAllOrderstoCount)
router.get("/get", getAllOrdersOfAllUsers);
router.get("/details/:id", getOrderDetailsForAdmin);
router.put("/update/:id", updateOrderStatus);
router.get("/total-income", getTotalIncome);
router.get("/revenue/daily", getIncomByDay);
router.get("/revenue/monthly", getIncomByMonth);
router.get("/revenue/yearly", getIncomByYear);

module.exports = router;
