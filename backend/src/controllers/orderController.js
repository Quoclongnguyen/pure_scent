import Order from "../models/orderModel.js";
import Cart from "../models/cartModel.js";
import Notification from "../models/notificationModel.js";

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

            // Tạo thông báo cho Admin
            await Notification.create({
                message: `Đơn hàng mới từ ${req.user.name}`,
                type: 'new_order',
                link: '/admin/orderlist',
            });

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

// Lấy tất cả đơn hàng (Chỉ dành cho Admin)
export const getOrders = async (req, res) => {
    try {
        const orders = await Order.find({}).populate("user", "id name").sort({ createdAt: -1 });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: "Lỗi server", error: error.message });
    }
};

// Cập nhật trạng thái đã thanh toán (Chỉ dành cho Admin)
export const updateOrderToPaid = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (order) {
            order.isPaid = true;
            order.paidAt = Date.now();
            // Nếu bạn muốn lưu thêm thông tin từ cổng thanh toán thì thêm vào đây
            // order.paymentResult = { id: req.body.id, status: req.body.status, ... }
            const updatedOrder = await order.save();
            res.json(updatedOrder);
        } else {
            res.status(404).json({ message: "Không tìm thấy đơn hàng" });
        }
    } catch (error) {
        res.status(500).json({ message: "Lỗi server", error: error.message });
    }
};

//Cập nhật trạng thái đã giao
export const updateOrderToDelivered = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (order) {
            order.isDelivered = true;
            order.deliveredAt = Date.now();
            order.status = "Đã giao hàng"; // Cập nhật text trạng thái
            const updatedOrder = await order.save();
            res.json(updatedOrder);
        } else {
            res.status(404).json({ message: "Không tìm thấy đơn hàng" });
        }
    } catch (error) {
        res.status(500).json({ message: "Lỗi server", error: error.message });
    }
};