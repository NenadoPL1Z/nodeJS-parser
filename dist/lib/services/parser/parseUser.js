"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseUser = void 0;
const authUser_1 = require("./authUser");
const constants_1 = require("../../constants/constants");
const PSEUDONYM_SELECTOR = "#page-header > div > div:last-child > h2";
const parseUser = async (login, password) => {
    try {
        const authPage = (await (0, authUser_1.authUser)(login, password));
        if ((0, authUser_1.checkAuthUser)(authPage)) {
            const { browser, page } = authPage;
            await page.waitForSelector(PSEUDONYM_SELECTOR, { timeout: 8000 });
            const FIOElement = await page.$(PSEUDONYM_SELECTOR);
            const pseudonym = (await page.evaluate((el) => el?.textContent, FIOElement)) || "";
            await browser.close();
            return pseudonym.trim();
        }
        new Error(constants_1.API_ERROR.INVALID_REQUEST);
    }
    catch (e) {
        return e;
    }
};
exports.parseUser = parseUser;
//# sourceMappingURL=parseUser.js.map