import { authUser, checkAuthUser } from "@/src/lib/services/parser/authUser";
import { ADMIN_LOGIN, ADMIN_PASSWORD } from "@/src/lib/constants/constants";
import { BrowserModel } from "@/src/lib/models/BrowserModel";
import {
  createScheduleJSON,
  getGroupListData,
  getScheduleData,
} from "@/src/lib/services/services";
import { GroupSchedulesModel } from "@/src/lib/models/ScheduleModel";

const SCHEDULE_URL =
  "https://moodle.preco.ru/blocks/lkstudents/sheduleonline.php";

const GROUPS_LIST_SELECTOR = "#id_listgroups";
const SEND_BUTTON_SELECTOR = "#id_submitbutton";

export const parseSchedule = async () => {
  try {
    const authPage = (await authUser(
      ADMIN_LOGIN,
      ADMIN_PASSWORD,
    )) as BrowserModel;

    if (checkAuthUser(authPage)) {
      const { browser, page } = authPage;

      await page.goto(SCHEDULE_URL);

      await page.waitForSelector(GROUPS_LIST_SELECTOR);
      await page.waitForSelector(SEND_BUTTON_SELECTOR);

      const groupListData = await page.evaluate(getGroupListData);

      const result: GroupSchedulesModel[] = [];

      for (let i = 0; i < groupListData.length; i++) {
        const currentGroup = groupListData[i];

        await page.select(GROUPS_LIST_SELECTOR, currentGroup.value);
        await page.click(SEND_BUTTON_SELECTOR);

        await page.waitForNavigation({
          timeout: 120000,
          waitUntil: ["load", "networkidle2"],
        });
        await page.waitForFunction(() => document.readyState === "complete");

        const groupScheduleData = await page.evaluate(getScheduleData);

        result.push({
          name: currentGroup.text,
          value: currentGroup.value,
          schedules: groupScheduleData,
        });

        await page.waitForTimeout(2000);
      }

      await browser.close();
      createScheduleJSON({ createdAt: new Date().getTime(), result });

      return;
    }
  } catch (e) {
    console.log(e);
  }
};
