const express = require("express");
const router = express.Router();

const cartController = require("../controllers/cart");

router.get("/add/:id", cartController.add);

module.exports = router;
