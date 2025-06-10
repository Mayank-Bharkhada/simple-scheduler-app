import { Router } from 'express';
import { signIn, signUp, verifyAuth } from '../controllers/auth.controller';

const authRouter = Router();

authRouter.post('/verifyToken', verifyAuth);
authRouter.post('/signUp', signUp);
authRouter.post('/signIn', signIn);

export default authRouter;
