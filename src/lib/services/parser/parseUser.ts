import { authUser, checkAuthUser } from "@/src/lib/services/parser/authUser";
import { BrowserModel } from "@/src/lib/models/BrowserModel";
import { API_ERROR_USER_AUTH } from "@/src/lib/constants/api/API_ERROR_NAMESPACES";

const PSEUDONYM_SELECTOR = "#page-header > div > div:last-child > h2";

export const parseUser = async (login: string, password: string) => {
  try {
    const authPage = (await authUser(login, password)) as BrowserModel;

    if (checkAuthUser(authPage)) {
      const { browser, page } = authPage;

      await page.waitForSelector(PSEUDONYM_SELECTOR, { timeout: 8000 });
      const FIOElement = await page.$(PSEUDONYM_SELECTOR);

      const pseudonym =
        (await page.evaluate((el) => el?.textContent, FIOElement)) || "";

      await browser.close();

      return pseudonym.trim();
    }

    new Error(API_ERROR_USER_AUTH.INVALID_REQUEST);
  } catch (e) {
    return e;
  }
};
