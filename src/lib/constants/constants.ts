import env from "dotenv";
env.config();
export const PORT = 3000;
export const ADMIN_LOGIN = process.env.ADMIN_LOGIN || "19200072";
export const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "7517984638";

export const IS_VERCEL = process.env.AWS_LAMBDA_FUNCTION_VERSION;

export const SCHEDULE_UPDATE_INTERVAL = 600000;
