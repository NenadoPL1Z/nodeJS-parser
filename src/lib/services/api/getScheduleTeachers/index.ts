import express from "express";
import { TeacherModel } from "../../../../app";

export const getScheduleTeachers = async (
  req: express.Request,
  res: express.Response,
) => {
  try {
    const schedule = await TeacherModel.findOne({ where: { id: 1 } });
    res.json(schedule);
  } catch (e) {
    res.status(400);
    res.json("error api");
  }
};
