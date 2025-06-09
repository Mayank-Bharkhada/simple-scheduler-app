import { Request } from "express";
import { Schema, model, Document } from "mongoose";
import { signInSchema, signUpSchema } from "../schemas/auth.schema";
import { z } from "zod";

export type IUser = Document & {
  name: string;
  email: string;
  password: string;
  timezone: string;
};

export type AuthenticatedRequest = Request & {
  user?: IUser;
};

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  timezone: { type: String, default: "UTC" }
}, { timestamps: true });

export const UserModel = model<IUser>("User", userSchema);

export type SignUpProps = z.infer<typeof signUpSchema>;
export type SignInProps = z.infer<typeof signInSchema>;