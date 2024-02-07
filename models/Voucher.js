import mongoose from "mongoose";
const { Schema } = mongoose;

const VoucherSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "Voucher",
  },
  Voucher_Type: {
    type: String,
    required: true,
  },
  Voucher_Number: {
    type: String,
    required: true,
  },
  Amount: {
    type: Number,
  },
  Location: {
    type: String,
  },
  Date: {
    type: String,
    required: true,
  },
  Voucher_Image: {
    type: String,
    required: true,
  },
});

const Voucher = mongoose.model("Voucher", VoucherSchema);

export default Voucher;
