import chromium from "chrome-aws-lambda";
import { AuthUserFunction } from "../../../types/types";
import { BrowserModel } from "../../models/BrowserModel";
import { PuppeteerLaunchOptions, PuppeteerNode } from "puppeteer-core";
import { IS_VERSCEL } from "../../constants/constants";

const LOGIN_URL = "https://moodle.preco.ru/login/index.php";
const LOGIN_INPUT_SELECTOR = "#username";
const PASSWORD_INPUT_SELECTOR = "#password";
const SEND_BUTTON_SELECTOR = "#loginbtn";

let puppeteer = undefined as unknown as PuppeteerNode;

if (IS_VERSCEL) {
  // running on the Vercel platform.
  puppeteer = require("puppeteer-core");
} else {
  // running locally.
  puppeteer = require("puppeteer");
}

export const authUser: AuthUserFunction<
  Promise<BrowserModel | unknown>
> = async (login, password) => {
  try {
    const puppeteerConfig: PuppeteerLaunchOptions = IS_VERSCEL
      ? {
          args: [
            ...chromium.args,
            "--hide-scrollbars",
            "--disable-web-security",
          ],
          defaultViewport: chromium.defaultViewport,
          executablePath: await chromium.executablePath,
          ignoreHTTPSErrors: true,
          headless: true,
        }
      : {
          headless: false,
          executablePath: puppeteer.executablePath("chrome"),
        };

    const browser = await puppeteer.launch(puppeteerConfig);
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
