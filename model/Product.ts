import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Product title is required"],
      unique: true,
    },
    desc: { type: String, required: [true, "Product description is required"] },
    img: { type: String, required: [true, "Product image is required"] },
    categories: { type: Array },
    size: { type: String },
    color: { type: String },
    price: {
      type: Number,
      required: [
        true,
        "Product must have price or you goona sell it for free?",
      ],
    },
  },
  { timestamps: true }
);

const ProductModel = mongoose.model("Product", ProductSchema);

export default ProductModel;
