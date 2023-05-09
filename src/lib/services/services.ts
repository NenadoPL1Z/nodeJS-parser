import express from "express";

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
