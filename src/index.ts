import 'dotenv/config';
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { default as cookieParser } from "cookie-parser";
import {
    type Application,
    type Response,
    default as express,
    urlencoded,
    json,
    static as staticDir,
} from "express";
import env from './utils/env.js';

const app: Application = express();
const PORT: number = env.PORT || 8000;

app.use(helmet());
app.use(morgan(env.NODE_ENV === "development" ? "dev" : "combined"));
app.use(cors({ credentials: true }));
app.use(urlencoded({ extended: true }));
app.use(json());
app.use(cookieParser(env.COOKIE_SECRET));
app.use("/static", staticDir("static"));

app.get("/", async (_, res: Response) => {
    return res.status(200).send("hi");
});

app.listen(PORT, () => console.log(`server running on port ${PORT}`));
