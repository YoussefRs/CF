const { validationResult } = require("express-validator");
const { createConnectionWithoutDatabase } = require("../../config/db");
const {
  sendReservationEmail,
  sendDeclineReservationEmail,
} = require("../utils/sendEmail");

async function createReservation(req, res) {
  const db = await createConnectionWithoutDatabase();
  try {
    // Extract data from the request body
    const { userId, apartmentId, startDate, endDate } = req.body;

    // Start a database transaction
    await db.beginTransaction();

    // Insert the reservation details into the Reservations table with status "Pending"
    const [reservationResult] = await db.query(
      `INSERT INTO Reservations (userId, apartmentId, startDate, endDate)
             VALUES (?, ?, ?, ?)`,
      [userId, apartmentId, startDate, endDate]
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
  const db = await createConnectionWithoutDatabase();
  try {
    // Execute SQL query to retrieve all reservations
    const [reservations] = await db.query("SELECT * FROM Reservations");
    // Respond with the retrieved reservations
    res.status(200).json(reservations);
  } catch (error) {
    console.error("Error fetching reservations:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function getReservation(req, res) {
  const db = await createConnectionWithoutDatabase();
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
  const db = await createConnectionWithoutDatabase();

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
  const db = await createConnectionWithoutDatabase();

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

module.exports = {
  createReservation,
  getAllReservations,
  getReservation,
  approveReservation,
  declineReservation,
};
