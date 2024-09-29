import { z } from "zod";

const envSchema = z.object({
    NEXT_PUBLIC_AUTH_SECRET: z.string(),
    NEXT_PUBLIC_GOOGLE_AUTH_CLIENT_ID: z.string(),
    NEXT_PUBLIC_GOOGLE_AUTH_CLIENT_SECRET: z.string(),
    DATABASE_URL: z.string().url(),
})

const env = envSchema.parse(process.env);

export { env }