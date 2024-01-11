import express from "express";
import { connectToDb } from "./db.js";
import { addProducts, getProducts } from "./controllers/productControllers.js";
import { login, register } from "./controllers/userControllers.js";
import { body } from "express-validator";

const app = express();
const PORT = 5000;

connectToDb();

app.use(express.json());

// Products Routes
app.post("/api/add/products", addProducts);
app.get("/api/get/products", getProducts);

// Auth Routes
app.post(
  "/login",
  body("name", "Name must be alleast 3 characters").isLength({ min: 3 }),
  body("email", "Please Enter an valid email").isEmail(),
  body("password", "Name must be alleast 6 characters").isLength({ min: 6 }),
  login
);
app.post(
  "/register",
  [
    body("name", "Name must be alleast 3 characters").isLength({ min: 3 }),
    body("email", "Please Enter an valid email").isEmail(),
    body("password", "Name must be alleast 6 characters").isLength({ min: 6 }),
  ],
  register
);

app.listen(PORT, () => {
  console.log(`Backend listening on http://localhost:${PORT}`);
});
