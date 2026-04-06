import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "./models/productModel.js";
import User from "./models/userModel.js"; // Để gắn vào trường user nếu cần
import connectDB from "./config/db.js";

dotenv.config();
connectDB();

const products = [
    {
        name: "Santal 33",
        brand: "Le Labo",
        category: "65f1234567890abcdef12345", // Tạm thời để ID giả hoặc thực tế
        description: "Hương thơm mang tính biểu tượng với nồng độ gỗ đàn hương cao.",
        price: 5500000,
        stock: 10,
        images: ["/src/assets/img1.png"],
    },
    {
        name: "Another 13",
        brand: "Le Labo",
        category: "65f1234567890abcdef12345",
        description: "Sự kết hợp độc đáo giữa hương gỗ và xạ hương.",
        price: 5200000,
        stock: 15,
        images: ["/src/assets/img1.png"],
    },
    {
        name: "Rose 31",
        brand: "Le Labo",
        category: "65f1234567890abcdef12345",
        description: "Hương hoa hồng pha trộn với các nốt hương cay nồng.",
        price: 4800000,
        stock: 8,
        images: ["/src/assets/img1.png"],
    }
];

const importData = async () => {
    try {
        await Product.deleteMany(); // Xóa sạch sản phẩm cũ trước khi nạp
        await Product.insertMany(products);

        console.log("Dữ liệu đã được nạp thành công! ");
        process.exit();
    } catch (error) {
        console.error(`Lỗi: ${error.message} `);
        process.exit(1);
    }
};

importData();
