import Product from "../models/productModel.js";


const getProducts = async (req, res) => {
    const products = await Product.find({});
    res.json(products);
};

const createProduct = async (req, res) => {
    try {
        const { name, brand, category, description, price, stock, images } = req.body
        const product = await Product.create({
            name, brand, category, description, price, stock, images

        })
        res.status(201).json(product)
    } catch (error) {
        res.status(400).json({ message: "Lỗi khi thêm danh sách nước hoa" })
    }
}

export { getProducts, createProduct };