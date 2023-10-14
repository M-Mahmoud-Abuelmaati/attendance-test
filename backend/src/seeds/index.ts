import "dotenv/config";
import mongoose from "mongoose";
import { User } from "../app/models";
import config from "../../config";

mongoose
  .connect(config.MONGO_URI!, {
    dbName: config.DB_NAME,
  })
  .then(() => console.log("MongoDB Connection Open"));

const seedUsers = [
  {
    name: "Sarah Doe",
    email: "hr@test.com",
    group: "HR",
    password: "123123123",
  },
  {
    name: "John Doe",
    email: "employee@test.com",
    group: "EMPLOYEE",
  },
];

const seedDB = async () => {
  console.log("Seeding Initialized");
  await User.deleteMany({});
  await User.insertMany(seedUsers);
  console.log("Seeding Done");
};

seedDB()
  .then(() => mongoose.connection.close())
  .finally(() => console.log("MongoDB Connection Closed"));
