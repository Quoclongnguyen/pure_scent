import express from "express";
const router = express.Router();
import { getProducts, createProduct, getProductById, updateProduct, deleteProduct } from "../controllers/productController.js";
import { protect, admin } from "../middleware/authMiddleware.js";


router.route("/").get(getProducts)
router.route("/:id").get(getProductById).delete(protect, admin, deleteProduct).put(protect, admin, updateProduct)
router.route("/").post(protect, admin, createProduct)


export default router