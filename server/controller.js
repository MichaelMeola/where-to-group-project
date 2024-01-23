import { User, Group, Event, Winner } from "./db/models.js"
const handlerFunctions = {
    register: async (req, res) => {
        const { firstName, lastName, password, email,  } = req.body;
        
       
        const findUser = await User.findOne({ where: { email: email } });
        // console.log(findUser);
        if(findUser) {
            res.send({success: false, message: 'user already exists'});
            console.log(findUser);
        }

        else{
            await User.create({
                firstName,
                lastName,
                password,
                email,
            });
            console.log('created');
            res.send({success: true, message: 'user created'});

        }
        
        
    }
}
export default handlerFunctions;