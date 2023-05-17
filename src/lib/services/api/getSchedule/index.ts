import express from "express";
import { ScheduleModel } from "../../../../app";

export const getSchedule = async (
  req: express.Request,
  res: express.Response,
) => {
  try {
    const schedule = await ScheduleModel.findOne({ where: { id: 1 } });
    res.json(schedule);
  } catch (e) {
    res.status(400);
    res.json("error api");
  }
};
