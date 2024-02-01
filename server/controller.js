import { User, Event } from "./db/models.js";
import bcrypt from "bcryptjs";
import { Op } from "sequelize";

const handlerFunctions = {
  getUsers: async (req, res) => {
    const allUsers = await User.findAll();
    res.send(allUsers);
  },

  getEvents: async (req, res) => {
    const allEvents = await Event.findAll();
    res.send(allEvents);
  },

  addEvent: async (req, res) => {
    const { hostName, name, date, address, description, image, ages } = req.body

    const newEvent = await Event.create({
      hostName,
      name,
      date,
      address,
      description, 
      image, 
      ages
    })

    res.send(newEvent)
  },

  register: async (req, res) => {
    const { username, password, email } = req.body;

    

    console.log(email);
    const findUser = await User.findOne({
      where: {
        [Op.or]: [{ email: email }, { username: username }]
      }
    });
    
    if (findUser) {
      console.log("user found, ", findUser);

      res.send({ success: false, message: "email or username already in use!" });
    } else {

      // const hashedPassword = await bcrypt.hash(password, 10);
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(password, salt);

      const newUser = await User.create({
        username: username,
        password: hashedPassword,
        email: email,
      });
      
      console.log('find user', findUser);
      console.log("user created, ", newUser);
      res.send({
        success: true,
        message: "registration successful",
        profile: { 
          username: newUser.username,
          age: newUser.age,
          profilePic: newUser.profilePic,
          userId: newUser.userId 
        },
      });
    }
  },
  
  login: async (req, res) => {
    const { email, password } = req.body;
    const findUser = await User.findOne({ where: { email: email } });
    // const { username, age, profilePic, userId } = findUser;
    console.log(findUser);
    if(!findUser) {
      console.log('hit');
      res.send({ success: false, message: "login unsuccessful, no email found" });
    }

    if(findUser){
      console.log(email);
      const passwordCheck = bcrypt.compareSync(password, findUser.password)
        if(passwordCheck) {
        res.send({
          success: true,
          message: "login successful",
          profile: { 
            username: findUser.username,
            age: findUser.age,
            profilePic: findUser.profilePic,
            userId: findUser.userId,
            email: findUser.email
          },
        });
      } else {
        res.send({ success: false, message: "login unsuccessful" });
      }
    ;
  } 
  },
  deleteUser: async (req, res) => {
    const { userId } = req.params;
    const findUser = await User.findOne({ where: { userId: userId } });
    if(!findUser) {
      res.send({ success: false, message: "user not found" });
    } else{
    const deleteUser = await User.destroy({ where: { userId: userId } });
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
        { username: username, profilePic: profilePic, age: age},
        { where: { userId: userId } }
        );
        // let profile = foundUser
        // console.log('PROF UPDATED ', editUser);
      res.send({ success: true, message: "user updated", profile: {userId, username, profilePic, age} });
    }
  },
  verifyUser: async (req, res) => {
    const { userId, password } = req.body;
    console.log(req.body);
    const findUser = await User.findOne({ where: { userId: userId } });
    // console.log(findUser);
    const passwordCheck = bcrypt.compareSync(password, findUser.password)
    if(passwordCheck) {
      res.send({ success: true, message: "password verified" });
    } else {
      res.send({ success: false, message: "password incorrect" });
    }
  },
  newPass: async (req, res) => {
    const { userId, password } = req.body;
    console.log(req.body);
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    const findUser = await User.findOne({ where: { userId: userId } });
    const editUser = await User.update(
      { password: hashedPassword },
      { where: { userId: userId } }
    );
    res.send({ success: true, message: "password updated" });
  }
};

export default handlerFunctions;
