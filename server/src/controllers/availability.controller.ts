import { Request, Response } from "express";
import { createAvailability, getAvailabilities } from "../services/availability.service";
import { availabilitySchema } from "../schemas/availability.schema";
import resposeHandler from "../handlers/response.handler";
import asyncHandler from "../handlers/async.handler";

export const addAvailability = asyncHandler(async (req: Request, res: Response) => {
    const parseResult = availabilitySchema.safeParse(req.body);
    if (!parseResult.success) {
        return resposeHandler.badRequest(res, parseResult.error.errors);
    }

    const availability = await createAvailability(parseResult.data);
    resposeHandler.create(res, availability);
});

export const listAvailabilities = asyncHandler(async (req: Request, res: Response) => {
    const availabilities = await getAvailabilities();
    resposeHandler.success(res, availabilities);
});
