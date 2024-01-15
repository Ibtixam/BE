import Users from "../models/Users.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const jwt_secret = process.env.JWT_SECRET;

export const register = async (req, res) => {
  const { name, email, password } = req.body;
  const salt = await bcrypt.genSalt(10);
  const securePass = await bcrypt.hash(password, salt);

  const newUser = new Users({
    name,
    email,
    password: securePass,
  });

  const data = {
    user: {
      id: newUser._id,
    },
  };

  const authToken = jwt.sign(data, jwt_secret);
  res.status(200).send({ authToken });

  try {
    await newUser.save();
    res.status(200).send("User successfully saved into backend");
  } catch (error) {
    res.status(500).send(error);
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await Users.findOne({ email });

    if (!user) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const data = {
      user: {
        id: user._id,
      },
    };

    const authToken = jwt.sign(data, jwt_secret);
    res.status(200).send({ authToken });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
