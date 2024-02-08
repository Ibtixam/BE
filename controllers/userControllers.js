import Users from "../models/Users.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const jwt_secret = process.env.JWT_SECRET;

const generateAuthToken = (user) => {
  const data = {
    user: {
      id: user._id,
    },
  };
  return jwt.sign(data, jwt_secret);
};

export const register = async (req, res) => {
  const { name, email, role, password } = req.body;
  try {
    const salt = await bcrypt.genSalt(10);
    const securePass = await bcrypt.hash(password, salt);
    const findedUser = await Users.findOne({ email });

    const newUser = new Users({
      name,
      email,
      role,
      password: securePass,
    });

    if (findedUser) {
      res.status(400).send("User Already Exists");
    } else {
      await newUser.save();
      const authToken = generateAuthToken(newUser);
      res.status(200).send({ authToken });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await Users.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).send("Invalid credentials");
    }

    const authToken = generateAuthToken(user);
    res.status(200).send({ authToken, userInfo: { role: user.role } });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
};

export const getUserDetails = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await Users.findById(userId).select("-password");
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json("Internal Server Error");
  }
};
