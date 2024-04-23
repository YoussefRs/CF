const express = require("express");
const {
  createReservation,
  getReservation,
  getAllReservations,
  approveReservation,
  declineReservation
} = require("../Controllers/reservations.controller");

const reservationRouter = express.Router();

reservationRouter.route("/").get(getAllReservations);
reservationRouter.route("/add").post(createReservation);
reservationRouter.route("/:id").get(getReservation);
reservationRouter.route("/:id/approve").put(approveReservation);
reservationRouter.route("/:id/decline").put(declineReservation);

module.exports = { reservationRouter };
