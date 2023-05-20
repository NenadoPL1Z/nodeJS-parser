import { authUser, checkAuthUser } from "./authUser";
import { BrowserModel } from "../../models/BrowserModel";
import { API_ERROR } from "../../constants/constants";

const PSEUDONYM_SELECTOR = "#page-header > div > div:last-child > h2";

export const parseUser = async (login: string, password: string) => {
  try {
    const authPage = (await authUser(login, password)) as BrowserModel;

    if (checkAuthUser(authPage)) {
      const { browser, page } = authPage;

      await page.waitForSelector(PSEUDONYM_SELECTOR, { timeout: 20000 });
      const FIOElement = await page.$(PSEUDONYM_SELECTOR);

      const pseudonym =
        (await page.evaluate((el) => el?.textContent, FIOElement)) || "";

      await page.close();
      await browser.close();

      return pseudonym.trim();
    }

    new Error(API_ERROR.INVALID_REQUEST);
  } catch (e) {
    return e;
  }
};
