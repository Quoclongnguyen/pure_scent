import path from "path"
import express from "express"
import multer from "multer"

const router = express.Router()

const storage = multer.diskStorage({ //Lưu file vào ổ cứng
    destination(req, file, cb) {
        cb(null, 'uploads/')
    },
    filename(req, file, cb) {
        cb(
            null,
            `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
        )
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
    storage,
    fileFilter: function (req, file, cb) {
        checkFileTypes(file, cb)
    }
})

// API xử lý upload nhiều ảnh
router.post('/', upload.array('images', 5), (req, res) => {
    if (!req.files || req.files.length === 0) {
        return res.status(400).send({ message: 'Không có file nào được chọn' })
    }

    // Trả về mảng các đường dẫn ảnh đã lưu
    const paths = req.files.map((file) =>
        `/${file.path.replace(/\\/g, "/")}`)
    res.send(paths)
})



export default router