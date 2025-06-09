import { Router } from "express";
import { bookSlot, cancelSlot, getBooked } from "../controllers/booking.controller";

const bookingRouter = Router();

bookingRouter.post("/", bookSlot); // create booking
bookingRouter.patch("/:bookingId/cancel", cancelSlot); // cancel booking
bookingRouter.get("/:date", getBooked); // get all booked slots for a date

export default bookingRouter;
