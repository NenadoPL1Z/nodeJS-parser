"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUser = void 0;
const services_1 = require("../../services");
const parseUser_1 = require("../../parser/parseUser");
const constants_1 = require("../../../constants/constants");
const getUser = async (req, res) => {
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
                    message: constants_1.API_ERROR.INVALID_DATA,
                    data: "",
                });
            })
                .catch((e) => {
                sendError(400, {
                    message: constants_1.API_ERROR.INVALID_REQUEST,
                    data: e,
                });
                throw e;
            });
        }
        sendError(400, { message: constants_1.API_ERROR.INVALID_DATA, data: "" });
    }
    catch (e) {
        sendError(400, { message: constants_1.API_ERROR.INVALID_REQUEST, data: e });
        throw e;
    }
};
exports.getUser = getUser;
//# sourceMappingURL=index.js.map