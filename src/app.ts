import express from "express";
import pg from "pg";
import cors from "cors";
import bodyParser from "body-parser";
import { PORT, SCHEDULE_UPDATE_INTERVAL } from "./lib/constants/constants";
import { parseSchedule } from "./lib/services/parser/parseSchedule";
import { DataTypes, Sequelize } from "sequelize";
import { getResIndexRoute } from "./lib/services/api/getResIndexRoute";
import { getSchedule } from "./lib/services/api/getSchedule";
import { getUser } from "./lib/services/api/getUser";

let secondStart = 0;
setInterval(() => {
  secondStart += 1;
  console.log(secondStart);
}, 1000);

const app = express();

export const sequelize = new Sequelize(
  "postgres://admin:omibTSgMhq7VG92uozcDXOsud7UMrg4J@dpg-chgb95u7avjbbju9hui0-a.oregon-postgres.render.com/preco",
  {
    dialect: "postgres",
    dialectModule: pg,
    dialectOptions: {
      ssl: true,
    },
  },
);
export const ScheduleModel = sequelize.define(
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

app.get("/", getResIndexRoute);
app.get("/api/schedule", getSchedule);
app.post("/api/auth/login", getUser);

app.post("/api/create/schedule", async (req, res) => {
  const result = await parseSchedule();
  res.json(JSON.stringify(result));
});

app.listen(PORT, async () => {
  console.log(`Example app listening on port ${PORT}`);

  try {
    await sequelize.authenticate();
    await sequelize.sync({ force: true });
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }

  parseSchedule().then();
  setInterval(parseSchedule, SCHEDULE_UPDATE_INTERVAL);
});
