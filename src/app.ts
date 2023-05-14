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
import { API_ERROR_USER_AUTH } from "./lib/constants/api/API_ERROR_NAMESPACES";
import { DataTypes, Sequelize } from "sequelize";
import { parseSchedule } from "./lib/services/parser/parseSchedule";

const app = express();

export const sequelize = new Sequelize(
  "postgres://admin:omibTSgMhq7VG92uozcDXOsud7UMrg4J@dpg-chgb95u7avjbbju9hui0-a.oregon-postgres.render.com/preco",
  {
    dialect: "postgres",
    protocol: "postgres",
    dialectOptions: {
      ssl: true,
      native: true,
    },
  },
);
export const ScheduleModel =
  ({} as any) ||
  sequelize.define(
    "Schedule",
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: false },
      ruUpdateTime: { type: DataTypes.STRING },
      result: { type: DataTypes.STRING(300000) },
    },
    { tableName: "Schedule", freezeTableName: true },
  );

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
    const schedule = await ScheduleModel.findOne({ where: { id: 1 } });
    res.json(schedule);
  },
);

app.post(
  "/api/create/schedule",
  async (req: express.Request, res: express.Response) => {
    setScheduleDB(JSON.stringify({ test: 123 }));
    res.json("success");
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

app.listen(PORT, async () => {
  console.log(`Example app listening on port ${PORT}`);

  try {
    // await sequelize.authenticate();
    // await sequelize.sync({ force: true });
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }

  // parseSchedule().then();
  // setInterval(parseSchedule, SCHEDULE_UPDATE_INTERVAL);
});
