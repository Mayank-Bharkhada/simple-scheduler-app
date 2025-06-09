import mongoose, { Schema, Document } from "mongoose";

export interface IAvailability extends Document {
  date: string;
  startTime: string;
  endTime: string;
}

const AvailabilitySchema: Schema = new Schema(
  {
    date: { type: String, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
  },
  { timestamps: true }
);

export const Availability = mongoose.model<IAvailability>("Availability", AvailabilitySchema);
