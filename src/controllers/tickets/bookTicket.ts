import express from "express";
import database from "../../utils/database";

const bookTicket = async (req: express.Request, res: express.Response) => {
  try {
    const {
      user_id,
      start_station,
      end_station,
      ticket_class,
      ticket_type,
      adult_count,
      child_count,
      fare,
    } = req.body;
    const emptyFields = [];
    for (const field in req.body) {
      if (!req.body[field]) {
        emptyFields.push(field);
      }
    }
    if (emptyFields.length) {
      const response = {
        status: "error",
        message: `Please add valid ${emptyFields.join(" ,")} in body.`,
      };
      return res.status(400).send(response);
    } else {
      const bookTicketQuery =
        "INSERT INTO tickets (user_id, ticket_type, ticket_class, start_station, end_station, registration_date, expire_date, adult_count, child_count, fare) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

      const todayDate = new Date();

      const expireDate = new Date(todayDate);
      if (ticket_type === "SSN") {
        expireDate.setDate(todayDate.getDate() + 180);
      } else {
        expireDate.setDate(todayDate.getDate() + 1);
      }

      const bookingDetails = {
        user_id,
        ticket_type,
        ticket_class,
        start_station,
        end_station,
        registration_date: todayDate.toISOString(),
        expire_date: expireDate.toISOString(),
        adult_count,
        child_count,
        fare,
      };

      await database.execute(
        bookTicketQuery,
        [
          user_id,
          ticket_type,
          ticket_class,
          start_station,
          end_station,
          todayDate.toISOString(),
          expireDate.toISOString(),
          adult_count,
          child_count,
          fare,
        ],
        (error, result: any, fields) => {
          if (error) {
            console.log(error);
            const response = {
              status: "error",
              message: error.message,
            };
          } else {
            const response = {
              status: "success",
              message: "Ticket booked successfully.",
              ticketDetails: {
                ticket_id: result["insertId"],
                ...bookingDetails,
              },
            };
            res.status(201).send(response);
          }
        }
      );
    }
  } catch (error: any) {
    console.log(error);
    const response = {
      status: "error",
      message: error.message,
    };
    res.status(500).send(response);
  }
};

export default bookTicket;
