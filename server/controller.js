import { User, Group, Event, Winner } from "./db/models.js";

const handlerFunctions = {
  getUsers: async (req, res) => {
    const allUsers = await User.findAll();
    res.send(allUsers);
  },

  getGroups: async (req, res) => {
    const allGroups = await Group.findAll();
    res.send(allGroups);
  },

  getEvents: async (req, res) => {
    const allEvents = await Event.findAll();
    res.send(allEvents);
  },

  getWinners: async (req, res) => {
    const allWinners = await Winner.findAll();
    res.send(allWinners);
  },

  register: async (req, res) => {
    const { firstName, lastName, password, email } = req.body;

    const findUser = await User.findOne({ where: { email: email } });
    if (findUser) {
      res.send({ success: false, message: "user already exists" });
      console.log(findUser);
    } else {
      await User.create({
        firstName,
        lastName,
        password,
        email,
      });
      console.log("created");
      res.send({ success: true, message: "user created" });
    }
  },
  login: async (req, res) => {
    const { email, password } = req.body;
    console.log(req.body);
    const findUser = await User.findOne({ where: { email: email, password: password } });
    if(findUser){
        console.log(findUser);
        res.send({ success: true, message: "user exists"})
    } 
    else {
        res.send({success: false, message: "user does not exist"})
    }
  }  
};

export default handlerFunctions;
