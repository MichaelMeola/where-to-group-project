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
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    profilePic: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
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
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
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
    likes: {
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

class Liked extends Model {
  [util.inspect.custom]() {
    return this.toJSON();
  }
}

Liked.init(
  {
    likeId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    count: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    }
  },
  {
    sequelize: db,
  }
);

class SavedEvent extends Model {
  [util.inspect.custom]() {
    return this.toJSON();
  }
}

SavedEvent.init(
  {
    savedEventId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
  },
  {
    sequelize: db,
  }
);

User.belongsToMany(Event, { through: SavedEvent, foreignKey: "userId"});
Event.belongsToMany(User, { through: SavedEvent, foreignKey: "eventId", as: 'savedEvents'});
User.hasMany(SavedEvent, { foreignKey: "userId" });
SavedEvent.belongsTo(User, { foreignKey: "userId" })
Event.hasMany(SavedEvent, { foreignKey: "eventId" });
SavedEvent.belongsTo(Event, { foreignKey: "eventId" })

Event.hasMany(Liked, { foreignKey: "eventId" });
Liked.belongsTo(Event, { foreignKey: "eventId" });
User.hasMany(Liked, { foreignKey: "userId" });
Liked.belongsTo(User, { foreignKey: "userId" });

User.hasMany(Event, {foreignKey: "userId"})
Event.belongsTo(User, { foreignKey: "userId", as: 'user' })

if (process.argv[1] === url.fileURLToPath(import.meta.url)) {
  console.log("Syncing database...");
  await db.sync();
  console.log("Finished syncing database!");
}

export { User, Event, Liked, SavedEvent };
