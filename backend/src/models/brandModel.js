import mongoose from "mongoose";
const brandSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
        },
        description: {
            type: String,
        },
        origin: {
            type: String, // Xuất xứ của hãng (ví dụ: Pháp, Ý, Mỹ...)
        }
    },
    {
        timestamps: true,
    }
);
const Brand = mongoose.model("Brand", brandSchema);
export default Brand;