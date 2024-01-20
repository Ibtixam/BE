import mongoose from "mongoose";
const { Schema } = mongoose;

const ProductSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "Products",
  },
  Cash_payment_voucher: {
    type: String,
    required: true,
  },
  Salary_payment_voucher: {
    type: String,
    required: true,
  },
  GTN_Number: {
    type: String,
    required: true,
  },
});

const Products = mongoose.model("Products", ProductSchema);

export default Products;
