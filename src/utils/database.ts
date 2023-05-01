import * as mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

const DBHost = process.env.DB_HOST;
const DBUser = process.env.DB_USER;
const DBPassword = process.env.DB_PASSWORD;
const DBName = process.env.DB_NAME;

const database = mysql.createConnection({
  host: DBHost,
  user: DBUser,
  password: DBPassword,
  database: DBName,
});

export default database;
