import express from "express";
import morgan from "morgan";
import ViteExpress from "vite-express";
import handlerFunctions from "./controller.js";

const app = express();
app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));




const { getUsers, getGroups, getEvents, getWinners, register, login } = handlerFunctions

app.get("/api/users", getUsers);
app.get("/api/groups", getGroups);
app.get("/api/events", getEvents);
app.get("/api/winners", getWinners);
app.post("/register", register);
app.post("/login", login);

ViteExpress.listen(app, 9999, () =>
  console.log(`Server running on http://localhost:9999`)
);
