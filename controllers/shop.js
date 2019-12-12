const Product = require("../models/product");

exports.get = async (req, res, next) => {
  try {
    const products = await Product.find();
    // Get sums from cart in session
    const cart = {
      totalQty: req.session.cart.totalQty,
      totalPrice: req.session.cart.totalPrice
    };

    res.status(200).json({ cart, products });
  } catch (err) {
    next(err);
  }
};
