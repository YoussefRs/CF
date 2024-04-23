const express = require("express");
const passport = require("passport");
const { createOrder } = require("../Controllers/paypal.controller");

const paypalRouter = express.Router();

paypalRouter.post("/api/orders", async (req, res) => {
  try {
    // use the cart information passed from the front-end to calculate the order amount detals
    const cart = {
      item1: 50.0,
      item2: 50.0,
    };
    const { jsonResponse, httpStatusCode } = await createOrder(cart);
    res.status(httpStatusCode).json(jsonResponse);
  } catch (error) {
    console.error("Failed to create order:", error);
    res.status(500).json({ error: "Failed to create order." });
  }
});

module.exports = { paypalRouter };
