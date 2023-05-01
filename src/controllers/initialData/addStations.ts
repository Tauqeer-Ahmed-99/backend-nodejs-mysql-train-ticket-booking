import express from "express";
import path from "path";
import database from "../../utils/database";

const XLSX = require("xlsx");

const addStations = async (req: express.Request, res: express.Response) => {
  const dirArr = __dirname.split("\\");
  dirArr.pop();
  const dir = dirArr.join("\\");
  console.log(dir);
  const workbook = XLSX.readFile(path.join(dir, "assets", "stations.xlsx"));
  const sheet = workbook.Sheets["Sheet1"];
  const data = XLSX.utils.sheet_to_json(sheet);

  const query =
    "INSERT INTO stations (station_id, station_name, distance_from_origin) VALUES (?, ?, ?)";

  const result = [];
  for (const stn of data) {
    const success = await database.execute(query, [
      stn["STN CODE"],
      stn["STN NAME"],
      stn["DISTANCE"],
    ]);
    result.push(success);
  }

  res.status(200).send(result);
};

export default addStations;
