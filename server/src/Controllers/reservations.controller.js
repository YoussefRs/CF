const paypal = require("paypal-rest-sdk");
const {
  createConnectionWithoutDatabase,
  startScript,
} = require("../../config/db");
const dotenv = require("dotenv");

//Run env file
dotenv.config();

const {
  sendReservationEmail,
  sendDeclineReservationEmail,
} = require("../utils/sendEmail");
const stripe = require("stripe")(process.env.SECRET_KEY);
paypal.configure({
  mode: "sandbox", // Set to 'live' for production
  client_id: process.env.PAYPAL_CLIENT_ID,
  client_secret: process.env.PAYPAL_APP_SECRET,
});

async function createReservation(req, res) {
  const db = await startScript();
  try {
    // Extract data from the request body
    const { userId, apartmentId, userEmail, startDate, endDate, price, servicesFee, totalPrice } = req.body;

    console.log(req.body)

    // Start a database transaction
    await db.beginTransaction();

    // Insert the reservation details into the Reservations table with status "Pending"
    const [reservationResult] = await db.query(
      `INSERT INTO Reservations (userId, apartmentId, userEmail, startDate, endDate, price, servicesFee, totalPrice)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [userId, apartmentId, userEmail, startDate, endDate, price, servicesFee, totalPrice]
    );

    // Commit the transaction
    await db.commit();

    // Close the database connection
    await db.end();

    // Respond with success message
    res.status(201).json({
      message: "Reservation created successfully and is pending admin approval",
    });
  } catch (error) {
    // Rollback the transaction if an error occurs
    await db.rollback();

    console.error("Error creating reservation:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}


async function getAllReservations(req, res) {
  const db = await startScript();
  try {
    // Execute SQL query to retrieve all reservations
    const [reservations] = await db.query("SELECT * FROM reservations");
    // Respond with the retrieved reservations
    res.status(200).json(reservations);
  } catch (error) {
    console.error("Error fetching reservations:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function getReservation(req, res) {
  const db = await startScript();
  try {
    const reservationId = req.params.id;
    // Execute SQL query to retrieve the reservation
    const [reservation] = await db.query(
      "SELECT * FROM Reservations WHERE id = ?",
      [reservationId]
    );
    // Check if the reservation exists
    if (reservation.length === 0) {
      return res.status(404).json({ message: "Reservation not found" });
    }
    // Respond with the retrieved reservation
    res.status(200).json(reservation[0]);
  } catch (error) {
    console.error("Error fetching reservation:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function approveReservation(req, res) {
  const db = await startScript();

  try {
    const reservationId = req.params.id;
    // Execute SQL query to update the reservation status to approved
    await db.query('UPDATE Reservations SET status = "approved" WHERE id = ?', [
      reservationId,
    ]);

    const [reservation] = await db.query(
      `
        SELECT Reservations.*, Apartments.* 
        FROM Reservations 
        INNER JOIN Apartments ON Reservations.apartmentId = Apartments.id 
        WHERE Reservations.id = ?`,
      [reservationId]
    );

    if (reservation.length === 0) {
      return res.status(404).json({ error: "Reservation not found" });
    }

    const userId = reservation[0].userId;

    // Fetch user's email address
    const [user] = await db.query("SELECT email FROM Users WHERE id = ?", [
      userId,
    ]);

    if (user.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    // Send email to user
    sendReservationEmail(user[0], reservation[0]);

    // Respond with success message
    res.status(200).json({ message: "Reservation approved successfully" });
  } catch (error) {
    console.error("Error approving reservation:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function declineReservation(req, res) {
  const db = await startScript();

  try {
    const reservationId = req.params.id;
    // Execute SQL query to update the reservation status to declined
    await db.query('UPDATE Reservations SET status = "declined" WHERE id = ?', [
      reservationId,
    ]);

    const [reservation] = await db.query(
      `
    SELECT Reservations.*, Apartments.* 
    FROM Reservations 
    INNER JOIN Apartments ON Reservations.apartmentId = Apartments.id 
    WHERE Reservations.id = ?`,
      [reservationId]
    );

    if (reservation.length === 0) {
      return res.status(404).json({ error: "Reservation not found" });
    }

    const userId = reservation[0].userId;

    // Fetch user's email address
    const [user] = await db.query("SELECT email FROM Users WHERE id = ?", [
      userId,
    ]);

    if (user.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    // Send email to user
    sendDeclineReservationEmail(user[0], reservation[0]);

    // Respond with success message
    res.status(200).json({ message: "Reservation declined successfully" });
  } catch (error) {
    console.error("Error declining reservation:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function generatePayPalCheckoutUrl(req, res) {
  try {
    const { reservationId } = req.params;

    const db = await startScript();

    // Retrieve reservation details from the database
    const [reservation] = await db.query(
      `SELECT *, price FROM Reservations WHERE id = ?`,
      [reservationId]
    );
    if (!reservation) {
      return res.status(404).json({ error: "Reservation not found" });
    }

    // Ensure the price is in the correct format
    const totalPrice = parseFloat(reservation[0].price).toFixed(2);

    // Construct PayPal payment object
    const createPayment = {
      intent: "sale",
      payer: {
        payment_method: "paypal",
      },
      redirect_urls: {
        return_url: "http://localhost:5173/successful/",
        cancel_url: "http://localhost:5173/",
      },
      transactions: [
        {
          amount: {
            total: totalPrice,
            currency: "USD", // Change currency as needed
          },
          description: `Reservation for ${reservation.startDate} to ${reservation.endDate}`,
        },
      ],
    };

    // Create PayPal payment
    paypal.payment.create(createPayment, (error, payment) => {
      if (error) {
        console.error("PayPal payment failed:", error);
        if (error.response && error.response.details) {
          const errorMessage = error.response.details
            .map((detail) => detail.issue)
            .join(", ");
          return res
            .status(400)
            .json({ error: `PayPal payment failed: ${errorMessage}` });
        } else {
          return res.status(400).json({
            error: "PayPal payment failed: Invalid request - see details",
          });
        }
      } else {
        for (const link of payment.links) {
          if (link.method === "REDIRECT") {
            return res.status(200).json({ approval_url: link.href });
          }
        }
        return res.status(400).json({ error: "PayPal approval URL not found" });
      }
    });
  } catch (error) {
    console.error("Error generating PayPal checkout URL:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

const handlePayPalPaymentSuccessWebhook = async (req, res, event) => {
  try {
    const eventType = event.event_type;

    const db = await startScript();
    if (!eventType) {
      return res.status(400).json({ error: "Event type is undefined" });
    }

    if (eventType === "PAYMENTS.PAYMENT.CREATED") {
      const paymentDetails = event.resource;

      if (!paymentDetails) {
        console.error("Invalid payment details:", event);
        return res.status(400).send("Invalid payment details");
      }

      const reservationId = paymentDetails.reservationId;
      const paymentId = paymentDetails.id;
      const payerId = paymentDetails.payer.payer_info.payer_id;

      // Retrieve reservation details from the database
      const [reservation] = await db.query(
        `SELECT * FROM Reservations WHERE id = ?`,
        [reservationId]
      );

      if (!reservation) {
        return res.status(404).json({ error: "Reservation not found" });
      }

      // Execute the PayPal payment
      paypal.payment.execute(
        paymentId,
        { payer_id: payerId },
        async (error, payment) => {
          if (error) {
            console.error("PayPal payment execution error:", error);
            return res
              .status(500)
              .json({ error: "PayPal payment execution error" });
          }

          // Update reservation status to mark it as paid
          await db.query(`UPDATE Reservations SET isPaid = 1 WHERE id = ?`, [
            reservationId,
          ]);

          // Optionally, you can send an email notification here

          return res.status(200).json({ message: "Payment successful" });
        }
      );
    } else {
      console.log("Unhandled PayPal webhook event:", eventType);
      return res.status(400).json({ error: "Unhandled PayPal webhook event" });
    }
  } catch (error) {
    console.error("Error handling PayPal webhook event:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

async function getReservationById(reservationId) {
  try {
    const db = await startScript();
    const [reservation] = await db.query(
      `SELECT * FROM Reservations WHERE id = ?`,
      [reservationId]
    );
    return reservation;
  } catch (error) {
    console.error("Error fetching reservation:", error);
    throw error;
  }
}

// Stripe 
// Endpoint to create a payment intent
async function createPaymentIntent(req, res) {
  try {
    const { reservationId } = req.params;

    // Retrieve reservation details from the database (assuming you have a function getReservationById)
    const reservation = await getReservationById(reservationId);

    if (!reservation) {
      return res.status(404).json({ error: "Reservation not found" });
    }

    // Create a payment intent with Stripe
    const paymentIntent = await stripe.paymentIntents.create({
      amount: reservation[0].price * 100, // Convert to cents
      currency: "usd",
      metadata: { reservationId },
    });

    // Respond with the client secret
    res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error("Error creating payment intent:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

// Endpoint to confirm payment
async function confirmPayment(req, res) {
  try {
    const { reservationId } = req.params;

    // Retrieve reservation details from the database
    const db = await startScript();
    const [reservation] = await db.query(
      `SELECT * FROM Reservations WHERE id = ?`,
      [reservationId]
    );

    if (!reservation) {
      return res.status(404).json({ error: "Reservation not found" });
    }

    // Confirm the payment with Stripe using the clientSecret
        const { paymentIntentId, paymentMethod } = req.body;
        const paymentIntent = await stripe.paymentIntents.confirm(
          paymentIntentId,
          {
            payment_method: paymentMethod,
            return_url: "https://yourdomain.com/payment/success",
          }
        );
  

    // Check if payment was successful
    if (paymentIntent.status === "succeeded") {
      // Update reservation status to mark it as paid
      await db.query(`UPDATE Reservations SET isPaid = 1 WHERE id = ?`, [
        reservationId,
      ]);

      // Respond with success message
      return res
        .status(200)
        .json({ message: "Payment confirmed successfully" });
    } else {
      // Respond with error message
      return res.status(400).json({ error: "Payment confirmation failed" });
    }
  } catch (error) {
    console.error("Error confirming payment:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}


// Webhook handler to listen for payment_intent.succeeded event
async function handleStripeWebhook(req, res) {
  let event;

  try {
    event = req.body;
    // Verify the event to ensure it came from Stripe
    const verifiedEvent = await stripe.webhooks.constructEvent(
      req.rawBody,
      req.headers['stripe-signature'],
      'your_webhook_secret'
    );

    if (verifiedEvent.type === 'payment_intent.succeeded') {
      const paymentIntent = verifiedEvent.data.object;
      // Update reservation status to mark it as paid in your database
      await updateReservationStatus(paymentIntent.metadata.reservationId);
    }

    res.status(200).end();
  } catch (error) {
    console.error("Error handling Stripe webhook event:", error);
    res.status(400).send(`Webhook Error: ${error.message}`);
  }
}

// Update reservation status function
async function updateReservationStatus(reservationId) {
  // Update reservation status in your database
}

module.exports = {
  createReservation,
  getAllReservations,
  getReservation,
  approveReservation,
  declineReservation,
  handlePayPalPaymentSuccessWebhook,
  generatePayPalCheckoutUrl,
  createPaymentIntent,
  confirmPayment,
  handleStripeWebhook,
};
