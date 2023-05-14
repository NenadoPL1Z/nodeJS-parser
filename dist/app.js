"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScheduleModel = exports.sequelize = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const services_1 = require("./lib/services/services");
const parseUser_1 = require("./lib/services/parser/parseUser");
const constants_1 = require("./lib/constants/constants");
const API_ERROR_NAMESPACES_1 = require("./lib/constants/api/API_ERROR_NAMESPACES");
const sequelize_1 = require("sequelize");
const app = (0, express_1.default)();
exports.sequelize = new sequelize_1.Sequelize("postgres://admin:omibTSgMhq7VG92uozcDXOsud7UMrg4J@dpg-chgb95u7avjbbju9hui0-a.oregon-postgres.render.com/preco", {
    dialect: "postgres",
    protocol: "postgres",
    // dialectOptions: {
    //   ssl: true,
    //   native: true,
    // },
});
exports.ScheduleModel = {} ||
    exports.sequelize.define("Schedule", {
        id: { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, autoIncrement: false },
        ruUpdateTime: { type: sequelize_1.DataTypes.STRING },
        result: { type: sequelize_1.DataTypes.STRING(300000) },
    }, { tableName: "Schedule", freezeTableName: true });
app.use((0, cors_1.default)({ origin: "*" }));
app.use(body_parser_1.default.urlencoded({
    extended: true,
}));
app.use(body_parser_1.default.json());
app.get("/", async (req, res) => {
    res.json("Preco parser");
});
app.get("/api/schedule", async (req, res) => {
    const schedule = await exports.ScheduleModel.findOne({ where: { id: 1 } });
    res.json(schedule);
});
app.post("/api/create/schedule", async (req, res) => {
    (0, services_1.setScheduleDB)(JSON.stringify({ test: 123 }));
    res.json("success");
});
app.post("/api/auth/login", async (req, res) => {
    const sendSuccess = (0, services_1.sendSuccessResponse)(res);
    const sendError = (0, services_1.sendErrorResponse)(res);
    try {
        const { login, password } = req.body;
        if (login && password) {
            return await (0, parseUser_1.parseUser)(login, password)
                .then((response) => {
                if (typeof response === "string") {
                    return sendSuccess({
                        data: {
                            userName: response,
                            updatedAt: constants_1.SCHEDULE_UPDATE_INTERVAL,
                        },
                    });
                }
                sendError(400, {
                    message: API_ERROR_NAMESPACES_1.API_ERROR_USER_AUTH.INVALID_REQUEST,
                    data: "",
                });
            })
                .catch((e) => {
                sendError(400, {
                    message: API_ERROR_NAMESPACES_1.API_ERROR_USER_AUTH.INVALID_REQUEST,
                    data: e,
                });
                throw e;
            });
        }
        sendError(400, { message: API_ERROR_NAMESPACES_1.API_ERROR_USER_AUTH.INVALID_DATA, data: "" });
    }
    catch (e) {
        sendError(400, { message: API_ERROR_NAMESPACES_1.API_ERROR_USER_AUTH.INVALID_REQUEST, data: e });
        throw e;
    }
});
app.listen(constants_1.PORT, async () => {
    console.log(`Example app listening on port ${constants_1.PORT}`);
    try {
        // await sequelize.authenticate();
        // await sequelize.sync({ force: true });
        console.log("Connection has been established successfully.");
    }
    catch (error) {
        console.error("Unable to connect to the database:", error);
    }
    // parseSchedule().then();
    // setInterval(parseSchedule, SCHEDULE_UPDATE_INTERVAL);
});
//# sourceMappingURL=app.js.map