import { AvailabilityModel } from "../models/availability.model";
import { Types } from "mongoose";
import { BookingModel } from "../models/booking.model";

export const getUserAvailability = async (userId: Types.ObjectId) => {
  return await AvailabilityModel.find({ userId }).sort({ date: 1 });
};

export const createAvailability = async (
  userId: Types.ObjectId,
  date: string,
  startTime: string,
  endTime: string
) => {
  const slot = new AvailabilityModel({ userId, date, startTime, endTime });
  return await slot.save();
};

export const getBookingsByDate = async (userId: Types.ObjectId, date: string) => {
  return await BookingModel.find({ userId, date }).sort({ startTime: 1 });
};
