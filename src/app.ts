import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";

import config from "./config";
import errorHandler from "./middleware/errorHandler";
import fourOhFour from "./middleware/fourOhFour";
import root from "./routes/root";

import dotenv from 'dotenv';
import connectDB from './db'
import auth from './routes/auth';

const app = express();


dotenv.config();

connectDB()

// Apply most middleware first
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  cors({
    // @ts-ignore no-implicit-any
    origin: config.clientCorsOrigins[config.nodeEnv] ?? "*",
  })
);

app.use(helmet());
app.use(morgan("tiny"));

// Apply routes before error handling
app.use("/", root);
app.use("/auth", auth);

// Apply error handling last
app.use(fourOhFour);
app.use(errorHandler);

export default app;
