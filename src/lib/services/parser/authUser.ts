import { BrowserModel } from "../../models/BrowserModel";
import puppeteer from "puppeteer";
import { MICRO_TIMEOUT_PARSER } from "../../constants/constants";

const LOGIN_URL = "https://moodle.preco.ru/login/index.php";
const LOGIN_INPUT_SELECTOR = "#username";
const PASSWORD_INPUT_SELECTOR = "#password";
const SEND_BUTTON_SELECTOR = "#loginbtn";

export const authUser = async (
  login: string,
  password: string,
): Promise<BrowserModel | unknown> => {
  const browser = await puppeteer.launch({
    ignoreHTTPSErrors: true,
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      //   "--no-zygote",
      //   "--hide-scrollbars",
      //   "--disable-web-security",
    ],
    executablePath:
      process.env.NODE_ENV === "production"
        ? process.env.PUPPETEER_EXECUTABLE_PATH
        : puppeteer.executablePath(),
  });

  const page = await browser.newPage();
  await page.goto(LOGIN_URL, { timeout: MICRO_TIMEOUT_PARSER });
  await page.setViewport({ width: 1920, height: 1080 });

  await page.waitForSelector(LOGIN_INPUT_SELECTOR, {
    timeout: MICRO_TIMEOUT_PARSER,
  });
  await page.type(LOGIN_INPUT_SELECTOR, login);

  await page.waitForSelector(PASSWORD_INPUT_SELECTOR, {
    timeout: MICRO_TIMEOUT_PARSER,
  });
  await page.type(PASSWORD_INPUT_SELECTOR, password);

  await page.waitForSelector(SEND_BUTTON_SELECTOR, {
    timeout: MICRO_TIMEOUT_PARSER,
  });
  await page.click(SEND_BUTTON_SELECTOR);

  await page.waitForTimeout(5000);
  console.log("auth");

  return {
    browser,
    page,
  };
};

export const checkAuthUser = (authPage: BrowserModel) => {
  return "browser" in authPage && "page" in authPage;
};
