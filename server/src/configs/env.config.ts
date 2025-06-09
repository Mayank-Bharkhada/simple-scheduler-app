import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const envSchema = z.object({
    DATABASE_URL: z.string({
        required_error: 'DATABASE_URL is required.',
        invalid_type_error: 'DATABASE_URL must be a string.',
    }),
    PORT: z.string().optional(), // Optional, fallback handled below
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
    console.error("❌ Invalid environment variables:", parsedEnv.error.format());
    process.exit(1);
}

export const ENV = {
    ...parsedEnv.data,
    PORT: parsedEnv.data.PORT || "5000", // Fallback to default
};
