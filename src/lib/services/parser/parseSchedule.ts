import * as fs from "fs";
import { authUser, checkAuthUser } from "@/src/lib/services/parser/authUser";
import { ADMIN_LOGIN, ADMIN_PASSWORD } from "@/src/lib/constants/constants";
import { BrowserModel } from "@/src/lib/models/BrowserModel";

const SCHEDULE_URL =
  "https://moodle.preco.ru/blocks/lkstudents/sheduleonline.php";
const GROUPS_LIST_SELECTOR = "#id_listgroups";

const createScheduleJSON = (data: any) => {
  const json = JSON.stringify(data);
  fs.writeFile("static/jsons/schedule.json", json, "utf8", () => undefined);
};

export const parseSchedule = async () => {
  try {
    const authPage = (await authUser(
      ADMIN_LOGIN,
      ADMIN_PASSWORD,
    )) as BrowserModel;

    if (checkAuthUser(authPage)) {
      const { browser, page } = authPage;
      page.goto(SCHEDULE_URL);

      await page.waitForSelector(GROUPS_LIST_SELECTOR);
      // const groupListElement = await page.$(GROUPS_LIST_SELECTOR);

      // await browser.close();
      // .createScheduleJSON({ test: 777 });

      return;
    }
    console.log("Ошибка авторизации администратора");
  } catch (e) {
    console.log(e);
  }
};
