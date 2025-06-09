import express from "express";
import cors from "cors";
import db from "./utils/db";
import availabilityRouter from "./routes/availability.route";
import { ENV } from "./configs/env.config";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/availability", availabilityRouter);

(async () => {
    await db.connect(ENV.DATABASE_URL);
    app.listen(ENV.PORT, () =>
        console.log(`Server running on http://localhost:${ENV.PORT}`)
    );
})();
