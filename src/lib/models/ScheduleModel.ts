export interface LessonModel {
  count: string | null;
  timeStart: string | null;
  timeEnd: string | null;
  name: string | null;
}
export interface IScheduleModel {
  date: string;
  lessons: LessonModel[];
}

export interface GroupSchedulesModel {
  name: string;
  value: string;
  schedules: IScheduleModel[];
}
