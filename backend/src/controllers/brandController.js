import Brand from "../models/brandModel.js"

export const getBrands = async (req, res) => {
    try {
        const brands = await Brand.find({})
        res.json(brands);
    } catch (error) {
        res.status(500).json({ message: "Lỗi khi lấy danh sách thương hiệu" })
    }
}


export const createBrand = async (req, res) => {
    console.log("Dữ liệu nhận được:", req.body)
    const { name, description, origin } = req.body

    try {
        const brandExists = await Brand.findOne({ name })
        if (brandExists) {
            return res.status(400).json({ message: "Thương hiệu đã tồn tại" })
        }

        const brand = await Brand.create({
            name,
            description,
            origin,
        })

        res.status(201).json(brand)
    } catch (error) {
        res.status(500).json({ message: "Lỗi khi tạo thương hiệu" })
    }
}


