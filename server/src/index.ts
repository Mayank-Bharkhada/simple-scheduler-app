import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import apiRouter from './routes';
import db from './utils/db.utill';
import errorHandler from './handlers/error.handler';
import { ENV } from './configs/env.config';

const app = express();
const port = ENV.PORT || 8000;

app.use(cookieParser());

app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

db.connect(ENV.DATABASE_URL);

app.get('/', (req, res) => {
    res.send('Welcome to the Service!');
});

app.use('/api', apiRouter);

app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
