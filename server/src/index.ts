import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.get("/", async (req: express.Request, res: express.Response): Promise<void> => {
    console.log("Debug Request : ", req.method, req.url);
    res.send("Server is running");
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Listening at http://localhost:${PORT}`));
