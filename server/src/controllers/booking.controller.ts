import { Request, Response } from "express";
import * as bookingService from "../services/booking.service";
import mongoose from "mongoose";
import asyncHandler from "../handlers/async.handler";

const mockUserId = new mongoose.Types.ObjectId("665f12345678901234567890");

export const bookSlot = asyncHandler(async (req: Request, res: Response) => {
    const { date, startTime, endTime, bookingLinkId, clientInfo } = req.body;

    if (!date || !startTime || !endTime || !bookingLinkId || !clientInfo?.email || !clientInfo?.name) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    const booking = await bookingService.createBooking({
        userId: mockUserId,
        date,
        startTime,
        endTime,
        bookingLinkId,
        clientInfo
    });

    res.status(201).json(booking);
});

export const cancelSlot = asyncHandler(async (req: Request, res: Response) => {
    const { bookingId } = req.params;
    const updated = await bookingService.cancelBooking(bookingId);
    res.status(200).json(updated);
});

export const getBooked = asyncHandler(async (req: Request, res: Response) => {
    const { date } = req.params;
    const bookings = await bookingService.getBookedSlots(mockUserId, date);
    res.status(200).json(bookings);
});
