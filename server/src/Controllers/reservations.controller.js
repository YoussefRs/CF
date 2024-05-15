const paypal = require("paypal-rest-sdk");
const jwt = require("jsonwebtoken");
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
  mode: "sandbox",
  client_id: process.env.PAYPAL_CLIENT_ID,
  client_secret: process.env.PAYPAL_APP_SECRET,
});

// async function createReservation(req, res) {
//   const db = await startScript();
//   try {
//     const { userId, apartmentId, userEmail, startDate, endDate, price } =
//       req.body;

//     if (new Date(startDate) >= new Date(endDate)) {
//       return res
//         .status(400)
//         .json({ error: "Start date must be before end date" });
//     }

//     const [apartmentResult] = await db.query(
//       `SELECT id FROM Apartment WHERE id = ?`,
//       [apartmentId]
//     );

//     if (apartmentResult.length === 0) {
//       return res.status(404).json({ error: "Apartment not found" });
//     }

//     await db.beginTransaction();

//     const [reservationResult] = await db.query(
//       `INSERT INTO Reservations (userId, apartmentId, userEmail, startDate, endDate, price)
//              VALUES (?, ?, ?, ?, ?, ?)`,
//       [userId, apartmentId, userEmail, startDate, endDate, price]
//     );

//     await db.commit();

//     await db.end();

//     res.status(201).json({
//       message: "Reservation created successfully and is pending admin approval",
//     });
//   } catch (error) {
//     await db.rollback();

