import jwt, { JwtPayload } from 'jsonwebtoken';
import { IUser } from '../models/user.model';
import { ENV } from '../configs/env.config';

export const generateToken = (user: IUser): string => {
    return jwt.sign(
        { id: user._id },
        ENV.APP_SECRET_KEY,
        { expiresIn: '30m' }
    );
};

export const verifyToken = (token: string): JwtPayload | string => {
    return jwt.verify(token, ENV.APP_SECRET_KEY);
};
