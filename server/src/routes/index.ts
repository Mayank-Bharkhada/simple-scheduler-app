import { Router } from 'express';
import { authMiddleware } from '../middlewares/auth.middleware';
import availabilityRouter from './availability.route';
import bookingRouter from './booking.route';
import userRouter from './user.route';
import authRouter from './auth.route';

const apiRouter = Router();

apiRouter.use("/availability", authMiddleware, availabilityRouter);
apiRouter.use("/bookings", authMiddleware, bookingRouter);
apiRouter.use("/user", authMiddleware, userRouter);
apiRouter.use("/auth", authRouter);

export default apiRouter;
