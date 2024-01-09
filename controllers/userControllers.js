import Users from "../models/Users.js";
import bcrypt from "bcryptjs";

export const register = async (req, res) => {
  const { body } = req;
  const salt = await bcrypt.genSalt(10);
  const securePass = await bcrypt.hash(body.password, salt);

  const newUser = new Users({
    name: body.name,
    email: body.email,
    password: securePass,
  });

  try {
    newUser.save();
    res.status(200).send("User successfully saved into backend");
  } catch (error) {
    res.status(500).send(error);
  }
};

export const login = (req, res) => {
  res.status(200).send("Login");
};
