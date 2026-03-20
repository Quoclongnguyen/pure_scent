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

export { protect, admin };
