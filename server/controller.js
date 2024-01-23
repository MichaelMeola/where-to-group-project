import { User, Group, Event, Winner } from "./db/models.js"

const handlerFunctions = {

    getUsers: async(req, res) => {
        const allUsers = await User.findAll()
        res.send(allUsers)
    },

    getGroups: async(req, res) => {
        const allGroups = await Group.findAll()
        res.send(allGroups)
    },

    getEvents: async(req, res) => {
        const allEvents = await Event.findAll()
        res.send(allEvents)
    },

    getWinners: async(req, res) => {
        const allWinners = await Winner.findAll()
        res.send(allWinners)
    },
}

export default handlerFunctions