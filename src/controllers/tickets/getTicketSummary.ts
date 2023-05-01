import express from "express";
import database from "../../utils/database";

const getTicketSummary = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { src, dest, tClass, type, adult, child } = req.query;
    const emptyParams = [];
    for (const param in req.query) {
      if (!req.query[param]) {
        emptyParams.push(param);
      }
    }
    if (emptyParams.length) {
      const response = {
        status: "error",
        message: `Please add valid ${emptyParams.join(" ,")} in query params.`,
      };
      return res.status(400).send(response);
    } else {
      const getDistanceQuery =
        "SELECT * FROM stations WHERE station_id = ? OR station_id = ? ORDER BY distance_from_origin DESC";

      await database.execute(
        getDistanceQuery,
        [src, dest],
        async (error, results, fields) => {
          if (error) {
            console.log(error);
          } else {
            const srcStn = results.find((stn) => stn["station_id"] === src);
            const destStn = results.find((stn) => stn["station_id"] === dest);
            const distance = Math.ceil(
              results[0]["distance_from_origin"] -
                results[1]["distance_from_origin"]
            );

            const getFareQuery =
              type === "PLT"
                ? `SELECT *
             FROM ticket_fare
             WHERE ticket_type = ?
             `
                : `SELECT *
             FROM ticket_fare
             WHERE distance >= ?
             AND ticket_class = ?
             AND ticket_type = ?
             ORDER BY distance ASC`;

            await database.execute(
              getFareQuery,
              type === "PLT" ? ["PLT"] : [+distance, tClass, "JNY"],
              (error, results, fields) => {
                if (error) {
                  console.log(error);
                } else {
                  let fare = 0;
                  if (adult && adult !== "0") {
                    fare = fare + results[0]["fare"] * +adult;
                  }
                  if (child && child !== "0") {
                    fare = fare + Math.ceil(results[0]["fare"] * +child * 0.5);
                  }
                  if (type === "RTN") {
                    fare = fare * 2;
                  }
                  if (type === "SSN") {
                    console.log(fare);
                    fare = Math.ceil((fare / 5) * 180);
                  }
                  const response = {
                    status: "success",
                    fare_details: {
                      src_station: srcStn,
                      dest_station: destStn,
                      tClass: tClass,
                      type: type,
                      distance: distance,
                      adult: adult,
                      child: child,
                      fare: fare,
                    },
                  };
                  res.status(200).send(response);
                }
              }
            );
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

export default getTicketSummary;
