import { User, Event } from "./models.js";
import bcrypt from "bcryptjs";

for (let i = 0; i < 5; i++) {
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync("test", salt);
  await User.create({
    username: `user${i}`,
    email: `user${i}@gmail.com`,
    password: hashedPassword,
    age: 22,
  });
}

const events = [
  {
    userId: 3,
    name: `Rikki's House Party`,
    date: new Date("2024-12-31"),
    address: "123 Fake St, Salt Lake City, Utah",
    description: "It will be a good time",
    image: "https://i.imgur.com/xq9Hz.jpg?1",
    likes: 74,
    ages: 21,
  },
  {
    userId: 1,
    name: `Summer BBQ Bash`,
    date: new Date("2024-07-15"),
    address: "456 Main St, Park City, Utah",
    description: "Join us for a sizzling summer barbecue!",
    image:
      "https://i0.wp.com/shopwithleslie.blog/wp-content/uploads/2021/02/barbecue-blog.png?resize=640%2C480&ssl=1",
    likes: 30,
    ages: 18,
  },
  {
    userId:  2,
    name: `Movie Night Under the Stars`,
    date: new Date("2024-08-20"),
    address: "789 Oak Ave, Provo, Utah",
    description: "Bring your blankets and join us for an outdoor movie night!",
    image:
      "https://liveheadwaters.com/wp-content/uploads/2018/11/movie-under-the-stars.jpg",
    likes: 43,
    ages: 12,
  },
  {
    userId:  4,
    name: `Art Workshop`,
    date: new Date("2024-09-05"),
    address: "321 Elm St, Ogden, Utah",
    description: "Unleash your creativity and join us for a fun art workshop!",
    image:
      "https://www.shutterstock.com/image-photo/art-wine-celebration-friends-painting-600nw-2341133585.jpg",
    likes: 12,
    ages: 16,
  },
  {
    userId:  5,
    name: `Charity Gala`,
    date: new Date("2024-11-10"),
    address: "654 Pine Dr, Logan, Utah",
    description: "Support a great cause at our annual charity gala event.",
    image:
      "https://blog.justgiving.com/wp-content/uploads/2020/09/Charity-gala.png",
    ages: 21,
  },
  {
    userId: 1,
    name: `Fitness Bootcamp`,
    date: new Date("2024-06-05"),
    address: "987 Maple Ave, St. George, Utah",
    description: "Get fit and have fun at our intense fitness bootcamp!",
    image:
      "https://www.afcfitness.com/wp-content/uploads/2018/11/class_boot_camp.jpg",
    ages: 18,
  },
  {
    userId: 5,
    name: `Neon Glow Party`,
    date: new Date("2024-10-12"),
    address: "456 Oak St, Salt Lake City, Utah",
    description: "Experience an electrifying night at our neon glow party!",
    image:
      "https://cdn.shopify.com/s/files/1/0716/5086/9563/files/81QPFv4oPQS__AC_SL1500_-800x800.jpg",
    ages: 18,
  },
  {
    userId: 2,
    name: `Paint and Sip`,
    date: new Date("2024-09-25"),
    address: "789 Elm Ave, Park City, Utah",
    description:
      "Relax, paint, and enjoy a glass of wine at our paint and sip event.",
    image:
      "https://media.tenor.com/Dc5SGhuskTUAAAAe/old-guy-falling-down-stairs.png",
    ages: 21,
  },
  {
    userId: 3,
    name: `Concert in the Park`,
    date: new Date("2024-08-08"),
    address: "123 Pine Dr, Provo, Utah",
    description: "Groove to the music at our outdoor concert in the park!",
    image: "https://i.ytimg.com/vi/vbo0nljJ23Q/maxresdefault.jpg",
    likes: 18,
    ages: 12,
  },
  {
    userId: 4,
    name: `Food Festival`,
    date: new Date("2024-07-28"),
    address: "456 Oak Ave, Ogden, Utah",
    description:
      "Indulge in a variety of delicious cuisines at our food festival.",
    image:
      "https://livability.com/wp-content/uploads/2021/06/StockFoodFestival.jpeg",
    ages: 18,
  },
  {
    userId: 2,
    name: `Hiking Expedition`,
    date: new Date("2024-09-14"),
    address: "987 Elm St, Logan, Utah",
    description:
      "Embark on an adventurous hiking expedition with breathtaking views!",
    image:
      "https://worldexpeditions.com/Portals/World%20Expeditions/LiveBlog/WP-Images/Ama_Dablam-_Nepal-mediumnew-1.jpg",
    ages: 16,
  },
  {
    userId: 3,
    name: `Literary Discussion`,
    date: new Date("2024-08-02"),
    address: "321 Maple Ave, St. George, Utah",
    description:
      "Join us for a thought-provoking discussion on the latest bestseller.",
    image:
      "https://www.islandbooks.com/sites/mercerislandbooks.com/files/bookclub.jpg",
    ages: 18,
  },
  {
    userId: 5,
    name: `Hackathon`,
    date: new Date("2024-10-20"),
    address: "654 Pine Dr, Salt Lake City, Utah",
    description:
      "Put your coding skills to the test at our exciting hackathon!",
    image:
      "https://static.independent.co.uk/s3fs-public/thumbnails/image/2014/05/01/21/stephen-hawking.jpg?width=1200",
    ages: 16,
  },
  {
    userId: 1,
    name: `Sunrise Yoga`,
    date: new Date("2024-07-19"),
    address: "789 Elm Ave, Park City, Utah",
    description: "Start your day with a rejuvenating sunrise yoga session.",
    image: "https://i.ytimg.com/vi/6Tw9JtVl7kY/maxresdefault.jpg",
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
