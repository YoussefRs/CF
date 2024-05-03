const express = require("express");
const passport = require("passport");
const {
  httpAddApartment,
  httpEditApartment,
  httpDeleteApartment,
  httpGetAllApartments,
  httpGetOneApartment,
  getAvailableDatesForApartment,
} = require("../Controllers/apratment.controller");
const { verifyAdmin } = require("../Middlewares/authorization_handler");

const appartmentRouter = express.Router();

appartmentRouter.route("/addapartment").post(verifyAdmin, httpAddApartment);
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
