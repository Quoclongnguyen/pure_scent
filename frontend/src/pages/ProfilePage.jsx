import React, { useContext, useEffect, useState } from 'react'
import AuthContext from '../context/AuthContext'
import { Navigate, Link } from 'react-router-dom'
import api from '../utils/Axios'
import { toast } from 'sonner'
import { User, Package, Eye, CheckCircle2, Clock } from 'lucide-react'

const ProfilePage = () => {
    const { userInfo, logout } = useContext(AuthContext)
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchMyOrders = async () => {
            try {
                const { data } = await api.get('/api/orders/myorders')
                setOrders(data)
                setLoading(false)
            } catch (error) {
                toast.error("Không thể tải lịch sử đơn hàng")
                setLoading(false)
            }
        }

        if (userInfo) {
            fetchMyOrders()
        }
    }, [userInfo])

    if (!userInfo) {
        return <Navigate to="/login" />
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
        <main className="min-h-screen bg-gray-50 pt-24 pb-20 px-4 md:px-8">
            <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
                {/* SIDEBAR INFO */}
                <div className="md:col-span-1 space-y-6">
                    <div className="bg-white p-6 shadow-sm border border-gray-100 text-center">
                        <div className="w-20 h-20 bg-black text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-serif">
                            {userInfo.name.charAt(0).toUpperCase()}
                        </div>
                        <h2 className="font-bold text-lg">{userInfo.name}</h2>
                        <p className="text-xs text-gray-500 mb-6">{userInfo.email}</p>

                        <div className="border-t border-gray-100 pt-6">
                            <button
                                onClick={logout}
                                className="w-full text-center text-[10px] uppercase tracking-widest text-red-500 hover:text-red-700 hover:bg-red-50 py-3 transition-colors border border-red-100"
                            >
                                Đăng xuất
                            </button>
                        </div>
                    </div>
                </div>

                {/* MAIN CONTENT */}
                <div className="md:col-span-3 space-y-6">
                    <div className="bg-white p-6 md:p-8 shadow-sm border border-gray-100">
                        <div className="flex items-center gap-3 mb-8 pb-4 border-b border-gray-100">
                            <Package className="text-gray-400" />
                            <h2 className="text-xl font-serif tracking-widest uppercase">Lịch sử đơn hàng</h2>
                        </div>

                        {loading ? (
                            <div className="text-center py-10 italic font-serif text-gray-400">Đang tải lịch sử...</div>
                        ) : orders.length === 0 ? (
                            <div className="text-center py-16 space-y-6">
                                <Package className="w-16 h-16 text-gray-200 mx-auto" />
                                <p className="italic font-serif text-gray-400 text-lg">Bạn chưa có đơn hàng nào.</p>
                                <p className="inline-block bg-black text-white px-8 py-4 text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-gray-800 transition-all shadow-lg">   <Link to="/shop" >
                                    Bắt đầu mua sắm ngay
                                </Link></p>

                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-sm whitespace-nowrap">
                                    <thead className="text-[10px] uppercase tracking-widest text-gray-400 border-b border-gray-100 bg-gray-50/50">
                                        <tr>
                                            <th className="p-4 font-bold">Mã đơn</th>
                                            <th className="p-4 font-bold">Ngày đặt</th>
                                            <th className="p-4 font-bold text-right">Tổng tiền</th>
                                            <th className="p-4 font-bold text-center">Trạng thái</th>
                                            <th className="p-4 font-bold text-right">Chi tiết</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-50">
                                        {orders.map((order) => (
                                            <tr key={order._id} className="hover:bg-gray-50/50 transition-colors">
                                                <td className="p-4 font-mono font-bold">#{order._id.slice(-6).toUpperCase()}</td>
                                                <td className="p-4 text-gray-500">{new Date(order.createdAt).toLocaleDateString('vi-VN')}</td>
                                                <td className="p-4 font-bold text-right">{order.totalPrice.toLocaleString()}đ</td>
                                                <td className="p-4 text-center">{renderStatusBadge(order)}</td>
                                                <td className="p-4 text-right">
                                                    <Link to={`/order/${order._id}`} className="inline-flex items-center gap-2 text-[10px] uppercase tracking-widest text-gray-400 hover:text-black transition-colors bg-white border border-gray-200 px-3 py-1.5 shadow-sm">
                                                        <Eye size={14} /> Xem
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </main>
    )
}

export default ProfilePage
