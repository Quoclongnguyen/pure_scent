import cloudinary from "../config/cloudinary.js";
import Product from "../models/productModel.js";


const getProducts = async (req, res) => {
    try {
        const pageSize = 8; // Số sản phẩm mỗi trang
        const page = Number(req.query.pageNumber) || 1;
        const count = await Product.countDocuments({});

        const products = await Product
            .find({})
            .populate("category brand", "name")
            .limit(pageSize)
            .skip(pageSize * (page - 1))


        res.json({
            products,
            page,
            pages: Math.ceil(count / pageSize),
            total: count
        })


    } catch (error) {
        console.error("Lỗi khi gọi getProducts", error)
        res.status(400).json({ message: "Lỗi khi lấy danh sách nước hoa" })
    }

};

const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id).populate("category brand", "name")
        if (product) {
            res.json(product)

        } else {
            res.status(404).json({ message: "Không tìm thấy mã sản phẩm này" });
        }
    } catch (error) {
        console.error("Lỗi khi gọi getProductById", error)
        res.status(400).json({ message: "Lỗi khi lấy danh sách nước hoa" })
    }
}

const createProduct = async (req, res) => {
    try {
        const { name, brand, category, description, images, variants, scentNotes, specs } = req.body
        const product = await Product.create({
            name, brand, category, description, images, variants, scentNotes, specs

        })
        res.status(201).json(product)
    } catch (error) {
        console.error("Lỗi khi gọi createProduct", error)
        res.status(400).json({ message: "Lỗi khi thêm danh sách nước hoa" })
    }
}

const updateProduct = async (req, res) => {
    try {
        const { name, brand, category, description, images, variants, scentNotes, specs } = req.body;

        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ message: "Sản phẩm không tồn tại" });
        }

        // Cập nhật từng trường dữ liệu. Nếu người dùng không gửi trường nào, giữ nguyên giá trị cũ.
        product.name = name || product.name;
        product.brand = brand || product.brand;
        product.category = category || product.category;
        product.description = description || product.description;
        product.variants = variants !== undefined ? variants : product.variants; // Xử lý riêng cho số 0
        product.scentNotes = scentNotes || product.scentNotes
        product.specs = specs || product.specs
        product.images = images || product.images;

        const updatedProduct = await product.save();
        res.status(201).json(updatedProduct);

    } catch (error) {
        console.error("Lỗi khi gọi updateProduct:", error.message);
        res.status(500).json({ message: "Lỗi Server: Không thể chỉnh sửa sản phẩm", error: error.message });
    }
}

const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
        if (!product) {
            return res.status(404).json({ message: "Lỗi không tìm thấy sản phẩm " })
        }
        //Xóa ảnh trên Cloudinary trước
        if (product.images && product.images.length > 0) {
            for (const imageUrl of product.images) {
                // Nếu là ảnh từ Cloudinary (có chứa 'res.cloudinary.com')
                if (imageUrl.includes('res.cloudinary.com')) {
                    // Logic tách public_id: Lấy đoạn sau 'upload/' và bỏ phần định dạng (.jpg, .png)
                    const parts = imageUrl.split('/')
                    const fileName = parts[parts.length - 1].split('.')[0]
                    const folderName = parts[parts.length - 2]
                    const publicId = `${folderName}/${fileName}`

                    await cloudinary.uploader.destroy(publicId)
                    console.log("Đã xóa ảnh trên Cloudinary:", publicId)
                }
            }
        }
        await Product.findByIdAndDelete(req.params.id)
        res.status(200).json({ message: "Xóa sản phẩm và ảnh thành công" })
    } catch (error) {
        console.error("Lỗi khi gọi deleteProduct", error)
        res.status(400).json({ message: "Lỗi khi deleted nước hoa", error: error.message })

    }
}


export { getProducts, createProduct, getProductById, updateProduct, deleteProduct };