const { validationResult } = require("express-validator");
const { createConnectionWithoutDatabase } = require("../../config/db");

// Controller function to add a new apartment
async function httpAddApartment(req, res) {
  const db = await createConnectionWithoutDatabase();
  try {
    // Extract data from the request body
    const {
      apartmentName,
      location,
      bedroom,
      bathroom,
      parking = false,
      rent = false,
      food = false,
      laundry = false,
      pictures,
      description,
      specialDates = [],
    } = req.body;

    // Create a database connection

    // Start a database transaction
    await db.beginTransaction();

    const pictureUrls = pictures.join(", ");

    // Insert the apartment details into the Apartments table
    const [apartmentResult] = await db.query(
      `INSERT INTO Apartments (apartmentName, location, bedroom, bathroom, parking, rent, food, laundry, pictures, description)
   VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        apartmentName,
        location,
        bedroom,
        bathroom,
        parking,
        rent,
        food,
        laundry,
        pictureUrls,
        description,
      ]
    );

    // Get the ID of the newly inserted apartment
    const apartmentId = apartmentResult.insertId;

    // Insert special dates into the SpecialDates table
    for (const specialDate of specialDates) {
      const [specialDateResult] = await db.query(
        `INSERT INTO SpecialDates (apartmentId, price, startDate, endDate)
             VALUES (?, ?, ?, ?)`,
        [
          apartmentId,
          specialDate.price,
          specialDate.startDate,
          specialDate.endDate,
        ]
      );
    }

    // Commit the transaction
    await db.commit();

    // Close the database connection
    await db.end();

    // Respond with success message
    res.status(201).json({ message: "Apartment added successfully" });
  } catch (error) {
    // Rollback the transaction if an error occurs
    await db.rollback();

    console.error("Error adding apartment:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function httpEditApartment(req, res) {
  const db = await createConnectionWithoutDatabase();
  try {
    // Extract data from the request body
    const {
      id,
      apartmentName,
      location,
      bedroom,
      bathroom,
      parking = false,
      rent = false,
      food = false,
      laundry = false,
      pictures,
      description,
      specialDates = [],
    } = req.body;

    const apId = req.params.id;

    // Start a database transaction
    await db.beginTransaction();

    // Update the apartment details in the Apartments table
    const [apartmentResult] = await db.query(
      `UPDATE Apartments 
           SET apartmentName = ?, location = ?, bedroom = ?, bathroom = ?, parking = ?, rent = ?, food = ?, laundry = ?, pictures = ?, description = ?
           WHERE id = ?`,
      [
        apartmentName,
        location,
        bedroom,
        bathroom,
        parking,
        rent,
        food,
        laundry,
        // Concatenate picture URLs into a single string separated by a comma
        pictures.join(", "), // Assuming pictures is an array of URLs
        description,
        apId,
      ]
    );

    // Delete existing special dates for the apartment
    await db.query(
      `DELETE FROM SpecialDates 
           WHERE apartmentId = ?`,
      [apId]
    );

    // Insert new special dates into the SpecialDates table
    for (const specialDate of specialDates) {
      const [specialDateResult] = await db.query(
        `INSERT INTO SpecialDates (apartmentId, price, startDate, endDate)
             VALUES (?, ?, ?, ?)`,
        [apId, specialDate.price, specialDate.startDate, specialDate.endDate]
      );
    }

    // Commit the transaction
    await db.commit();

    // Close the database connection
    await db.end();

    // Respond with success message
    res.status(200).json({ message: "Apartment updated successfully" });
  } catch (error) {
    // Rollback the transaction if an error occurs
    await db.rollback();

    console.error("Error editing apartment:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function httpDeleteApartment(req, res) {
  const db = await createConnectionWithoutDatabase();
  try {
    const apartmentId = req.params.id;

    // Start a database transaction
    await db.beginTransaction();

    // Delete the apartment from the Apartments table
    await db.query(`DELETE FROM Apartments WHERE id = ?`, [apartmentId]);

    // Delete associated special dates from the SpecialDates table
    await db.query(`DELETE FROM SpecialDates WHERE apartmentId = ?`, [
      apartmentId,
    ]);

    // Commit the transaction
    await db.commit();

    // Close the database connection
    await db.end();

    // Respond with success message
    res.status(200).json({ message: "Apartment deleted successfully" });
  } catch (error) {
    // Rollback the transaction if an error occurs
    await db.rollback();

    console.error("Error deleting apartment:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function httpGetAllApartments(req, res) {
  const db = await createConnectionWithoutDatabase();
  try {
    // Execute SQL query to retrieve all apartments along with their special dates
    const query = `
    SELECT Apartments.*, SpecialDates.*
    FROM Apartments
    INNER JOIN SpecialDates ON Apartments.id = SpecialDates.apartmentId;
    `;
    const [apartmentsWithSpecialDates] = await db.query(query);

    // Close the database connection
    await db.end();

    // Respond with the retrieved apartments along with their special dates
    res.status(200).json(apartmentsWithSpecialDates);
  } catch (error) {
    console.error("Error fetching apartments:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function httpGetOneApartment(req, res) {
  const db = await createConnectionWithoutDatabase();
  try {
    const apId = req.params.id;
    // Execute SQL query to retrieve a single apartment along with its special dates
    const query = `
    SELECT Apartments.*, SpecialDates.*
    FROM Apartments
    INNER JOIN SpecialDates ON Apartments.id = SpecialDates.apartmentId;
    `;
    const [apartmentWithSpecialDates] = await db.query(query, [apId]);

    // Close the database connection
    await db.end();

    // Respond with the retrieved apartment along with its special dates
    res.status(200).json(apartmentWithSpecialDates[0]);
  } catch (error) {
    console.error("Error fetching apartment:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function getAvailableDatesForApartment(req, res) {
  const db = await createConnectionWithoutDatabase();
  try {
    const apartmentId = req.params.id;
    // Execute SQL query to retrieve available dates for the specified apartment
    const [availableDates] = await db.query(
      `SELECT startDate, endDate FROM SpecialDates WHERE apartmentId = ?`,
      [apartmentId]
    );

    // Close the database connection
    await db.end();

    // Respond with the retrieved available dates
    res.status(200).json(availableDates);
  } catch (error) {
    console.error("Error fetching available dates for apartment:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

// Export the controller function
module.exports = {
  httpAddApartment,
  httpEditApartment,
  httpDeleteApartment,
  httpGetAllApartments,
  httpGetOneApartment,
  getAvailableDatesForApartment,
};
