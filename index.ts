import express from "express";
import usersRouter from "./routes/users";
import cardsRouter from "./routes/cards";
import { logger } from "./middleware/logger";
import { connect } from "./db/utils/connection";
import { errorHandler } from "./middleware/error-handler";
import { configEnv } from "./environments";
import cors from "cors";
const chalk = require('chalk');

configEnv(); //load all the values from .env

connect();
const app = express();

const allowedEndPoint = [
  'http:localhost:8080//api/v1/users',
  'http:localhost:8080//api/v1/cards'
];
const corsOptions = {
  origin: allowedEndPoint
}
app.use(cors(corsOptions));

//add an express middleware that uses JSON.parse(body)
app.use(express.json());
app.use(logger);

// serve the static files in the public directory
app.use(express.static("public"));

app.use("/api/v1/users", usersRouter);
app.use("/api/v1/cards", cardsRouter);

app.use(errorHandler);

const PORT = process.env.EXPRESS_PORT;

app.listen(PORT, () => {
  console.log(chalk.bgCyanBright( `App is running on http://localhost:${PORT}`));
});
