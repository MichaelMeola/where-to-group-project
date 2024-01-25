import express from "express";
import morgan from "morgan";
import ViteExpress from "vite-express";
import handlerFunctions from "./controller.js";
const app = express();

app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));

import handlerFunctions from "./controller.js";

const { getUsers, getEvents, register, login } = handlerFunctions;

app.get("/api/users", getUsers);
app.get("/api/events", getEvents);
app.post("api/register", register);
app.post("api/login", login)


ViteExpress.listen(app, 9999, () =>
  console.log(`Server running on http://localhost:9999`)
);
