import express from "express";
import session from "express-session";
import morgan from "morgan";
import ViteExpress from "vite-express";
import handlerFunctions from "./controller.js";

const app = express();

app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: "supa secret",
  })
);

const {
  getEvents,
  register,
  login,
  logout,
  deleteUser,
  editUser,
  addEvent,
  verifyUser,
  newPass,
  addEventToCalendar,
  getCalendarEvents,
  deleteEventFromCalendar,
  addLike,
  deleteLike,
  checkSession
} = handlerFunctions;

app.get("/api/events", getEvents);
app.post("/api/events", addEvent);
app.get("/api/calendarEvents", getCalendarEvents);
app.post("/api/addToCalendar", addEventToCalendar);
app.delete("/api/deleteFromCalendar/:eventId", deleteEventFromCalendar);
app.post("/api/addLike", addLike)
app.delete("/api/deleteLike/:eventId", deleteLike)
app.post("/api/login", login);
app.post("/api/logout", logout);
app.post("/api/register", register);
app.post("/api/edit", editUser);
app.delete("/api/delete/:userId", deleteUser);
app.post("/api/verify", verifyUser);
app.post("/api/newPass", newPass);
app.get("/api/session", checkSession );

ViteExpress.listen(app, 9999, () =>
  console.log(`Server running on http://localhost:9999`)
);
