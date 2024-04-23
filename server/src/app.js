const express = require("express");
const cors = require("cors");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const passport = require("passport");
const { userRouter } = require("./Routes/user.routes");
const { notFoundError, errorHandler } = require("./Middlewares/error_handler");
const { appartmentRouter } = require("./Routes/apartment.routes");
const { reservationRouter } = require("./Routes/reservations.routes");
const { sendHelpRequest } = require("./utils/sendEmail");
const { paypalRouter } = require("./Routes/paypal.routes");


const app = express();

// Middleware
app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: true,
      maxAge: new Date(Date.now() + 3600000),
    },
  })
);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/user", userRouter);
app.use("/appartments", appartmentRouter);
app.use("/reservations", reservationRouter);

app.post("/help", sendHelpRequest);
app.use("/paypal", paypalRouter);

// Error handling middleware
app.use(notFoundError);
app.use(errorHandler);

module.exports = app;
