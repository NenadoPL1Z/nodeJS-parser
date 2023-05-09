import * as fs from "fs";

const createScheduleJSON = (data: any) => {
  const json = JSON.stringify(data);
  fs.writeFile("static/jsons/schedule.json", json, "utf8", () => undefined);
};

export const parseSchedule = async () => {
  console.log(321);
  createScheduleJSON({ test: 777 });
};
