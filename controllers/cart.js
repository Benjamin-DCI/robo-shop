const Product = require("../models/product");

// gets cart from our session
exports.get = (req, res) => {
  const { cart } = req.session;

  res.json({ cart });
};

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

exports.remove = (req, res) => {
  // get the ID from the route params
  const { id } = req.params;

  // remove product from cart
  req.session.cart.remove(id);
  res.json(req.session.cart);
};

exports.removeAll = (req, res) => {
  // get the ID from the route params
  const { id } = req.params;

  // remove entire cart item
  req.session.cart.removeAll(id);

  res.json(req.session.cart);
};
