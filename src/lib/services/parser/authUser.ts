import puppeteer from "puppeteer-core";
import edgeChromium from "chrome-aws-lambda";
import { BrowserModel } from "../../models/BrowserModel";

const LOGIN_URL = "https://moodle.preco.ru/login/index.php";
const LOGIN_INPUT_SELECTOR = "#username";
const PASSWORD_INPUT_SELECTOR = "#password";
const SEND_BUTTON_SELECTOR = "#loginbtn";

const LOCAL_CHROME_EXECUTABLE =
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

export const authUser = async (
  login: string,
  password: string,
): Promise<BrowserModel | unknown> => {
  try {
    const browser = await puppeteer.launch({
      ignoreHTTPSErrors: true,
      defaultViewport: { width: 1920, height: 1080 },
      ignoreDefaultArgs: ["--disable-extensions"],
      args: [
        ...edgeChromium.args,
        "--no-sandbox",
        "--disable-setuid-sandbox",
        //   "--no-zygote",
        //   "--hide-scrollbars",
        //   "--disable-web-security",
      ],
      executablePath:
        (await edgeChromium.executablePath) || LOCAL_CHROME_EXECUTABLE,
    });

    const page = await browser.newPage();
    await page.goto(LOGIN_URL);

    await page.waitForSelector(LOGIN_INPUT_SELECTOR);
    await page.type(LOGIN_INPUT_SELECTOR, login);

    await page.waitForSelector(PASSWORD_INPUT_SELECTOR);
    await page.type(PASSWORD_INPUT_SELECTOR, password);

    await page.waitForSelector(SEND_BUTTON_SELECTOR);
    await page.click(SEND_BUTTON_SELECTOR);
    await page.waitForNavigation();

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
