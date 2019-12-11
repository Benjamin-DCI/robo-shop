// EXTERNAL DEPENDENCIES

const createError = require("http-errors");
const express = require("express");
const path = require("path");
const session = require("express-session");
const logger = require("morgan");
const sassMiddleware = require("node-sass-middleware");
const mongoose = require("mongoose");

// CONFIGS

const env = require("./config/environment");

// MIDDLEWARE

const { initCart } = require("./middleware/init-session");
// ROUTERS

const indexRouter = require("./routes/index");
const cartRouter = require("./routes/cart");
const usersRouter = require("./routes/users");

// INIT

const app = express();

// CONNECT TO DB

mongoose.connect(env.db, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});

mongoose.connection.on("error", console.error);
mongoose.connection.on("open", () => {
  console.log("Database connection established...");
});

// VIEW ENGINE

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

// LOGGING
app.use(logger("dev"));

// REQUEST PARSERS
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// SESSIONS
app.use(
  session({
    // The secret allows for signed cookies and helps prevent fake requests from being made
    secret: env.secrets.session,
    // Disables defaults that are about to be deprecated
    resave: false,
    saveUninitialized: false,
    // Set general options for the sessionID cookie
    cookie: {
      // Cookie expiration date
      maxAge: 1000 * 60 * 60 * 24 // 24 hrs
    }
  })
);

// STATIC ASSET HANDLING
app.use(express.static(path.join(__dirname, "public")));

// CUSTOM MIDDLEWARE

app.use(initCart);

// ROUTES
app.use("/", indexRouter);
app.use("/cart", cartRouter);
app.use("/users", usersRouter);

// ERROR HANDLING
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

// EXPORT CONFIGURED APP
module.exports = app;
