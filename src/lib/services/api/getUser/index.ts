import express from "express";
import { sendErrorResponse, sendSuccessResponse } from "../../services";
import { parseUser } from "../../parser/parseUser";
import {
  API_ERROR,
  SCHEDULE_UPDATE_INTERVAL,
} from "../../../constants/constants";

export const getUser = async (req: express.Request, res: express.Response) => {
  const sendSuccess = sendSuccessResponse(res);
  const sendError = sendErrorResponse(res);

  try {
    const { login, password } = req.body;

    if (login && password) {
      return await parseUser(login, password)
        .then((response) => {
          if (typeof response === "string") {
            return sendSuccess({
              data: {
                userName: response,
                updatedAt: SCHEDULE_UPDATE_INTERVAL,
              },
            });
          }
          sendError(400, {
            message: API_ERROR.INVALID_DATA,
            data: "",
          });
        })
        .catch((e) => {
          sendError(400, {
            message: API_ERROR.INVALID_REQUEST,
            data: e,
          });
          throw e;
        });
    }
    sendError(400, { message: API_ERROR.INVALID_DATA, data: "" });
  } catch (e) {
    sendError(400, { message: API_ERROR.INVALID_REQUEST, data: e });
    throw e;
  }
};
