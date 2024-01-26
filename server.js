import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectToDb } from "./db.js";
import { addProducts, getProducts } from "./controllers/productControllers.js";
import UserRoutes from "./routes/userRoutes.js";
import fetchUser from "./middleware/fetchuser.js";
import multer from "multer";
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
  methods: ["GET", "POST", "PUT"],
  allowedHeaders: ["Content-Type", "auth-token"],
};

app.use(express.urlencoded({ extended: false }));
app.use(cors(corsOpts));
app.use(express.json());

// Products Routes
app.post("/api/add/products", fetchUser, upload.single("Voucher_Image"), addProducts);
app.get("/api/get/products", fetchUser, getProducts);

app.listen(port, () => {
  console.log(`Backend listening on htttp://localhost:${port}`);
});

app.use("/api/auth", UserRoutes);
