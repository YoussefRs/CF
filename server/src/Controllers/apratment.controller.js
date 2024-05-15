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
      price,
      specialDates = [],
      description,
    } = req.body;

    console.log(specialDates)

    // Start a database transaction
    await db.beginTransaction();

    // Insert the apartment details into the Apartments table
    const [apartmentResult] = await db.query(
      `INSERT INTO Apartment (name, location, bedroom, bathroom, parking, rent, food, laundry, description, price)
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
        price,
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

    // Insert special dates into the Price table
    for (const specialDate of specialDates) {
      await db.query(
        `INSERT INTO Price (apartment_id, price, start_date, end_date)
                 VALUES (?, ?, ?, ?)`,
        [
          apartmentId,
          specialDate.price,
          specialDate.start_date,
          specialDate.end_date,
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
      price,
      specialDates = [],
      description,
    } = req.body;

    console.log(req.body);

    // Start a database transaction
    await db.beginTransaction();

    // Update the apartment details in the Apartments table
    await db.query(
      `UPDATE Apartment 
       SET name = ?, location = ?, bedroom = ?, bathroom = ?, parking = ?, rent = ?, food = ?, laundry = ?, description = ?, price = ?
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
        price,
        id,
      ]
    );
    // Get existing images from the database
    const [existingImages] = await db.query(
      `SELECT id, image_url FROM Image WHERE apartment_id = ?`,
      [id]
    );
    const existingImageUrls = existingImages.map((image) => image.image_url);
    const requestImageUrls = pictures.map((image) => image.image_url);

    for (const pictureURL of requestImageUrls) {
      const index = existingImageUrls.indexOf(pictureURL);
      if (index !== -1) {
        existingImageUrls.splice(index, 1);
      } else {
        if (pictureURL !== null) {
          await db.query(
            `INSERT INTO Image (apartment_id, image_url) VALUES (?, ?)`,
            [id, pictureURL]
          );
        }
      }
    }

    for (const imageUrl of existingImageUrls) {
      const imageToDelete = existingImages.find(
        (image) => image.image_url === imageUrl
      );
      await db.query(`DELETE FROM Image WHERE id = ?`, [imageToDelete.id]);
    }

    await db.query(`DELETE FROM Price WHERE apartment_id = ?`, [id]);

    for (const specialDate of specialDates) {
      await db.query(
        `INSERT INTO Price (apartment_id, price, start_date, end_date)
           VALUES (?, ?, ?, ?)`,
        [id, specialDate.price, specialDate.start_date, specialDate.end_date]
      );
    }

    await db.commit();

    res.status(200).json({ message: "Apartment updated successfully" });
  } catch (error) {
    await db.rollback();

    console.error("Error editing apartment:", error);
    res.status(500).json({ error: "Internal server error" });
  } finally {
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
      // Convert prices' dates to the desired format
      apartment.prices = prices?.map((price) => ({
        ...price,
        start_date: price?.start_date?.toISOString().split("T")[0],
        end_date: price?.end_date?.toISOString().split("T")[0],
      }));
    }

    // Query images for each apartment
    for (const apartment of apartments) {
      const [images] = await db.query(
        "SELECT * FROM Image WHERE apartment_id = ?",
        [apartment.id]
      );
      apartment.images = images;
    }
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

async function createApartmentReview(req, res) {
  const db = await startScript();
  try {
    const { apartmentId, userId, rating, comment } = req.body;

    // Insert the review into the database
    const result = await db.query(
      'INSERT INTO ApartmentReview (apartmentId, userId, rating, comment) VALUES (?, ?, ?, ?)',
      [apartmentId, userId, rating, comment]
    );

    res.status(201).json({ message: 'Review added successfully', reviewId: result.insertId });
  } catch (error) {
    console.error('Error adding review:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function getAllApartmentReview(req, res) {
  const db = await startScript();
  try {
    const { apartmentId } = req.params;

    const reviewsResult = await db.query(
      `SELECT 
         ApartmentReview.id, 
         ApartmentReview.apartmentId, 
         ApartmentReview.userId, 
         ApartmentReview.rating, 
         ApartmentReview.comment, 
         ApartmentReview.createdAt,
         Users.username
       FROM 
         ApartmentReview 
       INNER JOIN 
         Users 
       ON 
         ApartmentReview.userId = Users.id
       WHERE 
         ApartmentReview.apartmentId = ?`,
      [apartmentId]
    );

    // Extracting only the data array from the result
    const reviews = reviewsResult[0];

    res.status(200).json(reviews);
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}




// Export the controller function
module.exports = {
  httpAddApartment,
  createApartmentReview,
  getAllApartmentReview,
  httpEditApartment,
  httpDeleteApartment,
  httpGetAllApartments,
  httpGetOneApartment,
  getAvailableDatesForApartment,
};
