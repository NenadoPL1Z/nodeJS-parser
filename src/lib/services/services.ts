import express from "express";

export const sendErrorResponse = (res: express.Response) => {
  return (status: number, error: string): void => {
    res.status(status);
    res.json({ error });
  };
};
