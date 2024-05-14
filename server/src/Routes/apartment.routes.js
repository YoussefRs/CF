const express = require("express");
const {
  httpAddApartment,
  httpEditApartment,
  httpDeleteApartment,
  httpGetAllApartments,
  httpGetOneApartment,
  getAvailableDatesForApartment,
  createApartmentReview,
  getAllApartmentReview,
} = require("../Controllers/apratment.controller");
const { verifyAdmin } = require("../Middlewares/authorization_handler");

const appartmentRouter = express.Router();

// appartmentRouter.route("/addapartment").post(verifyAdmin, httpAddApartment);
appartmentRouter.route("/addapartment").post(httpAddApartment);
appartmentRouter
  .route("/:apartmentId/reviews")
  .post(createApartmentReview)
  .get(getAllApartmentReview);
appartmentRouter.route("/getAllAppart").get(httpGetAllApartments);
appartmentRouter
  .route("/:id")
  .get(httpGetOneApartment)
  .put(httpEditApartment)
  .delete(httpDeleteApartment);
appartmentRouter
  .route("/:id/available-dates")
  .get(getAvailableDatesForApartment);

module.exports = { appartmentRouter };
