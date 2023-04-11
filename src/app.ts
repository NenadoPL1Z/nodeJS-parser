import axios from "axios";
import puppeteer from "puppeteer";

// (async () => {
//   const browser = await puppeteer.launch({ headless: false });
//
//   const page = await browser.newPage();
//   await page.goto("https://moodle.preco.ru/login/index.php");
//   await page.setViewport({ width: 1920, height: 1080 });
//
//   // close cookie
//   // const cookieButton = "#onetrust-accept-btn-handler";
//   // await page.waitForSelector(cookieButton);
//   // await page.click(cookieButton);
//   //
//   // await page.waitForTimeout(2000);
//   //
//   // // close policy
//   // const policyButton = ".css-1dn3rsy";
//   // await page.waitForSelector(policyButton);
//   // await page.click(policyButton);
//   //
//   // await page.evaluate(() => {
//   //   const collections = document.querySelector(".");
//   // });
//
//   // await browser.close();
// })();
