import { Download, Eye, CheckCircle, Truck, RefreshCw } from 'lucide-react'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import api from '../../utils/Axios.js'

import { toast } from 'sonner'

const AdminOrderPage = () => {
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)

    const fetchOrders = async () => {
        try {
            setLoading(true)
            const { data } = await api.get('/api/orders')
            setOrders(data)
            setLoading(false)
        } catch (error) {
            toast.error("Không thể tải danh sách đơn hàng")
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchOrders()
    }, [])

    const handleMarkAsPaid = async (id) => {
        if (!window.confirm("Bạn xác nhận đơn hàng này đã được thanh toán?")) return;
        try {
            await api.put(`/api/orders/${id}/pay`)
            toast.success("Đã cập nhật trạng thái: Đã thanh toán")
            fetchOrders()
        } catch (error) {
            toast.error("Lỗi khi cập nhật thanh toán")
        }
    }

    const handleMarkAsDelivered = async (id) => {
        if (!window.confirm("Bạn xác nhận đơn hàng này đã được giao cho khách?")) return;
        try {
            await api.put(`/api/orders/${id}/deliver`)
            toast.success("Đã cập nhật trạng thái: Đã giao hàng")
            fetchOrders()
        } catch (error) {
            toast.error("Lỗi khi cập nhật giao hàng")
        }
    }

    const renderStatusBadge = (order) => {
        if (order.isDelivered) {
            return <span className="px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider border bg-emerald-50 text-emerald-600 border-emerald-100">Đã giao</span>
        }
        if (order.isPaid) {
            return <span className="px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider border bg-blue-50 text-blue-600 border-blue-100">Đã thanh toán</span>
        }
        return <span className="px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider border bg-amber-50 text-amber-600 border-amber-100">Chờ thanh toán</span>
    }

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* HEADER */}
            <div className="bg-white p-6 border border-gray-100 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-xl font-serif tracking-widest uppercase">Quản lý Đơn hàng</h1>
                    <p className="text-[10px] text-gray-400 uppercase tracking-widest mt-1">Kiểm duyệt và cập nhật trạng thái giao dịch</p>
                </div>
                <div className="flex items-center gap-4">
                    <button onClick={fetchOrders} className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-black transition-all">
                        <RefreshCw size={14} className={loading ? "animate-spin" : ""} /> Làm mới
                    </button>
                    <button className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-white bg-black px-4 py-2 hover:bg-gray-800 transition-all">
                        <Download size={14} /> Xuất dữ liệu
                    </button>
                </div>
            </div>

            <div className="bg-white border border-gray-100 shadow-sm overflow-x-auto">
                {loading ? (
                    <div className="p-10 text-center text-sm font-serif italic text-gray-400">Đang tải dữ liệu...</div>
                ) : orders.length === 0 ? (
                    <div className="p-10 text-center text-sm font-serif italic text-gray-400">Chưa có đơn hàng nào.</div>
                ) : (
                    <table className="w-full text-left border-collapse min-w-[800px]">
                        <thead className="bg-gray-50 border-b border-gray-100">
                            <tr>
                                <th className="p-4 text-[10px] uppercase tracking-widest font-bold text-gray-400">Mã đơn</th>
                                <th className="p-4 text-[10px] uppercase tracking-widest font-bold text-gray-400">Khách hàng</th>
                                <th className="p-4 text-[10px] uppercase tracking-widest font-bold text-gray-400">Ngày đặt</th>
                                <th className="p-4 text-[10px] uppercase tracking-widest font-bold text-gray-400 text-right">Tổng tiền</th>
                                <th className="p-4 text-[10px] uppercase tracking-widest font-bold text-gray-400 text-center">Trạng thái</th>
                                <th className="p-4 text-[10px] uppercase tracking-widest font-bold text-gray-400 text-center">Thao tác Admin</th>
                                <th className="p-4 text-[10px] uppercase tracking-widest font-bold text-gray-400 text-right">Chi tiết</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {orders.map(order => (
                                <tr key={order._id} className="hover:bg-gray-50/50 transition-colors">
                                    <td className="p-4 text-xs font-mono font-bold uppercase">#{order._id.slice(-6)}</td>
                                    <td className="p-4 text-sm">
                                        <p className="font-bold">{order.shippingAddress?.fullname || "Khách vô danh"}</p>
                                        <p className="text-[10px] text-gray-400 mt-1">{order.paymentMethod}</p>
                                    </td>
                                    <td className="p-4 text-xs text-gray-500">
                                        {new Date(order.createdAt).toLocaleDateString('vi-VN')}
                                    </td>
                                    <td className="p-4 text-sm font-bold text-right">{order.totalPrice.toLocaleString()}đ</td>
                                    <td className="p-4 text-center">{renderStatusBadge(order)}</td>

                                    <td className="p-4 text-center">
                                        <div className="flex items-center justify-center gap-2">
                                            {!order.isPaid && (
                                                <button
                                                    onClick={() => handleMarkAsPaid(order._id)}
                                                    className="px-3 py-1 bg-black text-white text-[9px] uppercase tracking-widest hover:bg-gray-800 transition-colors"
                                                    title="Xác nhận đã nhận được tiền"
                                                >
                                                    <CheckCircle size={12} className="inline mr-1 mb-0.5" /> Đã thu tiền
                                                </button>
                                            )}
                                            {order.isPaid && !order.isDelivered && (
                                                <button
                                                    onClick={() => handleMarkAsDelivered(order._id)}
                                                    className="px-3 py-1 border border-black text-black text-[9px] uppercase tracking-widest hover:bg-black hover:text-white transition-colors"
                                                    title="Xác nhận đã giao hàng thành công"
                                                >
                                                    <Truck size={12} className="inline mr-1 mb-0.5" /> Giao hàng
                                                </button>
                                            )}
                                            {order.isDelivered && (
                                                <span className="text-[9px] uppercase tracking-widest text-gray-400 italic">Hoàn tất</span>
                                            )}
                                        </div>
                                    </td>

                                    <td className="p-4 text-right">
                                        <Link to={`/order/${order._id}`} target="_blank" className="text-gray-400 hover:text-black transition-colors inline-block">
                                            <Eye size={18} />
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    )
}

export default AdminOrderPage