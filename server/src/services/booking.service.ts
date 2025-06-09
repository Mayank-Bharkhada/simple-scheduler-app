import { Types } from "mongoose";
import { BookingModel } from "../models/booking.model";

export const createBooking = async (payload: {
    userId: Types.ObjectId;
    date: string;
    startTime: string;
    endTime: string;
    bookingLinkId: string;
    clientInfo: { name: string; email: string };
}) => {
    // Check if time slot already booked
    const existing = await BookingModel.findOne({
        userId: payload.userId,
        date: payload.date,
        startTime: payload.startTime,
        status: "booked"
    });

    if (existing) {
        throw new Error("Slot already booked");
    }

    const booking = new BookingModel(payload);
    return await booking.save();
};

export const cancelBooking = async (bookingId: string) => {
    const booking = await BookingModel.findById(bookingId);

    if (!booking) throw new Error("Booking not found");

    booking.status = "cancelled";

    return await booking.save();
};

export const getBookedSlots = async (userId: Types.ObjectId, date: string) => {
    return await BookingModel.find({
        userId,
        date,
        status: "booked"
    }).sort({ startTime: 1 });
};
