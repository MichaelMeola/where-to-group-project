import express from "express";
import morgan from "morgan";
import ViteExpress from "vite-express";
import handlerFunctions from "./controller.js";

const app = express();

app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));

const { getUsers, getEvents, register, login, deleteUser, editUser, addEvent, verifyUser, newPass, addEventToCalendar } = handlerFunctions;

app.get("/api/users", getUsers);
app.get("/api/events", getEvents);
app.post("/api/events", addEvent)
app.post("/api/register", register);
app.post('/api/addToCalendar', addEventToCalendar)
app.post("/api/login", login)
app.delete("/api/delete/:userId", deleteUser);
app.post("/api/edit", editUser)

app.post("/api/verify", verifyUser)
app.post("/api/newPass", newPass)
ViteExpress.listen(app, 9999, () =>
  console.log(`Server running on http://localhost:9999`)
);
