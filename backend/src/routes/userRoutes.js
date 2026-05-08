import express from "express";
const router = express.Router();
import {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  updateUserPassword,
  getUsers,
  deleteUser,
  updateUserRole,
  googleLogin
} from "../controllers/userController.js";
import { protect, admin, superAdmin } from "../middleware/authMiddleware.js";

router.route("/").post(registerUser).get(protect, superAdmin, getUsers);
router.post("/logout", logoutUser);
router.post("/login", authUser);
router.route("/profile").get(protect, getUserProfile).put(protect, updateUserProfile);
router.post('/google-login', googleLogin)
router.route("/profile/password").put(protect, updateUserPassword);
router.route("/:id").delete(protect, superAdmin, deleteUser);
router.route("/:id/role").put(protect, superAdmin, updateUserRole);

export default router;
