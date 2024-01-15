import express from "express";
import {
  login,
  register,
  getUserDetails,
} from "../controllers/userControllers.js";
import { body } from "express-validator";
import fetchUser from "../middleware/fetchuser.js";

const router = express();
router.post(
  "/login",
  body("email", "Please Enter a valid email").isEmail(),
  body("password", "Name must be at least 6 characters").isLength({ min: 6 }),
  body("email", "Email cannot be blank").exists(),
  body("password", "Password cannot be blank").exists(),
  login
);

router.post(
  "/register",
  [
    body("name", "Name must be at least 3 characters").isLength({ min: 3 }),
    body("email", "Please Enter a valid email").isEmail(),
    body("password", "Name must be at least 6 characters").isLength({ min: 6 }),
  ],
  register
);

router.post("/getUserDetails", fetchUser, getUserDetails);

export default router;
