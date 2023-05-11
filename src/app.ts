import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import {
  returnJSON,
  sendErrorResponse,
  sendSuccessResponse,
} from "./lib/services/services";
import { parseUser } from "./lib/services/parser/parseUser";
import { PORT, SCHEDULE_UPDATE_INTERVAL } from "./lib/constants/constants";
import { API_ERROR_USER_AUTH } from "./lib/constants/api/API_ERROR_NAMESPACES";
import { parseSchedule } from "./lib/services/parser/parseSchedule";

// TODO: ПРОЕКТ НЕ РАБОТАЕТ ЛОКАЛЬНО. ТОЛЬКО НА VERCEL DEPLOY - (https://preco-parser.vercel.app/)
// Этапы исправления
// 1 - Удалить в package.json объект engines
// 2 - Обновить puppeteer-core до последней версии
// 3 - Удалить any и настроить типизацию в файле authUser.ts

const app = express();

app.use(cors({ origin: "*" }));
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);

app.use(bodyParser.json());
app.use("/static", express.static("static"));

app.get("/", async (req: express.Request, res: express.Response) => {
  res.json("Preco parser");
});

app.get("/static/test", async (req: express.Request, res: express.Response) => {
  console.log(123);
  returnJSON(res, "test.json");
});

app.get(
  "/static/schedule",
  async (req: express.Request, res: express.Response) => {
    returnJSON(res, "schedule.json");
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
              message: API_ERROR_USER_AUTH.INVALID_REQUEST,
              data: "",
            });
          })
          .catch((e) => {
            sendError(400, {
              message: API_ERROR_USER_AUTH.INVALID_REQUEST,
              data: e,
            });
            throw e;
          });
      }
      sendError(400, { message: API_ERROR_USER_AUTH.INVALID_DATA, data: "" });
    } catch (e) {
      sendError(400, { message: API_ERROR_USER_AUTH.INVALID_REQUEST, data: e });
      throw e;
    }
  },
);

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
  parseSchedule();
  setInterval(parseSchedule, SCHEDULE_UPDATE_INTERVAL);
});
