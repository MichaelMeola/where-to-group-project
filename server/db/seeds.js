import { User, Event } from "./models.js";
import bcrypt from "bcrypt";

for (let i = 0; i < 5; i++) {
    const hashedPassword = await bcrypt.hash('test', 10);
    await User.create({
        username: `user${i}`,
        email: `user${i}@gmail.com`,
        password: hashedPassword,
        age: 22,
    })
}

const event1 = await Event.create({
    createdBy: 'PibleJib',
    name: `Rikki's House Party`,
    date: new Date('2024-12-31'),
    description: 'It will be a good time',
    ages: 21,
    createdBy: 'PibleJib'
});