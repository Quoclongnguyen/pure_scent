import mongoose from "mongoose";

const notificationSchema = mongoose.Schema(
    {
        message: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            required: true, // VD: 'new_order', 'payment_success'
        },
        isRead: {
            type: Boolean,
            required: true,
            default: false,
        },
        link: {
            type: String, // Đường dẫn tới đơn hàng VD: '/admin/orderlist'
        },
    },
    {
        timestamps: true,
    }
);

const Notification = mongoose.model("Notification", notificationSchema);

export default Notification;
