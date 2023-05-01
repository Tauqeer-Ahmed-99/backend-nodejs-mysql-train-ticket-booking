import express from "express";
import database from "../../utils/database";
import bcrypt from "bcrypt";
import { isEmailValid } from "../../utils/utility";

const saltRounds = 10;

const signup = async (req: express.Request, res: express.Response) => {
  try {
    const { username, email, password, phone, address } = req.body;

    if (username.length < 8 || password.length < 8) {
      const response = {
        status: "error",
        message: "Username & password must be atleast 8 chars long.",
      };
      return res.status(400).send(response);
    }
    if (!isEmailValid(email)) {
      const response = {
        status: "error",
        message: "Email is not valid.",
      };
      return res.status(400).send(response);
    }
    if (phone.length < 10) {
      const response = {
        status: "error",
        message: "Contact number must be atleast 10 chars long.",
      };
      return res.status(400).send(response);
    }

    let passwordHash;

    bcrypt.hash(password, saltRounds, async (error, hash) => {
      if (error) {
        console.log(error);
        return res
          .status(500)
          .send({ status: "error", message: error.message });
      } else {
        passwordHash = hash;

        const addUserQuery =
          "INSERT INTO users (user_name, user_email, user_phone, user_address, password_hash) VALUES (?, ?, ?, ?, ?)";

        const result = await database.execute(
          addUserQuery,
          [username, email, phone, address, passwordHash],
          async (error, results, fields) => {
            if (error) {
              switch (error.code) {
                case "ER_DUP_ENTRY":
                  console.log(error);
                  const response = {
                    status: "error",
                    message: "Email or Username already in use.",
                  };
                  return res.status(400).send(response);
                default:
                  console.log(error);
                  return res
                    .status(400)
                    .send({ status: "error", message: error.message });
              }
            } else if (results) {
              const getUserQuery =
                "SELECT user_id, user_name, user_email, user_phone, user_address FROM users WHERE user_email = ?";

              const user = await database.execute(
                getUserQuery,
                [email],
                (error, results, fields) => {
                  if (error) {
                    console.log(error);
                    const response = {
                      status: "error",
                      message: error.message,
                    };
                    return res.status(500).send(response);
                  } else if (results.length > 1) {
                    console.log("Multiple Results found.");
                    const response = {
                      status: "error",
                      message: "Server Error.",
                    };
                    return res.status(500).send(response);
                  }
                  if (!error && results.length === 1) {
                    const user = results[0];
                    bcrypt.compare(password, hash, (error, result) => {
                      if (error) {
                        console.log(error);
                        const response = {
                          status: "error",
                          message: error.message,
                        };
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
                  }
                }
              );
            }
          }
        );
      }
    });
  } catch (error: any) {
    console.log(error);
    return res.status(500).send({ status: "error", message: error.message });
  }
};

export default signup;
