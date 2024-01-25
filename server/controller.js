import { User, Event } from "./db/models.js";
import bcrypt from "bcrypt";

const handlerFunctions = {
  getUsers: async (req, res) => {
    const allUsers = await User.findAll();
    res.send(allUsers);
  },

  getEvents: async (req, res) => {
    const allEvents = await Event.findAll();
    res.send(allEvents);
  },

  register: async (req, res) => {
    const { username, password, email } = req.body;
    console.log(email);
    const findUser = await User.findOne({ where: { email: email } });
    console.log('user found, ', findUser);
    // console.log(findUser);


    if (findUser) {
      console.log(findUser);
      res.send({ success: false, message: "email already in use!" });
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = await User.create({
        username: username,
        password: hashedPassword,
        email: email,
      });
      console.log('user created, ', newUser);
      res.send({ success: true, message: "registration successful" });
    }
  },
  
  login: async (req, res) => {
    const { email, password } = req.body;
    const findUser = await User.findOne({ where: { email: email } });
    const { username, age, profilePic, userId} = findUser;
    // console.log(findUser);
    bcrypt.compare(password, findUser.password, (err, result) => {
      if (err) {
        console.log(err);
      }
      if (result) {
        console.log(result);
        res.send({ success: true, message: "login successful", profile: {username, age, profilePic, userId} });
      } else {
        res.send({ success: false, message: "login unsuccessful" });
      }
    })
  },

};

export default handlerFunctions;
