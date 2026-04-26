import Order from "../models/orderModel.js";
import Cart from "../models/cartModel.js";

export const addOrderItems = async (req, res) => {
    const {
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        shippingPrice,
        totalPrice,
    } = req.body;

    if (orderItems && orderItems.length === 0) {
        res.status(400).json({ message: "Không có sản phẩm trong đơn hàng" });
        return;
    } else {
        try {
            const order = new Order({
                orderItems: orderItems.map((x) => ({
                    ...x,
                    product: x.id, // Chuyển id từ frontend thành product ID cho backend
                    _id: undefined
                })),
                user: req.user._id,
                shippingAddress,
                paymentMethod,
                itemsPrice,
                shippingPrice,
                totalPrice,
            });

            const createdOrder = await order.save();

            // Sau khi đặt hàng thành công, xóa sạch giỏ hàng của User
            await Cart.findOneAndDelete({ user: req.user._id });

            res.status(201).json(createdOrder);
        } catch (error) {
            res.status(500).json({ message: "Lỗi khi tạo đơn hàng", error: error.message });
        }
    }
};

export const getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate(
            "user",
            "name email"
        );

        if (order) {
            res.json(order);
        } else {
            res.status(404).json({ message: "Không tìm thấy đơn hàng" });
        }
    } catch (error) {
        res.status(500).json({ message: "Lỗi server", error: error.message });
    }
};


export const getMyOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: "Lỗi server", error: error.message });
    }
};
