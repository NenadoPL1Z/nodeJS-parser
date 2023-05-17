"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSchedule = void 0;
const app_1 = require("../../../../app");
const getSchedule = async (req, res) => {
    try {
        const schedule = await app_1.ScheduleModel.findOne({ where: { id: 1 } });
        res.json(schedule);
    }
    catch (e) {
        res.status(400);
        res.json("error api");
    }
};
exports.getSchedule = getSchedule;
//# sourceMappingURL=index.js.map