import puppeteer from "puppeteer";

type ResultDataType = {
  FIO: string;
  schedule: [];
};

const loginURL = "https://moodle.preco.ru/login/index.php";
const scheduleURL =
  "https://moodle.preco.ru/blocks/lkstudents/sheduleonline.php";

const loginInputElemSelector = "#username";
const passwordInputElemSelector = "#password";
const authFormSendButtonSelector = "#loginbtn";

const scheduleButtonFormSelector = "#id_submitbutton";
const FIOSelector = "h1.h2";
const listGroupsSelector = "#id_listgroups";

export const parseUser = async (login: string, password: string) => {
  const result: ResultDataType = { FIO: "", schedule: [] };
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

  await page.goto(scheduleURL);

  await page.waitForSelector(scheduleButtonFormSelector);
  await page.click(scheduleButtonFormSelector);

  await page.waitForSelector(FIOSelector);
  const FIOElement = await page.$(FIOSelector);
  const FIOValue =
    (await page.evaluate((el) => el?.textContent, FIOElement)) || "";
  result.FIO = FIOValue;

  await page.waitForSelector(listGroupsSelector);
  await page.click(listGroupsSelector);
  // await page.waitForTimeout(5000);
  //
  // await page.waitForSelector(scheduleArrSelector);
  // const scheduleArrElement = await page.$(scheduleArrSelector);
  //
  // console.log(123);
  // const schedules = await page.evaluate((el) => {
  //   console.log(el, 123);
  // }, scheduleArrElement);
};
