"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.API_ERROR = exports.SCHEDULE_UPDATE_INTERVAL = exports.IS_PROD = exports.ADMIN_PASSWORD = exports.ADMIN_LOGIN = exports.PORT = void 0;
exports.PORT = 3000;
exports.ADMIN_LOGIN = "19200072";
exports.ADMIN_PASSWORD = "7517984638";
exports.IS_PROD = process.env.NODE_ENV === "production";
exports.SCHEDULE_UPDATE_INTERVAL = 600000;
exports.API_ERROR = {
    INVALID_DATA: "Некорректный логин или пароль",
    INVALID_REQUEST: "Ошибка запроса, попробуйте позже.",
};
//# sourceMappingURL=constants.js.map