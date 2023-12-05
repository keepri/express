import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

const env = createEnv({
    isServer: true,
    server: {
        NODE_ENV: z.enum(["development", "production"]),
        PORT: z.coerce.number().optional(),
        COOKIE_SECRET: z.string().min(1),
        DATABASE_URL: z.string().min(1),
        DATABASE_AUTH_TOKEN: process.env.NODE_ENV === "production" ? z.string().min(1) : z.string().optional(),
    },
    runtimeEnv: process.env,
});

export { env };
