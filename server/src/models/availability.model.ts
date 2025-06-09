import { Schema, model, Document, Types } from "mongoose";

export type IAvailability = Document & {
  userId: Types.ObjectId;
  date: string;
  startTime: string;
  endTime: string;
  slotDuration?: number;
}

const slotSchema = new Schema<IAvailability>({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  date: { type: String, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  slotDuration: { type: Number, default: 30 }
}, { timestamps: true });

export const AvailabilityModel = model<IAvailability>("Availability", slotSchema);
