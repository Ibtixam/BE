import Users from "../models/Users.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const JwtSecret = process.env.JWT_SECRET;

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
      id: Users._id,
    },
  };

  const authToken = jwt.sign(data, JwtSecret);
  res.json({ authToken });

  try {
    newUser.save();
    res.status(200).send("Account Created Successfully");
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await Users.findOne({ email });

    if (!user) {
      return res.status(400).json("Invalid credentials");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json("Invalid credentials");
    }

    const data = {
      user: {
        id: Users._id,
      },
    };

    const authToken = jwt.sign(data, JwtSecret);
    res.json({ authToken });
  } catch (error) {
    console.error(error.message);
    res.status(500).json("Invalid Email or Password");
  }
};
