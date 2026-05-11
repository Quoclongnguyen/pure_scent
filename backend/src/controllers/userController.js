import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";
import jwt from 'jsonwebtoken';
import { OAuth2Client } from "google-auth-library"


const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)
// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const authUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    const token = generateToken(res, user._id); //lấy token return về

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      role: user.role,
      token,
    });
  } else {
    res.status(401).json({ message: "Invalid email or password" });
  }
};

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400).json({ message: "Người dùng đã tồn tại" });
    return;
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    const token = generateToken(res, user._id);

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      role: user.role,
      token,
    });
  } else {
    res.status(400).json({ message: "Invalid user data" });
  }
};

// @desc    Logout user / clear cookie
// @route   POST /api/users/logout
// @access  Private
const logoutUser = (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({ message: "Logged out successfully" });
};

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      role: user.role,
      phone: user.phone || '',
      address: user.address || '',
    });
  } else {
    res.status(404).json({ message: "User not found" });
  }
};

// PUT /api/users/profile

const updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      if (req.body.email && req.body.email !== user.email) {
        const emailExists = await User.findOne({ email: req.body.email });
        if (emailExists) {
          res.status(400).json({ message: "Email này đã được sử dụng bởi tài khoản khác" });
          return;
        }
      }

      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.phone = req.body.phone !== undefined ? req.body.phone : user.phone;
      user.address = req.body.address !== undefined ? req.body.address : user.address;

      const updatedUser = await user.save();

      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
        role: updatedUser.role,
        phone: updatedUser.phone || '',
        address: updatedUser.address || '',
      });
    } else {
      res.status(404).json({ message: "Không tìm thấy người dùng" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message || "Lỗi server khi cập nhật hồ sơ" });
  }
};


// PUT /api/users/profile/password
const updateUserPassword = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      const { oldPassword, newPassword } = req.body;
      if (!(await user.matchPassword(oldPassword))) {
        res.status(400).json({ message: "Mật khẩu hiện tại không chính xác" });
        return;
      }

      if (newPassword && newPassword.length >= 6) {
        user.password = newPassword;
        await user.save();
        res.json({ message: "Đổi mật khẩu thành công" });
      } else {
        res.status(400).json({ message: "Mật khẩu mới phải có ít nhất 6 ký tự" });
      }
    } else {
      res.status(404).json({ message: "Không tìm thấy người dùng" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message || "Lỗi server khi cập nhật mật khẩu" });
  }
};

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
const getUsers = async (req, res) => {
  const users = await User.find({});
  res.status(200).json(users);
};


//   Private/Admin
const deleteUser = async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    if (user.isAdmin) {
      res.status(400).json({ message: "Không thể xóa tài khoản Admin" });
      return;
    }
    await User.deleteOne({ _id: user._id });
    res.json({ message: "Đã xóa người dùng thành công" });
  } else {
    res.status(404).json({ message: "Không tìm thấy người dùng" });
  }
};

// @desc    Update user role
// @route   PUT /api/users/:id/role
// @access  Private/SuperAdmin
const updateUserRole = async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    if (user._id.toString() === req.user._id.toString()) {
      res.status(400).json({ message: "Không thể tự đổi quyền của chính mình" });
      return;
    }
    user.role = req.body.role || user.role;
    user.isAdmin = (user.role === 'staff' || user.role === 'superAdmin');

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      role: updatedUser.role,
    });
  } else {
    res.status(404).json({ message: "Không tìm thấy người dùng" });
  }
};

const googleLogin = async (req, res) => {
  try {
    const { token } = req.body

    if (!token) {
      return res.status(400).json({ message: 'Token không được gửi' })
    }
    // Verify Google token
    const ticket = await googleClient.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID
    })

    const payload = ticket.getPayload()
    const { email, name } = payload

    // Tìm hoặc tạo user
    let user = await User.findOne({ email })

    if (!user) {
      user = await User.create({
        name: name || email.split('@')[0],
        email,
        password: 'google-' + Math.random().toString(36),
        role: 'user'
      })
    }

    // Tạo JWT token
    generateToken(res, user._id)

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' })
    })
  } catch (error) {
    console.error('Google login error:', error)
    res.status(400).json({ message: 'Google login failed' })
  }
}


export {
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
};
