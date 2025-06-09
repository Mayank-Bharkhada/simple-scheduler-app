import { Router } from "express";
import {
  listAvailability,
  createAvailabilitySlot,
  getBookings,
} from "../controllers/availability.controller";

const availabilityRouter = Router();

availabilityRouter.get("/", listAvailability);
availabilityRouter.post("/", createAvailabilitySlot);
availabilityRouter.get("/:date/bookings", getBookings);

export default availabilityRouter;
