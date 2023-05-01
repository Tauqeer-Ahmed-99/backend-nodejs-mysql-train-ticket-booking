import express from "express";

import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";

import database from "./utils/database";

import signup from "./controllers/users/signup";
import login from "./controllers/users/login";
import getAllDetails from "./controllers/tickets/getAllDetails";
import getTicketSummary from "./controllers/tickets/getTicketSummary";
import bookTicket from "./controllers/tickets/bookTicket";
import cancelTicket from "./controllers/tickets/cancelTicket";

// import addStations from "./controllers/initialData/addStations";

dotenv.config();

database.connect((error) => {
  try {
    if (error) {
      throw error;
    }
    console.log("Connected to MySQL database!");
  } catch (error) {
    console.log("Connection to MySQL database failed!");
    console.log(error);
  }
});

const port = process.env.PORT;

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// app.post("/addStations", addStations);

//User
app.post("/signup", signup);
app.post("/login", login);

//Ticket
app.get("/get-all-details", getAllDetails);
app.get("/get-ticket-fare", getTicketSummary);
app.post("/book-ticket", bookTicket);
app.post("/cancel-ticket", cancelTicket);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
