import env from "dotenv";
env.config();
export const PORT = process.env.PORT;
export const ADMIN_LOGIN = process.env.ADMIN_LOGIN || "";
export const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "";

export const SCHEDULE_UPDATE_INTERVAL = +(
  process.env.SCHEDULE_UPDATE_INTERVAL_MINUTES || 120000
);
