import { authUser, checkAuthUser } from "./authUser";
import { ADMIN_LOGIN, ADMIN_PASSWORD } from "../../constants/constants";
import { BrowserModel } from "../../models/BrowserModel";
import { GroupSchedulesModel } from "../../models/ScheduleModel";
import { getGroupListData, getScheduleData, setScheduleDB } from "../services";

const SCHEDULE_URL =
  "https://moodle.preco.ru/blocks/lkstudents/sheduleonline.php";

const GROUPS_LIST_SELECTOR = "#id_listgroups";
const SEND_BUTTON_SELECTOR = "#id_submitbutton";

export const parseSchedule = async () => {
  const result: GroupSchedulesModel[] = [];
  const counts = {
    current: 0,
    max: 0,
  };

  try {
    const authPage = (await authUser(
      ADMIN_LOGIN,
      ADMIN_PASSWORD,
    )) as BrowserModel;

    if (checkAuthUser(authPage)) {
      const { browser, page } = authPage;

      await page.goto(SCHEDULE_URL);

      const groupListData = await page.evaluate(getGroupListData);
      counts.max = groupListData.length;

      for (let i = 0; i < groupListData.length; i++) {
        const currentGroup = groupListData[i];

        await page.waitForSelector(GROUPS_LIST_SELECTOR);
        await page.select(GROUPS_LIST_SELECTOR, currentGroup.value);

        await page.waitForSelector(SEND_BUTTON_SELECTOR);
        await page.click(SEND_BUTTON_SELECTOR);

        await page.waitForFunction(() => document.readyState === "complete", {
          timeout: 240000,
        });

        const groupScheduleData = await page.evaluate(getScheduleData);

        result.push({
          name: currentGroup.text,
          value: currentGroup.value,
          schedules: groupScheduleData,
        });

        counts.current += 1;
        console.log(counts);
      }

      await browser.close();

      if (result.length) {
        await setScheduleDB(JSON.stringify(result));
      }

      return result;
    }
  } catch (e) {
    console.log(e);
    throw e;
  }
};
