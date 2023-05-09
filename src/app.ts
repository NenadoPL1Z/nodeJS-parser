import express from "express";
import cors from "cors";
import { PORT } from "@/src/lib/constants/constants";
import bodyParser from "body-parser";
import { API_ERROR_USER_AUTH } from "@/src/lib/constants/api/API_ERROR_NAMESPACES";
import { sendErrorResponse } from "@/src/lib/services/services";
import { parseUser } from "@/src/lib/services/parser/parseUser";

const app = express();

app.use(cors({ origin: "*" }));
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);
app.use(bodyParser.json());

app.post("/auth/login", async (req: express.Request, res: express.Response) => {
  const sendError = sendErrorResponse(res);

  try {
    const { login, password } = req.body;

    if (login && password) {
      const res = await parseUser(login, password);
    }
    sendError(400, API_ERROR_USER_AUTH.INVALID_DATA);
  } catch (e) {
    sendError(400, API_ERROR_USER_AUTH.INVALID_REQUEST);
  }
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
