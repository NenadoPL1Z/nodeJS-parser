import express from "express";

export const sendSuccessResponse = (res: express.Response) => {
  return (data: any, key = "data"): void => {
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
