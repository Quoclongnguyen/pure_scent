import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

// Người dùng phải được xác thực
const protect = async (req, res, next) => {
  let token;

  // Đọc JWT từ cookie
  token = req.cookies.jwt;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.userId).select("-password");
      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: "Không được xác thực, token thất bại" });
    }
  } else {
    res.status(401).json({ message: "Không được xác thực, không có token" });
  }
};

// Người dùng phải là quản trị viên.
const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401).json({ message: "Không được xác thực, không phải là admin" });
  }
};

// Người dùng phải là Super Admin
const superAdmin = (req, res, next) => {
  // Backwards compatibility for the original admin who has no role assigned yet
  const isOriginalAdmin = req.user && req.user.isAdmin && (!req.user.role || req.user.role === 'user');
  if (req.user && (req.user.role === 'superAdmin' || isOriginalAdmin)) {
    next();
  } else {
    res.status(401).json({ message: "Chỉ Super Admin (Chủ cửa hàng) mới có quyền này" });
  }
};

export { protect, admin, superAdmin };
