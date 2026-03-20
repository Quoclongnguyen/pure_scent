import Category from "../models/categoryModel.js";

const createCategory = async (req, res) => {
    try {
        const { name, description } = req.body

        const category = await Category.create({
            name,
            description
        })

        res.status(201).json(category)
    } catch (error) {
        res.status(400).json({ message: "Lỗi không thể tạo danh mục (Có thẻ bị trùng tên)" })
    }
}

export { createCategory }