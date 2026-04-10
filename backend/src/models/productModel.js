import mongoose from "mongoose";

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    brand: {
      //Chuyển Brand thành Reference (liên kết tới Brand Model)
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Brand",
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Category",
    },
    variants: [//Chuyển Price và Stock đơn lẻ thành mảng Biến thể 
      {
        size: { type: String, required: true }, // VD: "10ml Chiết", "100ml Full"
        originalPrice: { type: Number, required: true },
        discountPrice: { type: Number }, // Giá sau giảm (nếu có)
        stock: { type: Number, required: true, default: 0 },
      }
    ],
    scentNotes: {
      top: { type: String },
      heart: { type: String },
      base: { type: String },
    },
    specs: {
      longevity: { type: String },   // độ lưu hương
      sillage: { type: String },
      concentration: { type: String },
    },
    description: {
      type: String,
      required: true,
    },

    images: [
      {
        type: String,
        required: true,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);
export default Product;
