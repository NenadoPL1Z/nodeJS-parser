import express from "express";
import { LessonModel, IScheduleModel } from "../models/ScheduleModel";
import { ScheduleModel } from "../../app";

type SuccessArg = { key?: string; data: any };
type GroupListItem = { text: string; value: string };
type GroupListArr = GroupListItem[];

export const sendSuccessResponse = (res: express.Response) => {
  return ({ key = "data", data }: SuccessArg): void => {
    res.status(200);
    res.setHeader("Content-Type", "application/json");
    res.json({ [key]: data });
  };
};

export const sendErrorResponse = (res: express.Response) => {
  return (status: number, error: { message: string; data: any }): void => {
    res.status(status);
    res.json({ error });
  };
};
export const getGroupListData = () => {
  const result: GroupListArr = [];

  const innerSelectElement = document.querySelector(
    "#id_listgroups",
  ) as HTMLSelectElement;

  const optionElementsArr = innerSelectElement.children;

  for (let i = 0; i < optionElementsArr.length; i++) {
    const optionElement = optionElementsArr[i] as HTMLOptionElement;

    result.push({
      text: optionElement.textContent || "",
      value: optionElement.value,
    });
  }

  return result;
};

export const getScheduleData = () => {
  const CONTAINER_SELECTOR = ".urk_shedule";
  const CURRENT_DATE_SELECTOR = ".urk_sheduledate";
  const CURRENT_LESSON_SELECTOR = ".urk_lessonblock";
  const CURRENT_LESSON_TIME_SELECTOR = ".urk_timewindow";
  const CURREN_LESSON_DESCRIPTION_SELECTOR = ".urk_lessondescription";

  const schedulesData: IScheduleModel[] = [];

  const schedulesElement = document.querySelector(
    CONTAINER_SELECTOR,
  ) as HTMLDivElement;

  if (!schedulesElement) {
    return schedulesData;
  }

  const schedulesChildren = schedulesElement.children;

  for (let i = 0; i < schedulesChildren.length; i++) {
    const scheduleItem: IScheduleModel = { date: "", lessons: [] };
    const scheduleItemElement = schedulesChildren[i];

    const date = scheduleItemElement.querySelector(CURRENT_DATE_SELECTOR);
    scheduleItem.date = date?.textContent || "";

    const lessonsNodeArr = scheduleItemElement.querySelectorAll(
      CURRENT_LESSON_SELECTOR,
    );

    for (let j = 0; j < lessonsNodeArr.length; j++) {
      const lesson: LessonModel = {
        count: null,
        timeStart: null,
        timeEnd: null,
        name: null,
      };

      const currentLessonElem = lessonsNodeArr[j];

      const lessonNameElement = currentLessonElem.querySelector(
        CURREN_LESSON_DESCRIPTION_SELECTOR,
      );
      const lessonTimeElement = currentLessonElem.querySelector(
        CURRENT_LESSON_TIME_SELECTOR,
      );
      const lessonTimeChildren = lessonTimeElement?.children || [];

      lesson.name = lessonNameElement?.textContent || "";
      lesson.count = lessonTimeChildren[0]?.textContent;
      lesson.timeStart = lessonTimeChildren[1]?.textContent;
      lesson.timeEnd = lessonTimeChildren[2]?.textContent;

      scheduleItem.lessons.push(lesson);
    }
    schedulesData.push(scheduleItem);
  }

  return schedulesData;
};

export const setScheduleDB = async (result: string) => {
  if (result) {
    await ScheduleModel.update(
      {
        ruUpdateTime: new Date().toString(),
        result,
      },
      { where: { id: 1 } },
    )
      .then(() => {
        console.log("success save");
      })
      .catch(() => {
        console.log("error save");
      });
  } else {
    console.log("empty result");
  }
};
