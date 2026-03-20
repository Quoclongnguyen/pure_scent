import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import productRouters from "./routes/productRouters.js"
import categoryRouters from "./routes/categoryRouters.js"


dotenv.config();

// Connect to MongoDB
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch((error) => {
  console.log(`Error: ${error.message}`);
  process.exit(1);
});

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:5173", // default vite port
  credentials: true
}));

app.use("/api/users", userRoutes);
app.use("/api/products", productRouters)
app.use("/api/categories", categoryRouters)

// Basic route
app.get("/", (req, res) => {
  res.send("PureScent API is running...");
});

const PORT = process.env.PORT || 3001;

