import mongoose from "mongoose";
const { Schema } = mongoose;

const ProductSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "Products",
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
    required: true,
  },
  Date: {
    type: String,
    required: true,
  },
  Voucher_Image: {
    type: String,
    // required: true,
  },
});

const Products = mongoose.model("Products", ProductSchema);

export default Products;
