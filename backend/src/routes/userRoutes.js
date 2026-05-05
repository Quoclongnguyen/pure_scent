import express from "express";
const router = express.Router();
import {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  getUsers,
  deleteUser,
  updateUserRole,
} from "../controllers/userController.js";
import { protect, admin, superAdmin } from "../middleware/authMiddleware.js";

router.route("/").post(registerUser).get(protect, superAdmin, getUsers);
router.post("/logout", logoutUser);
router.post("/login", authUser);
router.route("/profile").get(protect, getUserProfile);
router.route("/:id").delete(protect, superAdmin, deleteUser);
router.route("/:id/role").put(protect, superAdmin, updateUserRole);

export default router;
