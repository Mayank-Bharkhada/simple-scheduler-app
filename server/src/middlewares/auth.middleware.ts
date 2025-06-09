import { Response, NextFunction } from "express";
import { JwtPayload } from "jsonwebtoken";
import asyncHandler from "../handlers/async.handler";
import { AuthenticatedRequest, IUser } from "../models/user.model";
import { verifyToken } from "../utils/jwt.utill";
import responseHandler from "../handlers/response.handler";
import { findUserById } from "../services/user.service";

export const authMiddleware = asyncHandler(async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
) => {
    const token = req.cookies["auth-token"];

    if (!token) {
        return responseHandler.badRequest(res, { message: "No token provided." }, "No token provided.");
    }

    const decoded = verifyToken(token) as JwtPayload;

    if (!decoded || !decoded.id || !decoded.exp) {
        return responseHandler.badRequest(res, { message: "Invalid or expired token." }, "Invalid or expired token.");
    }

    const user = await findUserById(decoded.id) as IUser;

    if (!user) {
        return responseHandler.badRequest(res, { message: "User not found." }, "User not found.");
    }

    req.user = user;

    next();
});
