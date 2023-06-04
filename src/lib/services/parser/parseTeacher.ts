import { authUser, checkAuthUser } from "./authUser";
import {
  ADMIN_LOGIN,
  ADMIN_PASSWORD,
  MICRO_TIMEOUT_PARSER,
  SCHEDULE_UPDATE_INTERVAL,
} from "../../constants/constants";
import { BrowserModel } from "../../models/BrowserModel";
import { GroupSchedulesModel } from "../../models/ScheduleModel";
import {
  getGroupListData,
  getScheduleData,
  setScheduleDB,
  setTeacherDB,
} from "../services";

const SCHEDULE_URL =
  "https://moodle.preco.ru/blocks/lkstudents/sheduleonline.php";

const GROUPS_LIST_SELECTOR = "#id_listgroups";
const SEND_BUTTON_SELECTOR = "#id_submitbutton";

export const parseTeacher = async () => {
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

      const startParse = new Date().toString();

      try {
        await page.goto(SCHEDULE_URL, { timeout: MICRO_TIMEOUT_PARSER });

        page.on("dialog", async (dialog) => {
          await dialog.accept();
        });

        await page.waitForSelector("#id_typeshedule_1");
        await page.click("#id_typeshedule_1");
        await page.waitForNavigation();

        const teacherListData = await page.evaluate(getGroupListData);
        counts.max = teacherListData.length;

        for (let i = 0; i < teacherListData.length; i++) {
          const currentGroup = teacherListData[i];

          await page.waitForSelector(GROUPS_LIST_SELECTOR, {
            timeout: MICRO_TIMEOUT_PARSER,
          });
          await page.select(GROUPS_LIST_SELECTOR, currentGroup.value);

          await page.waitForSelector(SEND_BUTTON_SELECTOR, {
            timeout: MICRO_TIMEOUT_PARSER,
          });
          await page.click(SEND_BUTTON_SELECTOR);

          await page.waitForFunction(() => document.readyState === "complete", {
            timeout: MICRO_TIMEOUT_PARSER,
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

        await page.close();
        await browser.close();

        if (result.length) {
          await setTeacherDB(JSON.stringify(result), startParse);
        }

        setTimeout(parseTeacher, SCHEDULE_UPDATE_INTERVAL);
        return result;
      } catch (e) {
        await page.close();
        await browser.close();

        setTimeout(parseTeacher, SCHEDULE_UPDATE_INTERVAL);
        console.log("parse error");
      }
    }
  } catch (e) {
    console.log("auth error");
    setTimeout(parseTeacher, SCHEDULE_UPDATE_INTERVAL);
    throw e;
  }
};
