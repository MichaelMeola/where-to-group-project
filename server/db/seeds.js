import { User, Event } from "./models.js";
import bcrypt from "bcrypt";

for (let i = 0; i < 5; i++) {
  const hashedPassword = await bcrypt.hash("test", 10);
  await User.create({
    username: `user${i}`,
    email: `user${i}@gmail.com`,
    password: hashedPassword,
    age: 22,
  });
}

const events = [
  {
    createdBy: "PibleJib",
    name: `Rikki's House Party`,
    date: new Date("2024-12-31"),
    address: "123 Fake St, Salt Lake City, Utah",
    description: "It will be a good time",
    ages: 21,
  },
  {
    createdBy: "Assistant",
    name: `Summer BBQ Bash`,
    date: new Date("2024-07-15"),
    address: "456 Main St, Park City, Utah",
    description: "Join us for a sizzling summer barbecue!",
    ages: 18,
  },
  {
    createdBy: "JohnDoe",
    name: `Movie Night Under the Stars`,
    date: new Date("2024-08-20"),
    address: "789 Oak Ave, Provo, Utah",
    description: "Bring your blankets and join us for an outdoor movie night!",
    ages: 12,
  },
  {
    createdBy: "JaneSmith",
    name: `Art Workshop`,
    date: new Date("2024-09-05"),
    address: "321 Elm St, Ogden, Utah",
    description: "Unleash your creativity and join us for a fun art workshop!",
    ages: 16,
  },
  {
    createdBy: "EventPlanner123",
    name: `Charity Gala`,
    date: new Date("2024-11-10"),
    address: "654 Pine Dr, Logan, Utah",
    description: "Support a great cause at our annual charity gala event.",
    ages: 21,
  },
  {
    createdBy: "EventOrganizer456",
    name: `Fitness Bootcamp`,
    date: new Date("2024-06-05"),
    address: "987 Maple Ave, St. George, Utah",
    description: "Get fit and have fun at our intense fitness bootcamp!",
    ages: 18,
  },
  {
    createdBy: "PartyMaster789",
    name: `Neon Glow Party`,
    date: new Date("2024-10-12"),
    address: "456 Oak St, Salt Lake City, Utah",
    description: "Experience an electrifying night at our neon glow party!",
    ages: 18,
  },
  {
    createdBy: "ArtEnthusiast",
    name: `Paint and Sip`,
    date: new Date("2024-09-25"),
    address: "789 Elm Ave, Park City, Utah",
    description:
      "Relax, paint, and enjoy a glass of wine at our paint and sip event.",
    ages: 21,
  },
  {
    createdBy: "MusicLover321",
    name: `Concert in the Park`,
    date: new Date("2024-08-08"),
    address: "123 Pine Dr, Provo, Utah",
    description: "Groove to the music at our outdoor concert in the park!",
    ages: 12,
  },
  {
    createdBy: "FoodieGuru",
    name: `Food Festival`,
    date: new Date("2024-07-28"),
    address: "456 Oak Ave, Ogden, Utah",
    description:
      "Indulge in a variety of delicious cuisines at our food festival.",
    ages: 18,
  },
  {
    createdBy: "AdventureSeeker",
    name: `Hiking Expedition`,
    date: new Date("2024-09-14"),
    address: "987 Elm St, Logan, Utah",
    description:
      "Embark on an adventurous hiking expedition with breathtaking views!",
    ages: 16,
  },
  {
    createdBy: "BookClubMember",
    name: `Literary Discussion`,
    date: new Date("2024-08-02"),
    address: "321 Maple Ave, St. George, Utah",
    description:
      "Join us for a thought-provoking discussion on the latest bestseller.",
    ages: 18,
  },
  {
    createdBy: "TechEnthusiast",
    name: `Hackathon`,
    date: new Date("2024-10-20"),
    address: "654 Pine Dr, Salt Lake City, Utah",
    description:
      "Put your coding skills to the test at our exciting hackathon!",
    ages: 16,
  },
  {
    createdBy: "YogaLover",
    name: `Sunrise Yoga`,
    date: new Date("2024-07-19"),
    address: "789 Elm Ave, Park City, Utah",
    description: "Start your day with a rejuvenating sunrise yoga session.",
    ages: 18,
  },
];

async function seedEvents() {
  for (let i = 0; i < events.length; i++) {
    const event = events[i];
    await Event.create(event);
    console.log(`Event ${i + 1} seeded: ${event.name}`);
  }
}

seedEvents();
