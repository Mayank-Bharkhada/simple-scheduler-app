import { Schema, model, Document, Types } from "mongoose";

export type IBooking = Document & {
    userId: Types.ObjectId;
    date: string;
    startTime: string;
    endTime: string;
    bookingLinkId: string;
    clientInfo: {
        name: string;
        email: string;
    };
    status: "booked" | "cancelled";
}

const bookingSchema = new Schema<IBooking>({
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    date: { type: String, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    bookingLinkId: { type: String, required: true },
    clientInfo: {
        name: { type: String, required: true },
        email: { type: String, required: true }
    },
    status: { type: String, enum: ["booked", "cancelled"], default: "booked" }
}, { timestamps: true });

export const BookingModel = model<IBooking>("Booking", bookingSchema);
