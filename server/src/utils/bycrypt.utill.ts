import bcrypt from 'bcryptjs';
import { ENV } from '../configs/env.config';
import { IUser } from '../models/user.model';

const hashPassword = async (password: string): Promise<string> => {
    const salt = await bcrypt.genSalt(14); 
    const hashedPassword = await bcrypt.hash(password + ENV.APP_SECRET_KEY, salt); 
    return hashedPassword;
};

const comparePassword = async (password: string, user: IUser): Promise<boolean> => {
    return await bcrypt.compare(password + ENV.APP_SECRET_KEY, user.password); 
};

export { hashPassword, comparePassword };
