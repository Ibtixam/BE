import mongoose from "mongoose";
const { Schema } = mongoose;

const ProductSchema = new Schema({
  name: String,
});

const Products = mongoose.model("Products", ProductSchema);

export default Products;