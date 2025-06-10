import { Request, Response } from 'express';
import asyncHandler from '../handlers/async.handler';
import { signInSchema, signUpSchema } from '../schemas/auth.schema';
import responseHandler from '../handlers/response.handler';
import { createUser, findUserByEmail, findUserById, generateUserToken } from '../services/user.service';
import { IUser } from '../models/user.model';
import { generateToken, verifyToken } from '../utils/jwt.utill';
import { JwtPayload } from 'jsonwebtoken';
import { comparePassword } from '../utils/bycrypt.utill';

export const signUp = asyncHandler(async (req: Request, res: Response) => {
    const validation = await signUpSchema.safeParseAsync(req.body);

    if (!validation.success) {
        return responseHandler.badRequest(res, validation.error.errors[0].message, "Invalid body parameters")
    }

    const { email } = validation.data;

    const existingUser = await findUserByEmail(email);

    if (existingUser) {
        return responseHandler.badRequest(res, { message: 'User already exists' }, 'User already exists')
    }

    const user = await createUser(validation.data) as IUser;

    const token = generateUserToken(user);

    res.cookie('auth-token', token, { httpOnly: true, secure: true, maxAge: 30 * 60 * 1000 });

    return responseHandler.create(res, user, 'SignUp successfully');
});

export const signIn = asyncHandler(async (req: Request, res: Response) => {
    const validation = await signInSchema.safeParseAsync(req.body);

    if (!validation.success) {
        return responseHandler.badRequest(res, validation.error.errors[0].message, "Invalid body parameters.")
    }

    const { email, password } = validation.data;

    const user = await findUserByEmail(email) as IUser;

    if (!user) {
        return responseHandler.badRequest(res, { message: 'Invalid credentials.' }, 'Invalid credentials.');
    }
    
    const isPasswordValid = await comparePassword(password, user);

    if (!isPasswordValid) {
        return responseHandler.badRequest(res, { message: "Invalid credentials." }, "Invalid credentials.");
    }

    const token = generateToken(user);

    res.cookie('auth-token', token, { httpOnly: true, secure: true, maxAge: 30 * 60 * 1000 });

    return responseHandler.success(res, user, "SignIn successful.");
});

export const verifyAuth = asyncHandler(async (req: Request, res: Response) => {

    const token = req.cookies['auth-token'];

    if (!token) {
        return responseHandler.badRequest(res, { message: "No token provided." }, "No token provided.");
    }

    const decodedToken = verifyToken(token) as JwtPayload;

    if (!decodedToken || !decodedToken.exp) {
        return responseHandler.badRequest(res, { message: "Invalid Token." }, "Invalid Token.");
    }

    const user = await findUserById(decodedToken.id) as IUser;

    if (!user) {
        return responseHandler.badRequest(res, { message: "User does not exists." }, "User does not exists.");
    }

    const remainingTime = decodedToken.exp * 1000 - Date.now();
    if (remainingTime < 60 * 1000) {
        const newToken = generateToken(user);
        res.cookie('auth-token', newToken, { httpOnly: true, secure: true, maxAge: 30 * 60 * 1000 });
    }

    return responseHandler.success(res, user, "Auth verifed successfully.");
});



