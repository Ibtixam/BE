import express from "express";
import { connectToDb } from "./db.js";
import { addProducts, getProducts } from "./controllers/productControllers.js";

const app = express();
const PORT = 5000;

connectToDb();

app.use(express.json());

// Products Routes
app.post("/api/add/products", addProducts);
app.get("/api/get/products", getProducts);


app.listen(PORT, () => {
  console.log(`Backend listening on http://localhost:${PORT}`);
});
