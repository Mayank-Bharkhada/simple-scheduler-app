import { Router } from 'express';
import { signOut, verify } from '../controllers/user.controller';

const userRouter = Router();

userRouter.get('/verify', verify);
userRouter.get('/signout', signOut);

export default userRouter;
