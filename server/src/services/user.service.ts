import mongoose from 'mongoose';
import { SignUpProps, UserModel } from '../models/user.model';
import { generateToken } from '../utils/jwt.utill';
import { hashPassword } from '../utils/bycrypt.utill';

export const findUserById = async (id: string | mongoose.Schema.Types.ObjectId) => {
  return UserModel.findById(id);
};

export const findUserByEmail = async (email: string) => {
  return UserModel.findOne({ email });
};

export const createUser = async ({ email, password, name }: SignUpProps) => {
  const hashedPassword = await hashPassword(password);
  const newUser = await UserModel.create({ email, password: hashedPassword, name });
  return await UserModel.findById(newUser.id);
};

export const generateUserToken = (user: any) => {
  return generateToken(user);
};
