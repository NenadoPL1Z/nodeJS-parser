import puppeteer from "puppeteer-core";
import chromium from "chrome-aws-lambda";
import { AuthUserFunction } from "../../../types/types";
import { BrowserModel } from "../../models/BrowserModel";

const LOGIN_URL = "https://moodle.preco.ru/login/index.php";
const LOGIN_INPUT_SELECTOR = "#username";
const PASSWORD_INPUT_SELECTOR = "#password";
const SEND_BUTTON_SELECTOR = "#loginbtn";

export const authUser: AuthUserFunction<
  Promise<BrowserModel | unknown>
> = async (login, password) => {
  try {
    const browser = await puppeteer.launch({
      args: [...chromium.args, "--no-sandbox", "--disabled-setupid-sandbox"],
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath,
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
  } catch (e) {
    console.log(e);
    throw e;
  }
};

export const checkAuthUser = (authPage: BrowserModel) => {
  return "browser" in authPage && "page" in authPage;
};
