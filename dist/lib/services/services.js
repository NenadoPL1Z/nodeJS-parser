"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getScheduleData = exports.getGroupListData = exports.createScheduleJSON = exports.returnJSON = exports.sendErrorResponse = exports.sendSuccessResponse = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const sendSuccessResponse = (res) => {
    return ({ key = "data", data }) => {
        res.status(200);
        res.setHeader("Content-Type", "application/json");
        res.json({ [key]: data });
    };
};
exports.sendSuccessResponse = sendSuccessResponse;
const sendErrorResponse = (res) => {
    return (status, error) => {
        res.status(status);
        res.json({ error });
    };
};
exports.sendErrorResponse = sendErrorResponse;
const returnJSON = (res, jsonName) => {
    const fileDirectory = path_1.default.resolve(__dirname, "../../../", "static/jsons");
    res.sendFile(jsonName, { root: fileDirectory }, (err) => {
        res.end();
        if (err)
            throw err;
    });
};
exports.returnJSON = returnJSON;
const createScheduleJSON = (data) => {
    const json = JSON.stringify(data);
    fs_1.default.writeFile("static/jsons/schedule.json", json, "utf8", () => undefined);
};
exports.createScheduleJSON = createScheduleJSON;
const getGroupListData = () => {
    try {
        const result = [];
        const innerSelectElement = document.querySelector("#id_listgroups");
        const optionElementsArr = innerSelectElement.children;
        for (let i = 0; i < optionElementsArr.length; i++) {
            const optionElement = optionElementsArr[i];
            result.push({
                text: optionElement.textContent || "",
                value: optionElement.value,
            });
        }
        return result;
    }
    catch (e) {
        return [];
        throw e;
    }
};
exports.getGroupListData = getGroupListData;
const getScheduleData = () => {
    try {
        const CONTAINER_SELECTOR = ".urk_shedule";
        const CURRENT_DATE_SELECTOR = ".urk_sheduledate";
        const CURRENT_LESSON_SELECTOR = ".urk_lessonblock";
        const CURRENT_LESSON_TIME_SELECTOR = ".urk_timewindow";
        const CURREN_LESSON_DESCRIPTION_SELECTOR = ".urk_lessondescription";
        const schedulesData = [];
        const schedulesElement = document.querySelector(CONTAINER_SELECTOR);
        if (!schedulesElement) {
            return schedulesData;
        }
        const schedulesChildren = schedulesElement.children;
        for (let i = 0; i < schedulesChildren.length; i++) {
            const scheduleItem = { date: "", lessons: [] };
            const scheduleItemElement = schedulesChildren[i];
            const date = scheduleItemElement.querySelector(CURRENT_DATE_SELECTOR);
            scheduleItem.date = date?.textContent || "";
            const lessonsNodeArr = scheduleItemElement.querySelectorAll(CURRENT_LESSON_SELECTOR);
            for (let j = 0; j < lessonsNodeArr.length; j++) {
                const lesson = {
                    count: null,
                    timeStart: null,
                    timeEnd: null,
                    name: null,
                };
                const currentLessonElem = lessonsNodeArr[j];
                const lessonNameElement = currentLessonElem.querySelector(CURREN_LESSON_DESCRIPTION_SELECTOR);
                const lessonTimeElement = currentLessonElem.querySelector(CURRENT_LESSON_TIME_SELECTOR);
                const lessonTimeChildren = lessonTimeElement?.children || [];
                lesson.name = lessonNameElement?.textContent || "";
                lesson.count = lessonTimeChildren[0]?.textContent;
                lesson.timeStart = lessonTimeChildren[1]?.textContent;
                lesson.timeEnd = lessonTimeChildren[2]?.textContent;
                scheduleItem.lessons.push(lesson);
            }
            schedulesData.push(scheduleItem);
        }
        return schedulesData;
    }
    catch (e) {
        return [];
        throw e;
    }
};
exports.getScheduleData = getScheduleData;
//# sourceMappingURL=services.js.map