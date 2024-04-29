const app = require("./src/app");
const { startScript } = require("./config/db");
const dotenv = require("dotenv");
const { handlePayPalPaymentSuccessWebhook } = require("./src/Controllers/reservations.controller");

//Run env file
dotenv.config();

// Run database setup script
startScript();


// app.post("/paypalwebhook", (req, res) => {
//   //console.log("Incoming PayPal Webhook Request:", req);
//   const event = req.body;

//   console.log(event);
//   // Call your function to handle the webhook event
//   handlePayPalPaymentSuccessWebhook(req, res, event);
// });

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
