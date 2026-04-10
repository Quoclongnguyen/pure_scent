import express from "express"
import { protect, admin } from "../middleware/authMiddleware.js"

const router = express.Router()
import { getBrands, createBrand } from "../controllers/brandController.js"

router.route("/").get(getBrands).post(protect, admin, createBrand)

export default router
