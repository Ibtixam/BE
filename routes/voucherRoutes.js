import express from "express";
import {
  addVoucher,
  getAllVouchers,
  getVoucher,
  deleteVoucher,
  filterVoucher,
} from "../controllers/productControllers.js";
import fetchUser from "../middleware/fetchuser.js";
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

const router = express();

router.post(
  "/add/voucher",
  fetchUser,
  upload.single("Voucher_Image"),
  addVoucher
);
router.get("/get/voucher", fetchUser, getVoucher);
router.get("/all/vouchers", fetchUser, getAllVouchers);
router.post("/delete/voucher", fetchUser, deleteVoucher);
router.post("/filter/voucher", fetchUser, filterVoucher);

export default router;
