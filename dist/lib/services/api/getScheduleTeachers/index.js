"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getScheduleTeachers = void 0;
const app_1 = require("../../../../app");
const getScheduleTeachers = async (req, res) => {
    try {
        const schedule = await app_1.TeacherModel.findOne({ where: { id: 1 } });
        res.json(schedule);
    }
    catch (e) {
        res.status(400);
        res.json("error api");
    }
};
exports.getScheduleTeachers = getScheduleTeachers;
//# sourceMappingURL=index.js.map