import express from "express";

export const getResIndexRoute = (
  req: express.Request,
  res: express.Response,
) => {
  res.json("Preco parser");
};
