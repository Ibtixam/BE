import Users from "../models/Users.js";
import bcrypt from "bcryptjs";

export const register = async (req, res) => {
  const { name, email, password } = req.body;
  const salt = await bcrypt.genSalt(10);
  const securePass = await bcrypt.hash(password, salt);

  const newUser = new Users({
    name,
    email,
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
