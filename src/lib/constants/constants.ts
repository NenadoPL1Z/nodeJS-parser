import { config } from "dotenv";
config();

export const PORT = 3000;
export const SCHEDULE_UPDATE_INTERVAL = 300000;
export const MICRO_TIMEOUT_PARSER = 300000;
export const ADMIN_LOGIN = "19200072";
export const ADMIN_PASSWORD = "7517984638";
export const IS_SKIP_PARSE = process.env.SKIP_PARSE_SCHEDULE === "true";
export const IS_PRODUCTION = process.env.NODE_ENV === "production";

export const API_ERROR = {
  INVALID_DATA: "Некорректный логин или пароль",
  INVALID_REQUEST: "Ошибка запроса, попробуйте позже.",
};
