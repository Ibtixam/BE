import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectToDb } from "./db.js";
import { addProducts, getProducts } from "./controllers/productControllers.js";
import UserRoutes from "./routes/userRoutes.js";
import fetchUser from "./middleware/fetchuser.js";

dotenv.config();
const app = express();
const port = process.env.PORT;
const host = process.env.host;

connectToDb();

const corsOpts = {
  origin: "*",
  methods: ["GET", "POST", "PUT"],
  allowedHeaders: ["Content-Type", "auth-token"],
};

app.use(cors(corsOpts));
app.use(express.json());

// Products Routes
app.post("/api/add/products", fetchUser, addProducts);
app.get("/api/get/products", fetchUser, getProducts);

app.listen(port, () => {
  console.log(`Backend listening on ${host}:${port}`);
});

app.use("/api/auth", UserRoutes);
