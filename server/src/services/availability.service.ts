import { Availability, IAvailability } from "../models/availability.model";

export const createAvailability = async (data: Partial<IAvailability>) => {
  const availability = new Availability(data);
  return await availability.save();
};

export const getAvailabilities = async () => {
  return await Availability.find().sort({ date: 1, startTime: 1 }).exec();
};
