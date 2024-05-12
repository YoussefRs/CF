const express = require("express");
const {
  createReservation,
  getReservation,
  getAllReservations,
  approveReservation,
  declineReservation,
  generatePayPalCheckoutUrl,

  createPaymentIntent,
  confirmPayment,
  getAllApprovedAndPaidReservations,
  getAllApprovedAndPaidReservationsForUser,
  getUserReservationById,
  getAllApprovedAndUnPaidReservations
} = require("../Controllers/reservations.controller");
const {
  verifyAdmin,
  verifyToken,
} = require("../Middlewares/authorization_handler");

const reservationRouter = express.Router();

reservationRouter.route("/").get(getAllReservations);
reservationRouter.route("/invoices").get(getAllApprovedAndPaidReservations);
reservationRouter.route("/unpaid").get(getAllApprovedAndUnPaidReservations);
reservationRouter
  .route("/my-invoices")
  .get(verifyToken, getAllApprovedAndPaidReservationsForUser);
// reservationRouter.route("/add").post(verifyToken, createReservation);
reservationRouter.route("/add").post(createReservation);
reservationRouter.route("/:id").get(getReservation);
reservationRouter.route("/:userId/:id").get(getUserReservationById);
// reservationRouter.route("/:id/approve").put(verifyAdmin, approveReservation);
reservationRouter.route("/:id/approve").put( approveReservation);
reservationRouter.route("/:id/decline").put(verifyAdmin, declineReservation);
reservationRouter.post(
  "/generate-paypal-checkout/:reservationId",
  generatePayPalCheckoutUrl
);


// Route to create a payment intent
reservationRouter.post("/payment-intent/:reservationId", async (req, res) => {
  try {
    const { reservationId } = req.params;
    // Pass reservationId and payment method from req.body to the controller function
    await createPaymentIntent(req, res, reservationId, req.body.paymentMethod);
  } catch (error) {
    console.error("Error creating payment intent:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
// Route to confirm a payment
reservationRouter.post("/confirm-payment/:reservationId", async (req, res) => {
  try {
    const { reservationId } = req.params;
    const { paymentIntentId } = req.body;
    // Pass reservationId and paymentIntentId from req.body to the controller function
    await confirmPayment(req, res, reservationId, paymentIntentId);
  } catch (error) {
    console.error("Error confirming payment:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = { reservationRouter };
