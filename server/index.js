import express from "express";
import morgan from "morgan";
import ViteExpress from "vite-express";
import handlerFunctions from "./controller.js";

const app = express();

app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));

const { getUsers, getEvents, register, login, deleteUser, editUser, addEvent } = handlerFunctions;

app.get("/api/users", getUsers);
app.get("/api/events", getEvents);
app.post("/api/events", addEvent)
app.post("/api/register", register);
app.post("/api/login", login)
app.delete("/api/delete/:userId", deleteUser);
app.post("/api/edit/:userId", editUser)

ViteExpress.listen(app, 9999, () =>
  console.log(`Server running on http://localhost:9999`)
);
