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
const { startScript } = require("../config/db");
const { handlePayPalPaymentSuccessWebhook, handleStripeWebhook, handleStripePaymentSuccessWebhook, updateReservationStatus } = require("./Controllers/reservations.controller");
const { default: Stripe } = require("stripe");
const cron = require('node-cron');


const app = express();
const dotenv = require("dotenv");

//Run env file
dotenv.config();
//const stripeClient = new Stripe(process.env.SECRET_KEY); 
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

cron.schedule('0 */6 * * *', async () => {
  try {
    const db = await startScript();

    const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString().slice(0, 19).replace('T', ' '); // 24 hours ago

    const pendingReservations = await db.query(
      'SELECT * FROM Reservations WHERE isPaid = 0 AND isProcessed = 0 AND status = "Approved" AND createdAt <= ?',
      [twentyFourHoursAgo]
    );

    for (const reservation of pendingReservations[0]) { 
      await db.query('UPDATE Reservations SET status = "Pending" WHERE id = ?', [reservation.id]);
    }

    console.log('Pending reservations updated successfully');
  } catch (error) {
    console.error('Error updating pending reservations:', error);
  }
});


// Middleware for parsing raw request body
app.use(
  "/webhook",
  express.raw({ type: "application/json", limit: "10mb", extended: true })
);

// app.post(
//   "/webhook",
//   express.raw({ type: "application/json", limit: "10mb", extended: true }),
//   async (request, response) => {
//     const sig = request.headers["stripe-signature"];

//     try {
//       // Construct the Stripe event from the request
//       const event = stripeClient.webhooks.constructEvent(
//         request.body,
//         sig,
//         endpointSecret
//       );

//       // Handle the webhook event
//       switch (event.type) {
//         case "payment_intent.succeeded":
//           // Update reservation status in the database
//           const reservationId = event.data.object.metadata.reservationId;
//           await updateReservationStatus(reservationId);

//           // Do not send a response here
//           break;
//         // Add more event types as needed

//         default:
//           console.log(`Unhandled event type: ${event.type}`);
//       }

//       // Respond with a 200 OK status to acknowledge receipt of the event
//       response.status(200).send("Webhook received");
//     } catch (err) {
//       // Respond with a 400 Bad Request status if there's an error
//       response.status(400).send(`Webhook Error: ${err.message}`);
//     }
//   }
// );

// Middleware

// Define route for Stripe webhook
// Endpoint to handle webhook events
app.post('/webhook', async (req, res) => {
  const sig = req.headers['stripe-signature'];

  try {
    const event = Stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    // Handle the event here
    console.log('Received event:', event);
    res.json({ received: true });
  } catch (err) {
    console.error('Webhook error:', err.message);
    res.status(400).send(`Webhook Error: ${err.message}`);
  }
});
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
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/user", userRouter);
app.use("/appartments", appartmentRouter);
app.use("/reservations", reservationRouter);
app.use("/paypal", paypalRouter);

// PayPal Webhook Route
app.post("/paypalwebhook", (req, res) => {
  try {
    const event = req.body;
    handlePayPalPaymentSuccessWebhook(req, res, event);
  } catch (error) {
    console.error("Error handling PayPal webhook:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});


// Help Request Route
app.post("/help", sendHelpRequest);

// Error handling middleware
app.use(notFoundError);
app.use(errorHandler);

module.exports = app;
