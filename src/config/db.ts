import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
  dialect: "postgres",
  host: process.env.DATABASE_HOST,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  logging: false,
});

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected successfully");
  } catch (error) {
    console.log(error);
    throw new Error("Database connection failed");
  }
};

const syncDB = async () => {
  try {
    await sequelize.sync({ force: false }); // Set force: true for development to reset tables
    console.log("Database synced successfully!");
  } catch (error) {
    console.error("Error syncing database:", error);
    throw new Error("Database syncing failed");
  }
};

export { sequelize, connectDB, syncDB };
