import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectToDb } from "./db.js";
import {
  addVoucher,
  getAllVouchers,
  getVoucher,
  deleteVoucher,
} from "./controllers/productControllers.js";
import UserRoutes from "./routes/userRoutes.js";
import fetchUser from "./middleware/fetchuser.js";
import multer from "multer";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

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

// Voucher Routes
app.post(
  "/api/add/voucher",
  fetchUser,
  upload.single("Voucher_Image"),
  addVoucher
);
app.get("/api/get/voucher", fetchUser, getVoucher);
app.get("/api/all/vouchers", fetchUser, getAllVouchers);
app.post("/api/delete/voucher", fetchUser, deleteVoucher);
app.get("/", (req, res) => res.send("API is running correctly"));

app.listen(port, () => {
  console.log(`Backend listening on http://localhost:${port}`);
});

