import express from "express";
import cors from "cors";
import db from "./utils/db.utill";
import { ENV } from "./configs/env.config";
import errorHandler from "./handlers/error.handler";
import apiRouter from "./routes";

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api', apiRouter);
app.use(errorHandler);

(async () => {
    await db.connect(ENV.DATABASE_URL);
    app.listen(ENV.PORT, () =>
        console.log(`Server running on http://localhost:${ENV.PORT}`)
    );
})();
