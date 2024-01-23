import { User, Group, Event, Winner } from "./models.js"

const user1 = await User.create({
    firstName: 'Michael',
    lastName: 'Meola',
    email: 'meolaadonai@gmail.com',
    password: 'password',
    age: 22
})

const group1 = await Group.create({
    name: 'Cool group',
    zip: 99999
})

const event1 = await Event.create({
    name: `Rikki's House Party`,
    date: new Date('2024-12-31'),
    description: 'It will be a good time',
    ages: 21
})