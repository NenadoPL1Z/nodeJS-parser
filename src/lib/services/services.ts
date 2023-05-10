import express from "express";
import fs from "fs";
import { GropListArr } from "@/src/types/types";
import { LessonModel, ScheduleModel } from "@/src/lib/models/ScheduleModel";

type SuccessArg = { key?: string; data: any };

export const sendSuccessResponse = (res: express.Response) => {
  return ({ key = "data", data }: SuccessArg): void => {
    res.status(200);
    res.json({ [key]: data });
  };
};

export const sendErrorResponse = (res: express.Response) => {
  return (status: number, error: string): void => {
    res.status(status);
    res.json({ error });
  };
};

export const getStaticFolderPath = () => {
  const nestedFolderCount = 3;
  const dirArr = __dirname.split("/");

  return dirArr.slice(0, dirArr.length - nestedFolderCount).join("/");
};

export const createScheduleJSON = (data: any) => {
  const json = JSON.stringify(data);
  fs.writeFile("static/jsons/schedule.json", json, "utf8", () => undefined);
};

export const getGroupListData = () => {
  try {
    const result: GropListArr = [];

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
  } catch (e) {
    return [] as GropListArr;
  }
};

export const getScheduleData = () => {
  try {
    const CONTAINER_SELECTOR = ".urk_shedule";
    const CURRENT_DATE_SELECTOR = ".urk_sheduledate";
    const CURRENT_LESSON_SELECTOR = ".urk_lessonblock";
    const CURRENT_LESSON_TIME_SELECTOR = ".urk_timewindow";
    const CURREN_LESSON_DESCRIPTION_SELECTOR = ".urk_lessondescription";

    const schedulesData: ScheduleModel[] = [];

    const schedulesElement = document.querySelector(
      CONTAINER_SELECTOR,
    ) as HTMLDivElement;

    if (!schedulesElement) {
      return schedulesData;
    }

    const schedulesChildren = schedulesElement.children;

    for (let i = 0; i < schedulesChildren.length; i++) {
      const scheduleItem: ScheduleModel = { date: "", lessons: [] };
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
  } catch (e) {
    return [];
  }
};
