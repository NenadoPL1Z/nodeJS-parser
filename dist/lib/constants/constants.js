"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SCHEDULE_UPDATE_INTERVAL = exports.ADMIN_PASSWORD = exports.ADMIN_LOGIN = exports.PORT = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.PORT = 3000;
exports.ADMIN_LOGIN = process.env.ADMIN_LOGIN || "";
exports.ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "";
exports.SCHEDULE_UPDATE_INTERVAL = 600000;
//# sourceMappingURL=constants.js.map