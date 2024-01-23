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

  addUser: async (req, res) => {
    const { firstName, lastName, password, email, age } = req.body;
  
    const existingUser = await User.findOne({ email });
    
    if (existingUser) {
      res.send({ success: false, message: "User already exists" });
    } else {
      await User.create({ firstName, lastName, password, email, age });
      res.send({ success: true, message: "User created" });
    }
  },

  addGroup: async (req, res) => {
    await Event.create({})
    const allGroups = await Event.findAll()
    res.send(allGroups)
  },

  addEvent: async (req, res) => {
    await Event.create({})
    const allEvents = await Event.findAll()
    res.send(allEvents)
  }
};

export default handlerFunctions;
