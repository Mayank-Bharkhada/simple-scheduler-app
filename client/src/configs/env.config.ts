import { z } from "zod";

const envVarsSchema = z.object({
    API_URL: z.string().nonempty("Env : VITE_API_URL is missing."),
    PREVIEW_URL: z.string().nonempty("Env : VITE_PREVIEW_URL is missing."),
});

const envVars = envVarsSchema.parse({
    API_URL: import.meta.env.VITE_API_URL,
    PREVIEW_URL: import.meta.env.VITE_PREVIEW_URL,
});

const ENV = {
    API_URL: envVars.API_URL,
    PREVIEW_URL: envVars.PREVIEW_URL,
};

export default ENV;
