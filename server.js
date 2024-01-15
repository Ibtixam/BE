import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectToDb } from "./db.js";
import { addProducts, getProducts } from "./controllers/productControllers.js";
import { login, register } from "./controllers/userControllers.js";
import { body } from "express-validator";

dotenv.config();
const app = express();
const port = process.env.PORT;
const host = process.env.host;

connectToDb();

const corsOpts = {
  origin: "*",
  methods: ["GET", "POST", "PUT"],
  allowedHeaders: ["Content-Type"],
};

app.use(cors(corsOpts));
app.use(express.json());

// Products Routes
app.post("/api/add/products", addProducts);
app.get("/api/get/products", getProducts);

// Auth Routes
app.post(
  "/login",
  body("name", "Name must be at least 3 characters").isLength({ min: 3 }),
  body("email", "Please Enter a valid email").isEmail(),
  body("password", "Name must be at least 6 characters").isLength({ min: 6 }),
  login
);

app.post(
  "/register",
  [
    body("name", "Name must be at least 3 characters").isLength({ min: 3 }),
    body("email", "Please Enter a valid email").isEmail(),
    body("password", "Name must be at least 6 characters").isLength({ min: 6 }),
  ],
  register
);

app.listen(port, () => {
  console.log(`Backend listening on ${host}:${port}`);
});
