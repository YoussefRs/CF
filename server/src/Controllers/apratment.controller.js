const { validationResult } = require("express-validator");
const {
  createConnectionWithoutDatabase,
  startScript,
} = require("../../config/db");

// Controller function to add a new apartment
async function httpAddApartment(req, res) {
  const db = await startScript();
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
      defaultSpecialDate,
      specialDates = [],
      description,
    } = req.body;

    console.log(req.body);

    // Start a database transaction
    await db.beginTransaction();

    // Insert the apartment details into the Apartments table
    const [apartmentResult] = await db.query(
      `INSERT INTO Apartment (name, location, bedroom, bathroom, parking, rent, food, laundry, description, default_special_date)
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
        description,
        JSON.stringify(defaultSpecialDate),
      ]
    );

    // Get the ID of the newly inserted apartment
    const apartmentId = apartmentResult.insertId;

    // Insert pictures into the Image table
    for (const pictureURL of pictures) {
      await db.query(
        `INSERT INTO Image (apartment_id, image_url)
                 VALUES (?, ?)`,
        [apartmentId, pictureURL]
      );
    }

    // Insert default special date into the Price table
    await db.query(
      `INSERT INTO Price (apartment_id, price, start_date, end_date)
             VALUES (?, ?, ?, ?)`,
      [
        apartmentId,
        defaultSpecialDate.price,
        defaultSpecialDate.startDate,
        defaultSpecialDate.endDate,
      ]
    );

    // Insert special dates into the Price table
    for (const specialDate of specialDates) {
      await db.query(
        `INSERT INTO Price (apartment_id, price, start_date, end_date)
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

    // Respond with success message
    res.status(201).json({ message: "Apartment added successfully" });
  } catch (error) {
    // Rollback the transaction if an error occurs
    await db.rollback();

    console.error("Error adding apartment:", error);
    res.status(500).json({ error: "Internal server error" });
  } finally {
    // Close the database connection
    await db.end();
  }
}

async function httpEditApartment(req, res) {
  const db = await startScript();
  try {
    const { id } = req.params; // Get the id of the apartment to be edited from the request params

    // Extract data from the request body
    const {
      name,
      location,
      bedroom,
      bathroom,
      parking = false,
      rent = false,
      food = false,
      laundry = false,
      pictures,
      default_special_date,
      specialDates = [],
      description,
    } = req.body;

    console.log(req.body);

    // Start a database transaction
    await db.beginTransaction();

    // Update the apartment details in the Apartments table
    await db.query(
      `UPDATE Apartment 
       SET name = ?, location = ?, bedroom = ?, bathroom = ?, parking = ?, rent = ?, food = ?, laundry = ?, description = ?, default_special_date = ?
       WHERE id = ?`,
      [
        name,
        location,
        bedroom,
        bathroom,
        parking,
        rent,
        food,
        laundry,
        description,
        JSON.stringify(default_special_date),
        id,
      ]
    );

    // Retrieve existing images for the apartment
    const existingImages = await db.query(
      `SELECT image_url FROM Image WHERE apartment_id = ?`,
      [id]
    );

    // Combine existing images with newly uploaded images
    const allImages = [
      ...existingImages.map(({ image_url }) => image_url),
      ...pictures,
    ];

    // Delete existing images for the apartment
    await db.query(`DELETE FROM Image WHERE apartment_id = ?`, [id]);

    // Insert all images (existing + newly uploaded) into the Image table
    for (const pictureURL of allImages) {
      await db.query(
        `INSERT INTO Image (apartment_id, image_url)
           VALUES (?, ?)`,
        [id, pictures]
      );
    }

    // Delete existing special dates for the apartment
    await db.query(`DELETE FROM Price WHERE apartment_id = ?`, [id]);

    // Insert default special date into the Price table
    await db.query(
      `INSERT INTO Price (apartment_id, price, start_date, end_date)
         VALUES (?, ?, ?, ?)`,
      [
        id,
        default_special_date.price,
        default_special_date.startDate,
        default_special_date.endDate,
      ]
    );

    // Insert special dates into the Price table
    for (const specialDate of specialDates) {
      await db.query(
        `INSERT INTO Price (apartment_id, price, start_date, end_date)
           VALUES (?, ?, ?, ?)`,
        [id, specialDate.price, specialDate.startDate, specialDate.endDate]
      );
    }

    // Commit the transaction
    await db.commit();

    // Respond with success message
    res.status(200).json({ message: "Apartment updated successfully" });
  } catch (error) {
    // Rollback the transaction if an error occurs
    await db.rollback();

    console.error("Error editing apartment:", error);
    res.status(500).json({ error: "Internal server error" });
  } finally {
    // Close the database connection
    await db.end();
  }
}

