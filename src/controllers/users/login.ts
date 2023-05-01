import express from "express";
import bcrypt from "bcrypt";
import database from "../../utils/database";

const login = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password } = req.body;

    const getUserQuery = "SELECT * FROM users WHERE user_email = ?";

    const user = await database.execute(
      getUserQuery,
      [email],
      (error, results, fileds) => {
        if (error) {
          console.log(error);
          const response = {
            status: "error",
            message: error.message,
          };
          return res.status(400).send(response);
        }
        if (results.length > 1) {
          console.log("Multiple Results found.");
          const response = {
            status: "error",
            message: "Server Error.",
          };
          return res.status(500).send(response);
        }
        const user = results[0];
        if (user) {
          bcrypt.compare(password, user["password_hash"], (error, result) => {
            if (error) {
              console.log(error);
              const response = { status: "error", message: error.message };
              return res.status(500).send(response);
            } else if (result) {
              const response = {
                status: "success",
                user: {
                  userId: user["user_id"],
                  username: user["user_name"],
                  email: user["user_email"],
                  phone: user["user_phone"],
                  address: user["user_address"],
                },
              };
              return res.status(200).send(response);
            } else {
              const response = {
                status: "error",
                message: "Invalid username or password.",
              };
              return res.status(400).send(response);
            }
          });
        } else {
          const response = {
            status: "error",
            message: "Invalid username or password.",
          };
          return res.status(400).send(response);
        }
      }
    );
  } catch (error: any) {
    console.log(error);
    const response = {
      status: "error",
      message: error.message,
    };
  }
};

export default login;
