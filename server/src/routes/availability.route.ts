import { Router } from "express";
import { addAvailability, listAvailabilities } from "../controllers/availability.controller";

const router = Router();

router.post("/", addAvailability);
router.get("/", listAvailabilities);

export default router;
