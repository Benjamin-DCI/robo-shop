const Cart = require("../models/cart");

exports.initCart = (req, res, next) => {
  req.session.cart = new Cart(req.session.cart);

  next();
};

exports.setLocals = (req, res, next) => {
  const isLoggedIn = req.isAuthenticated();
  res.locals.isLoggedIn = isLoggedIn;
  res.locals.session = req.session;

  if (isLoggedIn) {
    res.locals.username = req.user.email;
  }

  next();
};
