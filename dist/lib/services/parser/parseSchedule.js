"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseSchedule = void 0;
const authUser_1 = require("./authUser");
const constants_1 = require("../../constants/constants");
const services_1 = require("../services");
const SCHEDULE_URL = "https://moodle.preco.ru/blocks/lkstudents/sheduleonline.php";
const GROUPS_LIST_SELECTOR = "#id_listgroups";
const SEND_BUTTON_SELECTOR = "#id_submitbutton";
const parseSchedule = async () => {
    try {
        console.log(constants_1.ADMIN_LOGIN, constants_1.ADMIN_PASSWORD);
        const authPage = (await (0, authUser_1.authUser)(constants_1.ADMIN_LOGIN, constants_1.ADMIN_PASSWORD));
        if ((0, authUser_1.checkAuthUser)(authPage)) {
            const { browser, page } = authPage;
            await page.goto(SCHEDULE_URL);
            await page.waitForSelector(GROUPS_LIST_SELECTOR);
            await page.waitForSelector(SEND_BUTTON_SELECTOR);
            const groupListData = await page.evaluate(services_1.getGroupListData);
            const result = [];
            for (let i = 0; i < groupListData.length; i++) {
                const currentGroup = groupListData[i];
                await page.select(GROUPS_LIST_SELECTOR, currentGroup.value);
                await page.click(SEND_BUTTON_SELECTOR);
                await page.waitForNavigation({
                    timeout: 120000,
                    waitUntil: ["load", "networkidle2"],
                });
                await page.waitForFunction(() => document.readyState === "complete");
                const groupScheduleData = await page.evaluate(services_1.getScheduleData);
                result.push({
                    name: currentGroup.text,
                    value: currentGroup.value,
                    schedules: groupScheduleData,
                });
                await page.waitForTimeout(2000);
            }
            await browser.close();
            (0, services_1.createScheduleJSON)({ createdAt: new Date().getTime(), result });
            return;
        }
    }
    catch (e) {
        console.log(e);
    }
};
exports.parseSchedule = parseSchedule;
//# sourceMappingURL=parseSchedule.js.map