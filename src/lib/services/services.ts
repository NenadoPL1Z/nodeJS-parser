import express from "express";
import fs from "fs";
import { GropListArr } from "@/src/types/types";

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

const createScheduleJSON = (data: any) => {
  const json = JSON.stringify(data);
  fs.writeFile("static/jsons/schedule.json", json, "utf8", () => undefined);
};

export const getGroupListData = () => {
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
};

export const getScheduleData = () => {
  const scheduleContainer = document.querySelector(
    "urk_shedule",
  ) as HTMLDivElement;

  console.log(scheduleContainer.children, 123);

  return [];
};
