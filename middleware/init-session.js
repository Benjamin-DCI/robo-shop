const Cart = require("../models/cart");

exports.initCart = (req, res, next) => {
  req.session.cart = new Cart(req.session.cart);

  next();
};
