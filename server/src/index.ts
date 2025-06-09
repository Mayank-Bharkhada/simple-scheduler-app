import express from "express";
import cors from "cors";
import db from "./utils/db.utill";
import availabilityRouter from "./routes/availability.route";
import { ENV } from "./configs/env.config";
import bookingRouter from "./routes/booking.route";
import authRouter from "./routes/auth.route";
import userRouter from "./routes/user.route";
import { authMiddleware } from "./middlewares/auth.middleware";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/availability", authMiddleware, availabilityRouter);
app.use("/api/bookings", authMiddleware, bookingRouter);
app.use("/api/user", authMiddleware, userRouter);
app.use("/api/auth", authRouter);

(async () => {
    await db.connect(ENV.DATABASE_URL);
    app.listen(ENV.PORT, () =>
        console.log(`Server running on http://localhost:${ENV.PORT}`)
    );
})();
