import express from "express";
import database from "../../utils/database";

const cancelTicket = async (req: express.Request, res: express.Response) => {
  try {
    const { userId, ticketId } = req.query;
    const emptyFields = [];
    for (const field in req.query) {
      if (!req.query[field]) {
        emptyFields.push(field);
      }
    }
    if (emptyFields.length) {
      const response = {
        status: "error",
        message: `Please add valid ${emptyFields.join(" ,")} in query.`,
      };
      return res.status(400).send(response);
    } else {
      const cancelTicketQuery =
        "DELETE FROM tickets WHERE ticket_id = ? AND user_id = ?";

      await database.execute(
        cancelTicketQuery,
        [+(ticketId as string), +(userId as string)],
        (error, result: any, fields) => {
          if (error) {
            console.log(error);
            const response = {
              status: "error",
              message: error.message,
            };
            return res.status(400).send(response);
          } else {
            const response = {
              status: "success",
              message:
                result.affectedRows === "0" || result.affectedRows === 0
                  ? `No ticket found with id ${ticketId}.`
                  : `${result.affectedRows} ticket(s) cancelled successfully.`,
            };
            return res.status(201).send(response);
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

export default cancelTicket;
