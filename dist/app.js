"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const constants_1 = require("@/src/lib/constants/constants");
const body_parser_1 = __importDefault(require("body-parser"));
const API_ERROR_NAMESPACES_1 = require("@/src/lib/constants/api/API_ERROR_NAMESPACES");
const services_1 = require("@/src/lib/services/services");
const parseUser_1 = require("@/src/lib/services/parser/parseUser");
const parseSchedule_1 = require("@/src/lib/services/parser/parseSchedule");
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)({ origin: "*" }));
app.use(body_parser_1.default.urlencoded({
    extended: true,
}));
app.use(body_parser_1.default.json());
app.use(express_1.default.static(path_1.default.join((0, services_1.getStaticFolderPath)(), "static")));
app.get("/", async (req, res) => {
    res.json("Preco parser");
});
app.post("/auth/login", async (req, res) => {
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
                sendError(400, API_ERROR_NAMESPACES_1.API_ERROR_USER_AUTH.INVALID_REQUEST);
            })
                .catch(() => {
                sendError(400, API_ERROR_NAMESPACES_1.API_ERROR_USER_AUTH.INVALID_REQUEST);
            });
        }
        sendError(400, API_ERROR_NAMESPACES_1.API_ERROR_USER_AUTH.INVALID_DATA);
    }
    catch (e) {
        sendError(400, API_ERROR_NAMESPACES_1.API_ERROR_USER_AUTH.INVALID_REQUEST);
    }
});
app.listen(constants_1.PORT, () => {
    console.log(`Example app listening on port ${constants_1.PORT}`);
    (0, parseSchedule_1.parseSchedule)();
    setInterval(parseSchedule_1.parseSchedule, constants_1.SCHEDULE_UPDATE_INTERVAL);
});
//# sourceMappingURL=app.js.map