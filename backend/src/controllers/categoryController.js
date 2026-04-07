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

const getCategory = async (req, res) => {
    try {
        const category = await Category.find({}).sort({ createdAt: -1 }) // mới nhất lên đầu
        res.status(201).json(category)
    } catch (error) {
        res.status(500).json({ message: "Lỗi khi lấy danh sách danh mục" });
    }
}

const updateCategory = async (req, res) => {
    try {
        const { name, description } = req.body
        const category = await Category.findById(req.params.id)
        if (category) {
            category.name = name || category.name
            category.description = description || category.description

            const updatedCategory = await category.save()
            res.status(200).json(updatedCategory)

        } else {
            res.status(404).json({ message: "Không tìm thấy danh mục" })
        }
    } catch (error) {
        res.status(400).json({ message: "Lỗi khi cập nhật danh mục" })
    }
}

const deleteCategory = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id)
        if (category) {
            await Category.deleteOne({ _id: category._id })
            res.status(200).json({ message: "Đã xóa danh mục thành công" })
        } else {
            res.status(404).json({ message: "Lỗi không tìm thấy danh mục " })
        }

    } catch (error) {
        res.status(500).json({ message: "Lỗi khi xóa danh mục" })
    }
}
export { createCategory, getCategory, updateCategory, deleteCategory }