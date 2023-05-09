import { Browser, Page } from "puppeteer";

export type BrowserModel = {
  browser: Browser;
  page: Page;
};
