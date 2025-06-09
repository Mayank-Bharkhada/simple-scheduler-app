import { Request, Response } from "express";
import * as availabilityService from "../services/availability.service";
import mongoose from "mongoose";
import asyncHandler from "../handlers/async.handler";
import responseHandler from "../handlers/response.handler";

const mockUserId = new mongoose.Types.ObjectId("665f12345678901234567890"); // replace with auth

export const listAvailability = asyncHandler(async (req: Request, res: Response) => {
    const slots = await availabilityService.getUserAvailability(mockUserId);
    responseHandler.success(res, slots, "Availability slots fetched successfully");
});

export const createAvailabilitySlot = asyncHandler(async (req: Request, res: Response) => {
    const { date, startTime, endTime } = req.body;
    if (!date || !startTime || !endTime) return res.status(400).json({ message: "Missing fields" });

    const slot = await availabilityService.createAvailability(mockUserId, date, startTime, endTime);
    responseHandler.create(res, slot, "Availability slot created successfully");
});

export const getBookings = asyncHandler(async (req: Request, res: Response) => {
    const { date } = req.params;
    const bookings = await availabilityService.getBookingsByDate(mockUserId, date);
    responseHandler.success(res, bookings, "Bookings fetched successfully");
});
