import { User, Event } from "./db/models.js";

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

    const findUser = await User.findOne({ where: { email: email } });
    // console.log(findUser);
    if (findUser) {
      console.log(findUser);
      res.send({ success: true, message: "user exists" });
    } else {
      res.send({ success: false, message: "user does not exist" });
    }
  },
  
  login: async (req, res) => {
    const { email, password } = req.body;
    const findUser = await User.findOne({ where: { email: email, password: password } });
    // console.log(findUser);

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
