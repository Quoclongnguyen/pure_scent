import express from "express"
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();
import { createCategory, deleteCategory, getCategory, updateCategory } from "../controllers/categoryController.js"

router.route("/").get(getCategory)

router.route("/",).post(protect, admin, createCategory)

router.route("/:id",).put(protect, admin, updateCategory).delete(protect, admin, deleteCategory)


export default router