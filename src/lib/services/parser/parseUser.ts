import puppeteer from "puppeteer";

const loginURL = "https://moodle.preco.ru/login/index.php";

const loginInputElemSelector = "#username";
const passwordInputElemSelector = "#password";
const authFormSendButtonSelector = "#loginbtn";
const psevdonimSelector = "#page-header > div > div:last-child > h2";

export const parseUser = async (login: string, password: string) => {
  try {
    const browser = await puppeteer.launch({ headless: false });

    const page = await browser.newPage();
    await page.goto(loginURL);
    await page.setViewport({ width: 1920, height: 1080 });

    await page.waitForSelector(loginInputElemSelector);
    await page.type(loginInputElemSelector, login);

    await page.waitForSelector(passwordInputElemSelector);
    await page.type(passwordInputElemSelector, password);

    await page.waitForSelector(authFormSendButtonSelector);
    await page.click(authFormSendButtonSelector);

    await page.waitForSelector(psevdonimSelector);
    const FIOElement = await page.$(psevdonimSelector);

    const pseudonym =
      (await page.evaluate((el) => el?.textContent, FIOElement)) || "";

    return pseudonym.trim();
  } catch (e) {
    return e;
  }
};
