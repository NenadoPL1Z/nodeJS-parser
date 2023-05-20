"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScheduleModel = exports.sequelize = void 0;
const express_1 = __importDefault(require("express"));
const pg_1 = __importDefault(require("pg"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const constants_1 = require("./lib/constants/constants");
const parseSchedule_1 = require("./lib/services/parser/parseSchedule");
const sequelize_1 = require("sequelize");
const getSchedule_1 = require("./lib/services/api/getSchedule");
const getUser_1 = require("./lib/services/api/getUser");
const app = (0, express_1.default)();
exports.sequelize = new sequelize_1.Sequelize("postgres://admin:omibTSgMhq7VG92uozcDXOsud7UMrg4J@dpg-chgb95u7avjbbju9hui0-a.oregon-postgres.render.com/preco", {
    dialect: "postgres",
    dialectModule: pg_1.default,
    dialectOptions: {
        ssl: true,
    },
});
exports.ScheduleModel = exports.sequelize.define("Schedule", {
    id: { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, autoIncrement: false },
    ruUpdateTime: { type: sequelize_1.DataTypes.STRING },
    result: { type: sequelize_1.DataTypes.STRING(300000) },
}, { tableName: "Schedule", freezeTableName: true });
app.use((0, cors_1.default)({ origin: "*" }));
app.use(body_parser_1.default.urlencoded({
    extended: true,
}));
app.use(body_parser_1.default.json());
app.get("/", (req, res) => {
    res.json("Preco parser");
});
app.get("/api/schedule", getSchedule_1.getSchedule);
app.post("/api/auth/login", getUser_1.getUser);
app.listen(constants_1.PORT, async () => {
    console.log(`Example app listening on port ${constants_1.PORT}`);
    try {
        await exports.sequelize.authenticate();
        console.log("Connection has been established successfully.");
    }
    catch (error) {
        console.error("Unable to connect to the database:", error);
    }
    if (constants_1.IS_SKIP_PARSE) {
        console.log("skip parse");
        return;
    }
    else {
        console.log("parse");
        (0, parseSchedule_1.parseSchedule)().finally();
    }
});
//# sourceMappingURL=app.js.map