//     console.error("Error creating reservation:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// }
async function createReservation(req, res) {
  const db = await startScript();
  try {
    // Extract data from the request body
    const {
      userId,
      apartmentId,
      userEmail,
      startDate,
      endDate,
      nightsCount,
      normalNightsCount,
      specialNightsCount,
      normalNightsPrice,
      specialNightsPrice,
      totalPrice,
      servicesFee,
      services,
    } = req.body;

    // Check if start date is before end date
    if (new Date(startDate) >= new Date(endDate)) {
      return res
        .status(400)
        .json({ error: "Start date must be before end date" });
    }

    // Start a database transaction
    await db.beginTransaction();

    // Insert the reservation details into the Reservations table
    const [reservationResult] = await db.query(
      `INSERT INTO Reservations 
            (userId, apartmentId, userEmail, startDate, endDate, nightsCount, 
            normalNightsCount, specialNightsCount, normalNightsPrice, specialNightsPrice, 
            totalPrice, servicesFee)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        userId,
        apartmentId,
        userEmail,
        startDate,
        endDate,
        nightsCount,
        normalNightsCount,
        specialNightsCount,
        normalNightsPrice,
        specialNightsPrice,
        totalPrice,
        servicesFee,
      ]
    );

    // Get the reservation ID
    const reservationId = reservationResult.insertId;

    // Insert services into the Services table
    for (const service of services) {
      await db.query(
        `INSERT INTO Services (reservationId, serviceName, servicePrice) VALUES (?, ?, ?)`,
        [reservationId, service.name, service.price]
      );
    }

    // Commit the transaction
    await db.commit();

    // Close the database connection
    await db.end();

    // Respond with success message
    res.status(201).json({
      message: "Reservation created successfully",
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
    // Execute SQL query to retrieve all reservations with apartment, user, services, and images details
    const [reservations] = await db.query(`
    SELECT 
    r.id,
    r.userId,
    r.userEmail,
    r.apartmentId,
    r.startDate,
    r.endDate,
    r.nightsCount,
    r.normalNightsCount,
    r.specialNightsCount,
    r.normalNightsPrice,
    r.specialNightsPrice,
    r.totalPrice,
    r.servicesFee,
    r.isPaid,
    r.isProcessed,
    r.status,
    r.createdAt,
    r.updatedAt,
    a.name,
    a.location,
    a.bedroom,
    a.bathroom,
    a.parking,
    a.food,
    a.laundry,
    a.rent,
    a.description,
    a.price,
    u.username,
    u.phone,
    u.email,
    u.password,
    u.image,
    u.role,
    JSON_OBJECT(
        'services', COALESCE(
            JSON_ARRAYAGG(
                JSON_OBJECT('name', s.serviceName, 'price', s.servicePrice)
            ), JSON_ARRAY()
        ),
        'images', COALESCE(
            JSON_ARRAYAGG(
                JSON_OBJECT('image_url', i.image_url)
            ), JSON_ARRAY()
        )
    ) AS details
FROM 
    Reservations r
INNER JOIN 
    Apartment a ON r.apartmentId = a.id
INNER JOIN 
    Users u ON r.userId = u.id
LEFT JOIN 
    Services s ON r.id = s.reservationId
LEFT JOIN 
    Image i ON a.id = i.apartment_id
GROUP BY 
    r.id;



    `);

    // Respond with the retrieved reservations along with apartment, user, services, and images details
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
    const [
      reservation,
    ] = await db.query("SELECT * FROM Reservations WHERE id = ?", [
      reservationId,
    ]);
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
    await db.query('UPDATE Reservations SET status = "Approved" WHERE id = ?', [
      reservationId,
    ]);
    // Fetch the reservation details using the correct reservation ID
    const [reservation] = await db.query(
      `
        SELECT Reservations.*, Apartment.* 
        FROM Reservations 
        INNER JOIN Apartment ON Reservations.apartmentId = Apartment.id 
        WHERE Reservations.id = ?`,
      [reservationId]
    );

    if (reservation.length === 0) {
      return res.status(404).json({ error: "Reservation not found" });
    }

    const userId = reservation[0].userId;
    const [
      user,
    ] = await db.query("SELECT email, username, id FROM Users WHERE id = ?", [
      userId,
    ]);

    if (user.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    // Generate a unique token
    const token = jwt.sign({ userId, reservationId }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    sendReservationEmail(user[0], reservation[0], reservationId, token);

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
    SELECT Reservations.*, Apartment.* 
    FROM Reservations 
    INNER JOIN Apartment ON Reservations.apartmentId = Apartment.id 
    WHERE Reservations.id = ?`,
      [reservationId]
    );

    if (reservation.length === 0) {
      return res.status(404).json({ error: "Reservation not found" });
    }

    const userId = reservation[0].userId;

    // Fetch user's email address
    const [
      user,
    ] = await db.query("SELECT email, username FROM Users WHERE id = ?", [
      userId,
    ]);

    if (user.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    // Send email to user
    sendDeclineReservationEmail(user, reservation[0]);

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

    console.log(reservationId);

    const db = await startScript();

    // Retrieve reservation details from the database
    const [
      reservation,
    ] = await db.query(`SELECT *, totalPrice FROM Reservations WHERE id = ?`, [
      reservationId,
    ]);
    if (!reservation) {
      return res.status(404).json({ error: "Reservation not found" });
    }

    // Ensure the price is in the correct format
    const totalPrice = parseFloat(reservation[0].totalPrice).toFixed(2);

    // Construct PayPal payment object
    const createPayment = {
      intent: "sale",
      payer: {
        payment_method: "paypal",
      },
      redirect_urls: {
        return_url: `http://localhost:5173/successful/${reservationId}`, // Include reservation ID in return URL
        cancel_url: "http://localhost:5173/",
      },
      transactions: [
        {
          amount: {
            total: totalPrice,
            currency: "USD", // Change currency as needed
          },
          description: `Reservation for ${reservation.startDate} to ${reservation.endDate} (ID: ${reservationId})`, // Include reservation ID in description
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

    console.log("Received PayPal webhook event:", event);

    if (eventType === "PAYMENTS.PAYMENT.CREATED") {
      const paymentDetails = event.resource;

      if (!paymentDetails) {
        console.error("Invalid payment details:", event);
        return res.status(400).send("Invalid payment details");
      }

      console.log("paymentDetails : ", paymentDetails);
      const paymentId = paymentDetails.id;
      const payerId = paymentDetails.payer.payer_info.payer_id;

      // Retrieve reservation ID from the return URL
      const returnURL = paymentDetails.redirect_urls.return_url;
      const reservationIdMatch = returnURL.match(/successful\/(\d+)/);
      const reservationId = reservationIdMatch ? reservationIdMatch[1] : null;

      if (!reservationId) {
        console.error("Reservation ID not found in the return URL:", returnURL);
        return res
          .status(400)
          .json({ error: "Reservation ID not found in the return URL" });
      }

      // Retrieve reservation details from the database
      const [
        reservation,
      ] = await db.query(`SELECT * FROM Reservations WHERE id = ?`, [
        reservationId,
      ]);

      if (!reservation) {
        return res.status(404).json({ error: "Reservation not found" });
      }

      // Check if reservation is already paid and processed
      if (reservation.isPaid && reservation.isProcessed) {
        console.log("Reservation is already paid and processed");
        return res
          .status(200)
          .json({ message: "Reservation is already paid and processed" });
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

          // Update reservation status to mark it as paid and processed
          await db.query(
            `UPDATE Reservations SET isPaid = 1, isProcessed = 1 WHERE id = ?`,
            [reservationId]
          );

          // Optionally, you can send an email notification here
          console.log("Payment successful");
          return res.status(200).json({ message: "Payment successful" });
        }
      );
    } else if (eventType === "PAYMENT.SALE.COMPLETED") {
      console.log("PAYMENT.SALE.COMPLETED");
    } else {
      console.log("Unhandled PayPal webhook event:", eventType);
      return res.status(400).json({ error: "Unhandled PayPal webhook event" });
    }
  } catch (error) {
    console.error("Error handling PayPal webhook event:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// Update reservation status function
async function updateReservationStatus(reservationId) {
  // Update reservation status in your database
}

async function getReservationById(reservationId) {
  try {
    const db = await startScript();
    const [
      reservation,
    ] = await db.query(`SELECT * FROM Reservations WHERE id = ?`, [
      reservationId,
    ]);
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

    // console.log("reservation: ", reservation);

    if (!reservation) {
      return res.status(404).json({ error: "Reservation not found" });
    }

    // Create a payment intent with Stripe
    const paymentIntent = await stripe.paymentIntents.create({
      amount: reservation[0].totalPrice * 100, // Convert to cents
      currency: "usd",
      metadata: { reservationId },
    });

    // Extract the client secret without the suffix
    const clientSecretPrefix = paymentIntent.client_secret.split("_secret_")[0];

    // Respond with the client secret prefix
    res.status(200).json({ clientSecret: clientSecretPrefix });
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
    const [
      reservation,
    ] = await db.query(`SELECT * FROM Reservations WHERE id = ?`, [
      reservationId,
    ]);

    if (!reservation) {
      return res.status(404).json({ error: "Reservation not found" });
    }

    // Confirm the payment with Stripe using the clientSecret
    const { paymentIntentId, paymentMethod } = req.body;
    const paymentIntent = await stripe.paymentIntents.confirm(paymentIntentId, {
      payment_method: paymentMethod,
      return_url: "https://yourdomain.com/payment/success",
    });

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
// Webhook handler to listen for payment_intent.succeeded event
async function handleStripeWebhook(req, res) {
  let event;

  try {
    event = req.body;
    // Verify the event to ensure it came from Stripe
    const verifiedEvent = await stripe.webhooks.constructEvent(
      req.rawBody,
      req.headers["stripe-signature"],
      "your_webhook_secret"
    );

    if (verifiedEvent.type === "payment_intent.succeeded") {
      const paymentIntent = verifiedEvent.data.object;
      const reservationId = paymentIntent.metadata.reservationId;

      // Retrieve reservation details from the database
      const db = await startScript();
      const [
        reservation,
      ] = await db.query(
        `SELECT * FROM Reservations WHERE id = ? AND isPaid = 0 AND isProcessed = 0`,
        [reservationId]
      );

      if (!reservation) {
        console.log("Reservation is already paid and processed or not found");
        return res.status(200).end();
      }

      // Update reservation status to mark it as paid and processed
      await db.query(
        `UPDATE Reservations SET isPaid = 1, isProcessed = 1 WHERE id = ?`,
        [reservationId]
      );

      // Optionally, you can send an email notification here
      console.log("Payment successful and reservation processed");

      res.status(200).end();
    } else {
      res.status(200).end();
    }
  } catch (error) {
    console.error("Error handling Stripe webhook event:", error);
    res.status(400).send(`Webhook Error: ${error.message}`);
  }
}

async function getAllApprovedAndPaidReservations(req, res) {
  try {
    // Retrieve reservation details from the database
    const db = await startScript();
    // Query to fetch all approved and paid reservations
    const query = `
      SELECT * 
      FROM Reservations 
      WHERE status = 'Approved' AND isPaid = 1
    `;

    const [results] = await db.query(query);

    res.status(200).json(results);
  } catch (error) {
    console.error("Error fetching reservations:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function getAllApprovedAndUnPaidReservations(req, res) {
  try {
    // Retrieve reservation details from the database
    const db = await startScript();
    // Query to fetch all approved and paid reservations
    const query = `
      SELECT * 
      FROM Reservations 
      WHERE status = 'Approved' AND isPaid = 0
    `;

    const [results] = await db.query(query);

    res.status(200).json(results);
  } catch (error) {
    console.error("Error fetching reservations:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function getAllApprovedAndPaidReservationsForUser(req, res) {
  try {
    // Extract user ID from request
    const userId = req.userId;

    // Query to fetch all approved and paid reservations for the logged-in user
    const query = `
      SELECT * 
      FROM Reservations 
      WHERE userId = ? AND status = 'Approved' AND isPaid = 1
    `;

    const [results] = await db.query(query, [userId]);

    res.status(200).json(results);
  } catch (error) {
    console.error("Error fetching user reservations:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function getUserReservationById(req, res) {
  const reservationId = req.params.id;
  const userId = req.params.userId;

  try {
    const db = await startScript();
    const [reservation] = await db.query(
      `SELECT 
      R.*, 
      U.phone,
      A.*,  -- Select all columns from Apartment
      JSON_ARRAYAGG(JSON_OBJECT('image_url', I.image_url)) AS apartment_images
  FROM 
      Reservations R
  INNER JOIN 
      Users U ON R.userId = U.id
  INNER JOIN 
      Apartment A ON R.apartmentId = A.id
  LEFT JOIN 
      Image I ON A.id = I.apartment_id
  WHERE 
      R.id = ? AND R.userId = ?
  GROUP BY 
      R.id;  -- Group by reservation ID to ensure one row per reservation
  `,
      [reservationId, userId]
    );

    if (!reservation) {
      return res.status(404).json({ error: "Reservation not found" });
    }

    return res.status(200).json({ reservation });
  } catch (error) {
    console.error("Error fetching reservation:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = {
  createReservation,
  getUserReservationById,
  getAllReservations,
  getReservation,
  approveReservation,
  declineReservation,
  handlePayPalPaymentSuccessWebhook,
  generatePayPalCheckoutUrl,
  createPaymentIntent,
  confirmPayment,
  handleStripeWebhook,
  getAllApprovedAndPaidReservationsForUser,
  getAllApprovedAndPaidReservations,
  getAllApprovedAndUnPaidReservations,
};
