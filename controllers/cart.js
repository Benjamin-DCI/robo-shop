const Product = require("../models/product");

exports.add = async (req, res, next) => {
  const { id } = req.params;

  try {
    const product = await Product.findById(id);
    req.session.cart.add(product.id, product);

    res.json(req.session.cart);
  } catch (err) {
    next(err);
  }
};
