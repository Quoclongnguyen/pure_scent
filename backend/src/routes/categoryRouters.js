import express from "express"
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();
import { createCategory } from "../controllers/categoryController.js"

router.route("/",).post(protect, admin, createCategory)
export default router