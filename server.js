import express from "express";
import { connectToDb } from "./db.js";
import { addProducts, getProducts } from "./controllers/productControllers.js";
import { login, register } from "./controllers/userControllers.js";

const app = express();
const PORT = 5000;

connectToDb();

app.use(express.json());

// Products Routes
app.post("/api/add/products", addProducts);
app.get("/api/get/products", getProducts);

// Auth Routes
app.post("/login", login);
app.post("/register", register);

app.listen(PORT, () => {
  console.log(`Backend listening on http://localhost:${PORT}`);
});
