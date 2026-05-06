import Notification from "../models/notificationModel.js";


export const getNotifications = async (req, res) => {
    try {
        const notifications = await Notification.find({}).sort({ createdAt: -1 }).limit(20);
        res.json(notifications);
    } catch (error) {
        res.status(500).json({ message: "Lỗi khi lấy thông báo", error: error.message });
    }
};

// Đếm số thông báo chưa đọc
export const getUnreadCount = async (req, res) => {
    try {
        const count = await Notification.countDocuments({ isRead: false });
        res.json({ count });
    } catch (error) {
        res.status(500).json({ message: "Lỗi server", error: error.message });
    }
};

// Đánh dấu 1 thông báo là đã đọc

export const markAsRead = async (req, res) => {
    try {
        const notification = await Notification.findById(req.params.id);
        if (notification) {
            notification.isRead = true;
            await notification.save();
            res.json({ message: "Đã đánh dấu đọc", notification });
        } else {
            res.status(404).json({ message: "Không tìm thấy thông báo" });
        }
    } catch (error) {
        res.status(500).json({ message: "Lỗi server", error: error.message });
    }
};

// Đánh dấu tất cả đã đọc

export const markAllAsRead = async (req, res) => {
    try {
        await Notification.updateMany({ isRead: false }, { isRead: true });
        res.json({ message: "Đã đánh dấu tất cả là đã đọc" });
    } catch (error) {
        res.status(500).json({ message: "Lỗi server", error: error.message });
    }
};


export const deleteNotification = async (req, res) => {
    try {
        await Notification.findByIdAndDelete(req.params.id)
        res.json({ message: 'Notification deleted' })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const deleteAllRead = async (req, res) => {
    try {
        const result = await Notification.deleteMany({ isRead: true })
        res.json({
            message: `Deleted ${result.deletedCount} notifications`,
            deletedCount: result.deletedCount
        })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}