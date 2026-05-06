import React, { useState, useEffect, useRef } from 'react'
import { Bell, Package, X, CheckCheck } from 'lucide-react'
import { Link } from 'react-router-dom'
import api from '../../utils/Axios.js'

const TYPE_CONFIG = {
    new_order: {
        icon: '🛍️',
        label: 'Đơn hàng mới',
    },
    payment_success: {
        icon: '💰',
        label: 'Thanh toán thành công',
    },
    default: {
        icon: '🔔',
        label: 'Thông báo',
    }
}

const timeAgo = (dateStr) => {
    const diff = Math.floor((Date.now() - new Date(dateStr)) / 1000)
    if (diff < 60) return `${diff} giây trước`
    if (diff < 3600) return `${Math.floor(diff / 60)} phút trước`
    if (diff < 86400) return `${Math.floor(diff / 3600)} giờ trước`
    return `${Math.floor(diff / 86400)} ngày trước`
}

const NotificationBell = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [notifications, setNotifications] = useState([])
    const [unreadCount, setUnreadCount] = useState(0)
    const dropdownRef = useRef(null)

    // Fetch unread count (polling mỗi 30 giây)
    const fetchUnreadCount = async () => {
        try {
            const res = await api.get('/api/notifications/unread/count')
            setUnreadCount(res.data.count)
        } catch (error) {
            // Không làm gì nếu lỗi để tránh spam console
        }
    }

    // Fetch danh sách thông báo (khi mở dropdown)
    const fetchNotifications = async () => {
        try {
            const res = await api.get('/api/notifications')
            setNotifications(res.data)
        } catch (error) {
            console.error('Lỗi khi lấy thông báo', error)
        }
    }

    // Polling mỗi 30 giây
    useEffect(() => {
        fetchUnreadCount()
        const interval = setInterval(fetchUnreadCount, 30000)
        return () => clearInterval(interval)
    }, [])

    // Khi mở dropdown, fetch full danh sách
    useEffect(() => {
        if (isOpen) {
            fetchNotifications()
        }
    }, [isOpen])

    // Đóng khi click ra ngoài
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setIsOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    const handleMarkAsRead = async (id) => {
        try {
            await api.put(`/api/notifications/${id}/read`)
            setNotifications(prev => prev.map(n => n._id === id ? { ...n, isRead: true } : n))
            setUnreadCount(prev => Math.max(0, prev - 1))
        } catch (error) {
            console.error('Lỗi đánh dấu đã đọc', error)
        }
    }

    const handleMarkAllAsRead = async () => {
        try {
            await api.put('/api/notifications/read-all')
            setNotifications(prev => prev.map(n => ({ ...n, isRead: true })))
            setUnreadCount(0)
        } catch (error) {
            console.error('Lỗi đánh dấu tất cả đã đọc', error)
        }
    }

    return (
        <div className="relative" ref={dropdownRef}>
            {/* Nút quả chuông */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="relative text-gray-400 hover:text-black transition-colors cursor-pointer"
            >
                <Bell size={20} strokeWidth={1.5} />
                {unreadCount > 0 && (
                    <span className="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center px-1 border-2 border-white animate-pulse">
                        {unreadCount > 9 ? '9+' : unreadCount}
                    </span>
                )}
            </button>

            {/* Dropdown */}
            {isOpen && (
                <div className="absolute right-0 top-full mt-4 w-80 bg-white border border-gray-100 shadow-[0_20px_60px_rgba(0,0,0,0.1)] z-[200] rounded-sm">

                    {/* Header */}
                    <div className="flex items-center justify-between px-5 py-4 border-b border-gray-50">
                        <div>
                            <p className="text-[11px] font-bold uppercase tracking-widest">Thông báo</p>
                            {unreadCount > 0 && (
                                <p className="text-[9px] text-gray-400 mt-0.5">{unreadCount} chưa đọc</p>
                            )}
                        </div>
                        {unreadCount > 0 && (
                            <button
                                onClick={handleMarkAllAsRead}
                                className="flex items-center gap-1 text-[9px] uppercase tracking-widest text-gray-400 hover:text-black transition-colors font-bold"
                            >
                                <CheckCheck size={12} />
                                Đọc tất cả
                            </button>
                        )}
                    </div>

                    {/* Danh sách thông báo */}
                    <div className="max-h-[360px] overflow-y-auto">
                        {notifications.length === 0 ? (
                            <div className="py-12 text-center">
                                <Bell size={28} strokeWidth={1} className="mx-auto text-gray-200 mb-3" />
                                <p className="text-[10px] uppercase tracking-widest text-gray-300 font-bold">Chưa có thông báo</p>
                            </div>
                        ) : (
                            notifications.map(notification => {
                                const config = TYPE_CONFIG[notification.type] || TYPE_CONFIG.default
                                return (
                                    <div
                                        key={notification._id}
                                        className={`flex items-start gap-3 px-5 py-4 border-b border-gray-50 last:border-0 transition-colors ${!notification.isRead ? 'bg-blue-50/40' : 'hover:bg-gray-50'}`}
                                    >
                                        <span className="text-lg flex-shrink-0 mt-0.5">{config.icon}</span>
                                        <div className="flex-1 min-w-0">
                                            <p className={`text-[10px] font-bold uppercase tracking-widest leading-tight ${!notification.isRead ? 'text-black' : 'text-gray-500'}`}>
                                                {notification.message}
                                            </p>
                                            <p className="text-[9px] text-gray-400 mt-1">{timeAgo(notification.createdAt)}</p>
                                        </div>
                                        {!notification.isRead && (
                                            <button
                                                onClick={() => handleMarkAsRead(notification._id)}
                                                className="flex-shrink-0 text-gray-300 hover:text-gray-600 transition-colors mt-0.5"
                                                title="Đánh dấu đã đọc"
                                            >
                                                <X size={14} />
                                            </button>
                                        )}
                                    </div>
                                )
                            })
                        )}
                    </div>

                    {/* Footer */}
                    <div className="border-t border-gray-50">
                        <Link
                            to="/admin/orders"
                            onClick={() => setIsOpen(false)}
                            className="block py-3 text-center text-[9px] uppercase tracking-widest font-bold text-gray-400 hover:text-black hover:bg-gray-50 transition-colors"
                        >
                            Xem tất cả đơn hàng →
                        </Link>
                    </div>
                </div>
            )}
        </div>
    )
}

export default NotificationBell
