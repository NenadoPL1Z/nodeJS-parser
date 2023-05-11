import { Browser, Page } from "puppeteer-core";

export type BrowserModel = {
  browser: Browser;
  page: Page;
};
