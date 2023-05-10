import env from "dotenv";
env.config();
export const PORT = 3000;
export const ADMIN_LOGIN = process.env.ADMIN_LOGIN || "";
export const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "";

export const SCHEDULE_UPDATE_INTERVAL = 600000;
