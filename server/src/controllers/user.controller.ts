import { Response } from 'express';
import responseHandler from '../handlers/response.handler';
import asyncHandler from '../handlers/async.handler';
import { AuthenticatedRequest } from '../models/user.model';

export const verify = asyncHandler(
    async (req: AuthenticatedRequest, res: Response) => {
        return responseHandler.success(res, { message: "Token verified!!" }, "Token verified!!");
    }
);

export const signOut = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    res.clearCookie('auth-token');
    return responseHandler.success(res, { message: "SignOut successfully." }, 'SignOut successfully.');
});
