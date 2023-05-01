import express from "express";
import database from "../../utils/database";

const getAllDetails = async (req: express.Request, res: express.Response) => {
  try {
    const { userId } = req.query;

    if (userId) {
      const getAllStationsQuery =
        "SELECT * from stations ORDER BY distance_from_origin ASC";
      await database.execute(
        getAllStationsQuery,
        async (error, results, fileds) => {
          let stations: any = [];
          if (error) {
            console.log(error);
          } else {
            stations = results;
          }

          const getAllTicketsQuery =
            "SELECT * from tickets WHERE user_id = ? ORDER BY ticket_id DESC";
          await database.execute(
            getAllTicketsQuery,
            [+userId],
            async (error, results, fileds) => {
              let tickets = results;
              if (error) {
                console.log(error);
              } else {
                tickets = results;
              }

              const getTicketTypesQuery = "SELECT * FROM ticket_types";
              await database.execute(
                getTicketTypesQuery,
                async (error, results, fields) => {
                  let availableTicketTypes = results;
                  if (error) {
                    console.log(error);
                  } else {
                    availableTicketTypes = results;
                  }

                  const getClassTypesQuery = "SELECT * from ticket_classes";
                  await database.execute(
                    getClassTypesQuery,
                    (error, results) => {
                      let avlCalsses = results;
                      if (error) {
                        console.log(error);
                      } else {
                        avlCalsses = results;
                      }

                      const response = {
                        available_stations: stations,
                        user_tickets: tickets,
                        available_ticket_types: availableTicketTypes,
                        available_ticket_classes: avlCalsses,
                        status: "success",
                      };

                      res.status(200).send(response);
                    }
                  );
                }
              );
            }
          );
        }
      );
    } else {
      const response = {
        status: "error",
        message: "Please add user ID in parameters.",
      };
      res.status(400).send(response);
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

export default getAllDetails;
