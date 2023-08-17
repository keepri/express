import "dotenv/config";
import env from "./src/utils/env";

export default {
    strict: true,
    verbose: true,
    driver: "turso",
    schema: "./src/db/schema.ts",
    out: "./src/db/drizzle",
    dbCredentials: {
        url: env.DATABASE_URL,
        authToken: env.DATABASE_AUTH_TOKEN,
    },
};
