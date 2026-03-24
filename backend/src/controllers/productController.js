import Product from "../models/productModel.js";


const getProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.json(products);
    } catch (error) {
        console.error("Lỗi khi gọi getProducts", error)
        res.status(400).json({ message: "Lỗi khi lấy danh sách nước hoa" })
    }

};

const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
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
        const { name, brand, category, description, price, stock, images } = req.body
        const product = await Product.create({
            name, brand, category, description, price, stock, images

        })
        res.status(201).json(product)
    } catch (error) {
        console.error("Lỗi khi gọi createProduct", error)
        res.status(400).json({ message: "Lỗi khi thêm danh sách nước hoa" })
    }
}

const updateProduct = async (req, res) => {
    try {
        const { name, brand, category, description, price, stock, images } = req.body;

        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ message: "Sản phẩm không tồn tại" });
        }

        // Cập nhật từng trường dữ liệu. Nếu người dùng không gửi trường nào, giữ nguyên giá trị cũ.
        product.name = name || product.name;
        product.brand = brand || product.brand;
        product.category = category || product.category;
        product.description = description || product.description;
        product.price = price !== undefined ? price : product.price; // Xử lý riêng cho số 0
        product.stock = stock !== undefined ? stock : product.stock;
        product.images = images || product.images;

        const updatedProduct = await product.save();
        res.status(200).json(updatedProduct);

    } catch (error) {
        console.error("Lỗi khi gọi updateProduct:", error.message);
        res.status(500).json({ message: "Lỗi Server: Không thể chỉnh sửa sản phẩm", error: error.message });
    }
}

const deleteProduct = async (req, res) => {
    try {
        const deleted = await Product.findByIdAndDelete(req.params.id)
        if (deleted) {
            res.status(200).json(deleted)
        } else {
            res.status(404).json({ message: "Lỗi khi xóa nước hoa" })

        }
    } catch (error) {
        console.error("Lỗi khi gọi deleteProduct", error)
        res.status(400).json({ message: "Lỗi khi deleted nước hoa" })

    }
}


export { getProducts, createProduct, getProductById, updateProduct, deleteProduct };