import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import {
  sendErrorResponse,
  sendSuccessResponse,
  setScheduleDB,
} from "./lib/services/services";
import { parseUser } from "./lib/services/parser/parseUser";
import { PORT, SCHEDULE_UPDATE_INTERVAL } from "./lib/constants/constants";
import { API_ERROR } from "./lib/constants/constants";
import { parseSchedule } from "./lib/services/parser/parseSchedule";
import { PrismaClient } from "@prisma/client";

const app = express();

export const prisma = new PrismaClient();

app.use(cors({ origin: "*" }));
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);

app.use(bodyParser.json());

app.get("/", async (req: express.Request, res: express.Response) => {
  res.json("Preco parser");
});

app.get(
  "/api/schedule",
  async (req: express.Request, res: express.Response) => {
    const schedule = await prisma.schedule.findUnique({ where: { id: 1 } });
    res.json(schedule);
  },
);
app.post(
  "/api/auth/login",
  async (req: express.Request, res: express.Response) => {
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
              message: API_ERROR.INVALID_REQUEST,
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
  },
);

app.listen(PORT, async () => {
  console.log(`Example app listening on port ${PORT}`);
  parseSchedule().then();
  setInterval(parseSchedule, SCHEDULE_UPDATE_INTERVAL);
});
