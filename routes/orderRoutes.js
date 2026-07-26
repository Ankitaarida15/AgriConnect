const express = require("express");
const router = express.Router();

const { placeOrder } = require("../controllers/orderController");
const auth = require("../middleware/authMiddleware");

router.post("/", auth, placeOrder);

module.exports = router;