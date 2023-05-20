"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.API_ERROR = exports.IS_PRODUCTION = exports.IS_SKIP_PARSE = exports.ADMIN_PASSWORD = exports.ADMIN_LOGIN = exports.MICRO_TIMEOUT_PARSER = exports.SCHEDULE_UPDATE_INTERVAL = exports.PORT = void 0;
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
exports.PORT = 3000;
exports.SCHEDULE_UPDATE_INTERVAL = 300000;
exports.MICRO_TIMEOUT_PARSER = 300000;
exports.ADMIN_LOGIN = "19200072";
exports.ADMIN_PASSWORD = "7517984638";
exports.IS_SKIP_PARSE = process.env.SKIP_PARSE_SCHEDULE === "true";
exports.IS_PRODUCTION = process.env.NODE_ENV === "production";
exports.API_ERROR = {
    INVALID_DATA: "Некорректный логин или пароль",
    INVALID_REQUEST: "Ошибка запроса, попробуйте позже.",
};
//# sourceMappingURL=constants.js.map