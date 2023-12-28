import mongoose from "mongoose";
import {initDatabase} from "./init-database";
import {User} from "../model/user.model"
import {Card} from "../model/card.model";
const chalk = require('chalk');



export const connect = async () => {
  const host = process.env.DATABASE_HOST;
  const port = process.env.DATABASE_PORT;
  const database = process.env.DATABASE_NAME;
  const user = process.env.DATABASE_USER;
  const pass = process.env.DATABASE_PASSWORD;

  const connectionString = `mongodb://${user}:${pass}@${host}:${port}/${database}`;

  console.log(chalk.bgBlueBright(connectionString));


  await mongoose.connect(connectionString);

  const usersCount = await User.countDocuments();
  const cardsCount = await Card.countDocuments();
if (!usersCount && !cardsCount) {
  const initData = await initDatabase()
}

  console.log(chalk.bgGreenBright("Database Connected"))

};

