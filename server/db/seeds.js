import { User, Event } from "./models.js";

const user1 = await User.create({
    username: 'michaelmeola',
    email: 'meolaadonai@gmail.com',
    password: 'password',
    age: 22,
});

const user2 = await User.create({
    username: '0riginalUsername',
    email: 'gabealley@gmail.com',
    password: 'password',
    age: 22
});

const user3 = await User.create({
    username: 'PibleJib',
    email: 'rikki.webber@gmail.com',
    password: 'password',
    age: 27
});

const event1 = await Event.create({
    name: `Rikki's House Party`,
    date: new Date('2024-12-31'),
    description: 'It will be a good time',
    ages: 21,
    createdBy: 'PibleJib'
});