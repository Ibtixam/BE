import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectToDb } from "./db.js";
import UserRoutes from "./routes/userRoutes.js";
import VoucherRoutes from "./routes/voucherRoutes.js";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config();
const app = express();
const port = process.env.PORT;

connectToDb();

const corsOpts = {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "auth-token"],
};

app.use(express.urlencoded({ extended: false }));
app.options("", cors(corsOpts));
app.use(cors(corsOpts));
app.use(express.json());

app.use("/uploads", express.static(__dirname + "/uploads"));

app.use("/api/auth", UserRoutes);
app.use("/api", VoucherRoutes);

app.get("/", (_, res) => res.send("API is running correctly"));

app.listen(port, () => {
  console.log(`Backend listening on http://localhost:${port}`);
});
