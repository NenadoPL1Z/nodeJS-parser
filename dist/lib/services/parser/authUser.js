"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAuthUser = exports.authUser = void 0;
const puppeteer_1 = __importDefault(require("puppeteer"));
const constants_1 = require("../../constants/constants");
const LOGIN_URL = "https://moodle.preco.ru/login/index.php";
const LOGIN_INPUT_SELECTOR = "#username";
const PASSWORD_INPUT_SELECTOR = "#password";
const SEND_BUTTON_SELECTOR = "#loginbtn";
const authUser = async (login, password) => {
    const browser = await puppeteer_1.default.launch({
        ignoreHTTPSErrors: true,
        args: [
            "--no-sandbox",
            "--disable-setuid-sandbox",
            "--shm-size=3gb",
            "--disable-dev-shm-usage",
        ],
        executablePath: constants_1.IS_PRODUCTION
            ? process.env.PUPPETEER_EXECUTABLE_PATH
            : puppeteer_1.default.executablePath(),
    });
    const page = await browser.newPage();
    await page.goto(LOGIN_URL, { timeout: constants_1.MICRO_TIMEOUT_PARSER });
    await page.setViewport({ width: 1920, height: 1080 });
    await page.waitForSelector(LOGIN_INPUT_SELECTOR, {
        timeout: constants_1.MICRO_TIMEOUT_PARSER,
    });
    await page.type(LOGIN_INPUT_SELECTOR, login);
    await page.waitForSelector(PASSWORD_INPUT_SELECTOR, {
        timeout: constants_1.MICRO_TIMEOUT_PARSER,
    });
    await page.type(PASSWORD_INPUT_SELECTOR, password);
    await page.waitForSelector(SEND_BUTTON_SELECTOR, {
        timeout: constants_1.MICRO_TIMEOUT_PARSER,
    });
    await page.click(SEND_BUTTON_SELECTOR);
    await page.waitForTimeout(5000);
    console.log("auth");
    return {
        browser,
        page,
    };
};
exports.authUser = authUser;
const checkAuthUser = (authPage) => {
    return "browser" in authPage && "page" in authPage;
};
exports.checkAuthUser = checkAuthUser;
//# sourceMappingURL=authUser.js.map