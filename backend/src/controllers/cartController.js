
import Cart from "../models/cartModel.js"

export const getCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user._id });
        if (cart) {
            res.json(cart);
        } else {
            res.json({ cartItems: [] });
        }// Nếu có thì trả về cả giỏ. Nếu chưa có (khách mới) thì trả về một mảng trống
    } catch (error) {
        res.status(500).json({ message: "Lỗi khi lấy giỏ hàng", error: error.message });
    }
};


export const addItemToCart = async (req, res) => {
    const { product, name, image, price, size, quantity } = req.body;
    const qty = Number(quantity) || 1; // Ép kiểu số an toàn
    const numPrice = Number(price) || 0; // Định nghĩa numPrice mới

    try {
        let cart = await Cart.findOne({ user: req.user._id });
        if (cart) {
            // Kiểm tra xem sản phẩm với cùng Size đã có trong giỏ chưa
            const itemIndex = cart.cartItems.findIndex((item) =>
                item.product.toString() === product && item.size === size
            );
            if (itemIndex > -1) {
                // Nếu có rồi thì tăng số lượng
                cart.cartItems[itemIndex].quantity = (Number(cart.cartItems[itemIndex].quantity) || 0) + qty;
            } else {
                // Nếu chưa có thì thêm mới vào mảng
                // Chỉ thêm vào danh sách hiện tại
                cart.cartItems.push({
                    product,
                    name,
                    image,
                    price: Number(price),
                    size,
                    quantity: qty
                });
            }
            await cart.save();
            res.status(200).json(cart);
        } else {
            // Nếu User chưa từng có giỏ hàng, tạo mới luôn
            const newCart = await Cart.create({
                user: req.user._id,
                cartItems: [{ product, name, image, price: numPrice, size, quantity: qty }]
            });
            res.status(201).json(newCart);
        }
    } catch (error) {
        res.status(500).json({ message: "Lỗi khi thêm vào giỏ hàng", error: error.message });
    }
};


export const updateCartItem = async (req, res) => {
    const { product, size, quantity } = req.body;
    try {
        const cart = await Cart.findOne({ user: req.user._id });
        if (cart) {
            const itemIndex = cart.cartItems.findIndex(
                (item) => item.product.toString() === product && item.size === size
            );
            if (itemIndex > -1) {
                cart.cartItems[itemIndex].quantity = Number(quantity) || 1;
                await cart.save();
                res.json(cart);
            } else {
                res.status(404).json({ message: "Không tìm thấy sản phẩm trong giỏ hàng" });
            }
        }
    } catch (error) {
        res.status(500).json({ message: "Lỗi khi cập nhật giỏ hàng", error: error.message });
    }
};

export const removeFromCart = async (req, res) => {
    const { product, size } = req.body;
    try {
        const cart = await Cart.findOne({ user: req.user._id });
        if (cart) {
            cart.cartItems = cart.cartItems.filter(
                (item) => !(item.product.toString() === product && item.size === size)
            );
            await cart.save();
            res.json(cart);
        }
    } catch (error) {
        res.status(500).json({ message: "Lỗi khi xóa sản phẩm khỏi giỏ hàng", error: error.message });
    }
};


export const syncCart = async (req, res) => {
    const { localItems } = req.body;
    if (!localItems || !Array.isArray(localItems)) {
        return res.status(400).json({ message: "Dữ liệu giõ hàng không hợp lệ!" })
    }
    try {
        let cart = await Cart.findOne({ user: req.user._id });
        if (!cart) {
            cart = new Cart({ user: req.user._id, cartItems: [] });
        }
        // Logic Merge Duyệt qua các item từ Local
        localItems.forEach((localItem) => {
            const productId = localItem.id || localItem.product
            const qty = Number(localItem.quantity) || 1 // Ép kiểu số, nếu lỗi thì mặc định là 1
            const itemIndex = cart.cartItems.findIndex((dbItem) =>
                dbItem.product.toString() === productId && dbItem.size === localItem.size
            );
            if (itemIndex > -1) {
                // Nếu trùng thì lấy số lượng lớn nhất 
                cart.cartItems[itemIndex].quantity = (Number(cart.cartItems[itemIndex].quantity) || 0) + qty
            } else {
                // Nếu mới thì thêm vào (lưu ý chuyển id -> product)
                cart.cartItems.push({
                    product: productId,
                    name: localItem.name,
                    image: localItem.image,
                    price: Number(localItem.price),
                    size: localItem.size,
                    quantity: qty
                });
            }
        });
        await cart.save();
        res.json(cart);
    } catch (error) {
        res.status(500).json({ message: "Lỗi khi đồng bộ giỏ hàng", error: error.message });
    }
};