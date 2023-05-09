import { authUser, checkAuthUser } from "@/src/lib/services/parser/authUser";
import { ADMIN_LOGIN, ADMIN_PASSWORD } from "@/src/lib/constants/constants";
import { BrowserModel } from "@/src/lib/models/BrowserModel";
import { getGroupListData, getScheduleData } from "@/src/lib/services/services";

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

      page.goto(SCHEDULE_URL);
      await page.waitForSelector(GROUPS_LIST_SELECTOR);
      await page.waitForSelector(SEND_BUTTON_SELECTOR);

      const groupListData = await page.evaluate(getGroupListData);

      // for (let i = 0; i < groupListData.length; i++) {
      const currentItem = groupListData[0];

      await page.select(GROUPS_LIST_SELECTOR, currentItem.value);
      await page.click(SEND_BUTTON_SELECTOR);

      // await page.evaluate(getScheduleData);
      // }

      // await browser.close();
      // createScheduleJSON({ test: 777 });

      return;
    }
    console.log("Ошибка авторизации администратора");
  } catch (e) {
    console.log(e);
  }
};
