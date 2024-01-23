import { DataTypes, Model } from "sequelize";
import connectToDB from "../db/db.js";
import url from "url";
import util from "util";

const db = await connectToDB("postgres:///whereto");

class User extends Model {
  [util.inspect.custom]() {
    return this.toJSON();
  }
}

User.init(
  {
    userId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    friends: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize: db,
  }
);

class Group extends Model {
  [util.inspect.custom]() {
    return this.toJSON();
  }
}

Group.init(
  {
    groupId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    creatorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: User, key: "userId" },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    zip: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize: db,
  }
);

class Event extends Model {
  [util.inspect.custom]() {
    return this.toJSON();
  }
}

Event.init(
  {
    eventId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    groupId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: { model: Group, key: "groupId" },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATETIME,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    votes: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    ages: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    sequelize: db,
  }
);

class Winner extends Model {
  [util.inspect.custom]() {
    return this.toJSON();
  }
}

Winner.init(
  {
    winnerId: {
      type: DataTypes.INTEGER,
      autoIncrement:true,
      primaryKey: true
    },
    groupId: {
      type: DataTypes.INTEGER,
      references: { model: Group, key: "groupId" },
      allowNull: false
    },
    eventId: {
      type: DataTypes.INTEGER,
      references: { model: Event, key: "eventId" },
      allowNull: false
    },
    winningVotes: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }
)

if (process.argv[1] === url.fileURLToPath(import.meta.url)) {
  console.log("Syncing database...");
  await db.sync();
  console.log("Finished syncing database!");
}

export { User, Group, Event, Winner };
