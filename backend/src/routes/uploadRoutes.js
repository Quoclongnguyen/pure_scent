import path from "path"
import express from "express"
import multer from "multer"

import { CloudinaryStorage } from "multer-storage-cloudinary"
import cloudinary from "../config/cloudinary.js";

const router = express.Router()


const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "pure_scent_products", // Thư mục lưu trên Cloudinary
        allowed_formats: ["jpg", "png", "jpeg", "webp"],
        public_id: (req, file) => {
            // tạo tên file duy nhất

            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9) // công thức tạo mã định danh duy nhất 
            return `product-${uniqueSuffix}`
        }
    }
})

function checkFileTypes(file, cb) {
    const filetypes = /jpg|jpeg|png|webp/ // chỉ cho phép ảnh định dạng
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
    const mimetype = filetypes.test(file.mimetype)
    if (extname && mimetype) {
        return cb(null, true)

    } else {
        cb('Chỉ chấp nhận định dạng ảnh (jpg, jpeg, png, webp)!')
    }
}

const upload = multer({
    storage: storage
})

// API xử lý upload nhiều ảnh
router.post('/', (req, res, next) => {
    upload.array('images', 5)(req, res, (err) => {
        if (err) {
            console.error("Lỗi liên quan đến CLOUDINARY/MULTER:", err)
            return res.status(500).json({ message: err.message || "Lỗi upload ảnh" })
        }
        if (!req.files || req.files.length === 0) {
            return res.status(400).send({ message: 'Không có file nào được chọn' })
        }

        // Cloudinary sẽ trả về full URL trong trường path(hoặc secure_url)
        const paths = req.files.map((file) => file.path)
        console.log("Upload thành công:", paths)
        return res.status(200).send(paths)
    })



})



export default router