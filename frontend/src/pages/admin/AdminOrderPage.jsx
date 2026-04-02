import { Download, Eye } from 'lucide-react'
import React, { useState } from 'react'

const AdminOrderPage = () => {
    const [orders, setOrders] = useState([
        { id: "#PS1001", customer: "Nguyễn Văn A", date: "2024-03-25", total: 5500000, status: "pending" },
        { id: "#PS1002", customer: "Trần Thị B", date: "2024-03-24", total: 10700000, status: "delivered" },
        { id: "#PS1003", customer: "Lê Văn C", date: "2024-03-23", total: 5200000, status: "cancelled" },
    ])
    const renderStatusBadge = (status) => {
        const styles = {
            pending: "bg-amber-50 text-amber-600 border-amber-100",
            delivered: "bg-emerald-50 text-emerald-600 border-emerald-100",
            cancelled: "bg-rose-50 text-rose-600 border-rose-100",
        }

        const labels = {
            pending: "Đang chờ",
            delivered: "Đã giao",
            cancelled: "Đã hủy"
        }
        return (
            <span className={`px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider border ${styles[status]}`}>
                {labels[status]}
            </span>
        )
    }
    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* HEADER */}
            <div className="bg-white p-6 border border-gray-100 shadow-sm flex justify-between items-center">
                <div>
                    <h1 className="text-xl font-serif tracking-widest ">Quản lý Đơn hàng</h1>
                    <p className="text-[12px] text-gray-400 uppercase tracking-widest mt-1">Theo dõi và cập nhật trạng thái đơn hàng</p>
                </div>
                <button className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-black transition-all">
                    <Download size={16} /> Xuất báo cáo
                </button>
            </div>


            <div className="bg-white border border-gray-100 shadow-sm overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-gray-50 border-b border-gray-100">
                        <tr>
                            <th className="p-6 text-[10px] uppercase tracking-widest font-bold text-gray-400">Mã đơn</th>
                            <th className="p-6 text-[10px] uppercase tracking-widest font-bold text-gray-400">Khách hàng</th>
                            <th className="p-6 text-[10px] uppercase tracking-widest font-bold text-gray-400">Ngày đặt</th>
                            <th className="p-6 text-[10px] uppercase tracking-widest font-bold text-gray-400">Tổng tiền</th>
                            <th className="p-6 text-[10px] uppercase tracking-widest font-bold text-gray-400 text-center">Trạng thái</th>
                            <th className="p-6 text-[10px] uppercase tracking-widest font-bold text-gray-400 text-right">Chi tiết</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {orders.map(order => (
                            <tr key={order.id} className="hover:bg-gray-50/50 transition-colors">
                                <td className="p-6 text-sm font-serif font-bold">{order.id}</td>
                                <td className="p-6 text-sm ">{order.customer}</td>
                                <td className="p-6 text-xs text-gray-400">{order.date}</td>
                                <td className="p-6 text-sm font-bold">{order.total.toLocaleString()}đ</td>
                                <td className="p-6 text-center">{renderStatusBadge(order.status)}</td>
                                <td className="p-6 text-right">
                                    <button className="text-gray-400 hover:text-black transition-colors">
                                        <Eye size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}



export default AdminOrderPage