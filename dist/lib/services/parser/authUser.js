"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAuthUser = exports.authUser = void 0;
const puppeteer_core_1 = __importDefault(require("puppeteer-core"));
const chrome_aws_lambda_1 = __importDefault(require("chrome-aws-lambda"));
const LOGIN_URL = "https://moodle.preco.ru/login/index.php";
const LOGIN_INPUT_SELECTOR = "#username";
const PASSWORD_INPUT_SELECTOR = "#password";
const SEND_BUTTON_SELECTOR = "#loginbtn";
const authUser = async (login, password) => {
    try {
        const browser = await puppeteer_core_1.default.launch({
            args: [...chrome_aws_lambda_1.default.args, "--no-sandbox", "--disabled-setupid-sandbox"],
            defaultViewport: chrome_aws_lambda_1.default.defaultViewport,
            executablePath: await chrome_aws_lambda_1.default.executablePath,
            ignoreHTTPSErrors: true,
            headless: false,
        });
        const page = await browser.newPage();
        await page.goto(LOGIN_URL);
        await page.setViewport({ width: 1920, height: 1080 });
        await page.waitForSelector(LOGIN_INPUT_SELECTOR);
        await page.type(LOGIN_INPUT_SELECTOR, login);
        await page.waitForSelector(PASSWORD_INPUT_SELECTOR);
        await page.type(PASSWORD_INPUT_SELECTOR, password);
        await page.waitForSelector(SEND_BUTTON_SELECTOR);
        await page.click(SEND_BUTTON_SELECTOR);
        return {
            browser,
            page,
        };
    }
    catch (e) {
        console.log(e);
        throw e;
    }
};
exports.authUser = authUser;
const checkAuthUser = (authPage) => {
    return "browser" in authPage && "page" in authPage;
};
exports.checkAuthUser = checkAuthUser;
//# sourceMappingURL=authUser.js.map