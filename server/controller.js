import { User, Event, SavedEvent } from "./db/models.js";
import bcrypt from "bcryptjs";
import session from "express-session";
import { Op } from "sequelize";

const handlerFunctions = {
  getUsers: async (req, res) => {
    const allUsers = await User.findAll();
    res.send(allUsers);
  },

  getEvents: async (req, res) => {
    // console.log(req.session);
    if(!req.session.userId) {
      res.status(404).send("User not logged in")
      return
    }
    const allEvents = await Event.findAll({
      include: [
        {
          model: User,
          as: "user",
          attributes: { exclude: ["email", "password", "age"] },
        },
        {
          model: SavedEvent,
          where: { userId: req.session.userId },
          attributes: ["userId", "eventId"],
          required: false,
        },
      ],
    });

    res.send(allEvents);
  },

  addEvent: async (req, res) => {
    const { name, date, address, description, image, ages } = req.body;
    const { userId } = req.session

    const newEvent = await Event.create({
      userId,
      name,
      date,
      address,
      description,
      image,
      ages,
    });

    res.send(newEvent);
  },

  addEventToCalendar: async (req, res) => {
    const { userId } = req.session;
    const { eventId } = req.body;

    const savedEvent = await SavedEvent.create({
      userId,
      eventId,
    });

    const allEvents = await Event.findAll({
      include: [
        {
          model: User,
          as: "user",
          attributes: { exclude: ["email", "password", "age"] },
        },
        {
          model: SavedEvent,
          where: { userId: req.session.userId },
          attributes: ["userId", "eventId"],
          required: false,
        },
      ],
    });
    res.send(allEvents);
  },

  deleteEventFromCalendar: async (req, res) => {
    const { userId } = req.session;
    const { eventId } = req.params;
    console.log(userId)
    console.log(eventId)

    const savedEvent = await SavedEvent.findOne({
      where: {
        userId,
        eventId,
      },
    });
    await savedEvent.destroy();

    const allEvents = await Event.findAll({
      include: [
        {
          model: User,
          as: "user",
          attributes: { exclude: ["email", "password", "age"] },
        },
        {
          model: SavedEvent,
          where: { userId: req.session.userId },
          attributes: ["userId", "eventId"],
          required: false,
        },
      ],
    });
    res.send(allEvents);
  },

  getCalendarEvents: async (req, res) => {
    const { userId } = req.session;

    const allEvents = await Event.findAll({
      include: [
        {
          model: SavedEvent,
          where: { userId: req.session.userId },
          attributes: ["userId"],
        },
      ],
    });
    res.send(allEvents);
  },

  register: async (req, res) => {
    const { username, password, email } = req.body;

    const session = req.session;

    console.log(email);
    const findUser = await User.findOne({
      where: {
        [Op.or]: [{ email: email }, { username: username }],
      },
    });

    if (findUser) {
      console.log("user found, ", findUser);

      res.send({
        success: false,
        message: "email or username already in use!",
      });
    } else {
      // const hashedPassword = await bcrypt.hash(password, 10);
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(password, salt);

      const newUser = await User.create({
        username: username,
        password: hashedPassword,
        email: email,
      });

      console.log("find user", findUser);
      console.log("user created, ", newUser);

      session.email = newUser.email;
      session.username = newUser.username;
      session.userId = newUser.userId;

      res.send({
        success: true,
        message: "registration successful",
        profile: {
          username: newUser.username,
          age: newUser.age,
          profilePic: newUser.profilePic,
          userId: newUser.userId,
          email: newUser.email,
        },
      });
    }
  },

  login: async (req, res) => {
    const { email, password } = req.body;

    const session = req.session;

    const findUser = await User.findOne({ where: { email: email } });
    // const { username, age, profilePic, userId } = findUser;
    console.log(findUser);
    if (!findUser) {
      console.log("hit");
      res.send({
        success: false,
        message: "login unsuccessful, no email found",
      });
    }

    if (findUser) {
      console.log(email);
      const passwordCheck = bcrypt.compareSync(password, findUser.password);
      if (passwordCheck) {
        session.email = findUser.email;
        session.username = findUser.username;
        session.userId = findUser.userId;
        res.send({
          success: true,
          message: "login successful",
          profile: {
            username: findUser.username,
            age: findUser.age,
            profilePic: findUser.profilePic,
            userId: findUser.userId,
            email: findUser.email,
          },
        });
      } else {
        res.send({ success: false, message: "login unsuccessful" });
      }
    }
  },

  logout: (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        console.log("Error destroying session:", err);
      }
      res.redirect("/");
    });
  },

  deleteUser: async (req, res) => {
    let count = 0
    const { userId } = req.params;
    console.log(userId);
    const findUser = await User.findOne({ where: { userId: userId } });
    console.log(findUser);
    if (!findUser) {
      res.send({ success: false, message: "user not found" });
    } else {
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync("admin1234", salt);
      const defaultUser = await User.update(
        {
          username: `deletedUser${count}`,
          email: `deleteUser${count}@mail.com`,
          age: null,
          profilePic:
            "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
          password: hashedPassword,
        },
        { where: { userId: userId } }
      );
      res.send({ success: true, message: "user deleted" });
    }
  },
  editUser: async (req, res) => {
    console.log(req.body);
    const { userId, username, profilePic, age } = req.body;
    const foundUser = await User.findOne({ where: { userId: userId } });
    if (!foundUser) {
      res.send({ success: false, message: "user not found" });
    } else {
      // const hashedPassword = await bcrypt.hash(password, 10);
      const editUser = await User.update(
        { username: username, profilePic: profilePic, age: age },
        { where: { userId: userId } }
      );
      let profile = foundUser;
      console.log(profile);
      res.send({
        success: true,
        message: "user updated",
        profile: { userId, username, profilePic, age },
      });
    }
  },
  verifyUser: async (req, res) => {
    const { userId, password } = req.body;
    console.log(req.body);
    const findUser = await User.findOne({ where: { userId: userId } });
    // console.log(findUser);
    const passwordCheck = bcrypt.compareSync(password, findUser.password);
    if (passwordCheck) {
      res.send({ passCheck: true, message: "password verified" });
    } else {
      res.send({ passCheck: false, message: "password incorrect" });
    }
  },
  newPass: async (req, res) => {
    const { userId, password } = req.body;
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    const findUser = await User.findOne({ where: { userId: userId } });
    const editUser = await User.update(
      { password: hashedPassword },
      { where: { userId: userId } }
    );
    res.send({ success: true, message: "password updated" });
  },
  checkSession: async (req, res) => {
    console.log(req.session);
    if (!req.session.userId) {
      res.send({ loggedIn: false });
    } else {
      res.send({ loggedIn: true });
    }
  }
};

export default handlerFunctions;