async function httpDeleteApartment(req, res) {
  const db = await startScript();
  try {
    const apartmentId = req.params.id;

    // Start a database transaction
    await db.beginTransaction();

    // Delete associated reservations from the Reservations table
    await db.query(`DELETE FROM Reservations WHERE apartmentId = ?`, [
      apartmentId,
    ]);

    // Delete associated images from the Images table
    await db.query(`DELETE FROM Image WHERE apartment_id = ?`, [apartmentId]);

    // Delete associated prices from the Price table
    await db.query(`DELETE FROM Price WHERE apartment_id = ?`, [apartmentId]);

    // Delete the apartment from the Apartments table
    await db.query(`DELETE FROM Apartment WHERE id = ?`, [apartmentId]);

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
  const db = await startScript();
  try {
    // Query all apartments from the Apartments table
    const [apartments] = await db.query("SELECT * FROM Apartment");

    // Query prices for each apartment
    for (const apartment of apartments) {
      const [prices] = await db.query(
        "SELECT * FROM Price WHERE apartment_id = ?",
        [apartment.id]
      );
      apartment.prices = prices;
    }

    // Query images for each apartment
    for (const apartment of apartments) {
      const [images] = await db.query(
        "SELECT * FROM Image WHERE apartment_id = ?",
        [apartment.id]
      );
      apartment.images = images;
    }

    // Respond with the list of apartments
    res.status(200).json({ apartments });
  } catch (error) {
    console.error("Error getting apartments:", error);
    res.status(500).json({ error: "Internal server error" });
  } finally {
    // Close the database connection
    await db.end();
  }
}

async function httpGetOneApartment(req, res) {
  const db = await startScript();
  try {
    // Extract the apartment ID from the request parameters
    const { id } = req.params;

    // Query the apartment details from the Apartments table
    const [apartmentResult] = await db.query(
      `SELECT * FROM Apartment WHERE id = ?`,
      [id]
    );

    // Check if the apartment exists
    if (!apartmentResult.length) {
      return res.status(404).json({ error: "Apartment not found" });
    }

    const apartment = apartmentResult[0];

    // Query prices for the apartment
    const [prices] = await db.query(
      "SELECT * FROM Price WHERE apartment_id = ?",
      [id]
    );
    apartment.prices = prices;

    // Query images for the apartment
    const [images] = await db.query(
      "SELECT * FROM Image WHERE apartment_id = ?",
      [id]
    );
    apartment.images = images;

    // Respond with the apartment details
    res.status(200).json({ apartment });
  } catch (error) {
    console.error("Error getting apartment:", error);
    res.status(500).json({ error: "Internal server error" });
  } finally {
    // Close the database connection
    await db.end();
  }
}

async function getAvailableDatesForApartment(req, res) {
  const db = await startScript();
  try {
    // Extract the apartment ID from the request parameters
    const { id } = req.params;

    // Query prices for the apartment from the Price table
    const [pricesResult] = await db.query(
      `SELECT * FROM Price WHERE apartment_id = ?`,
      [id]
    );

    // Check if prices exist for the apartment
    if (!pricesResult.length) {
      return res
        .status(404)
        .json({ error: "Prices not found for this apartment" });
    }

    // Respond with the prices table
    res.status(200).json({ prices: pricesResult });
  } catch (error) {
    console.error("Error getting prices:", error);
    res.status(500).json({ error: "Internal server error" });
  } finally {
    // Close the database connection
    await db.end();
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
