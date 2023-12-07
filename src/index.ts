import "dotenv/config";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { default as cookieParser } from "cookie-parser";
import {
    default as express,
    urlencoded,
    json,
    static as staticDir,
    type Application,
} from "express";
import { env } from "./lib/env.js";
import { errorHandler } from "./lib/errors.js";

const app: Application = express();

app.use(helmet());
app.use(morgan(env.NODE_ENV === "development" ? "dev" : "combined"));
app.use(cors({ credentials: true }));
app.use(urlencoded({ extended: true }));
app.use(json());
app.use(cookieParser(env.COOKIE_SECRET));
app.use("/static", staticDir("static"));

app.get("/healthz", (_req, res) => res.status(200).send("cool"));

app.use(errorHandler);

app.listen(env.PORT, () => console.log(`server running on port ${env.PORT}`));
