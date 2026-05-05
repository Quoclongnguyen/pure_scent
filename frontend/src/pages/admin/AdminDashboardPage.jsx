import React, { useState, useEffect } from 'react'
import { DollarSign, Package, ShoppingCart, Users, ArrowUpRight, Clock, CheckCircle2, XCircle } from 'lucide-react'
import api from '../../utils/Axios.js'
import { toast } from 'sonner'
import { Link } from 'react-router-dom'

const AdminDashboardPage = () => {
    const [stats, setStats] = useState({
        revenue: 0,
        totalOrders: 0,
        totalProducts: 0,
        totalCustomers: 0
    })
    const [recentOrders, setRecentOrders] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                setLoading(true)
                const [ordersRes, productsRes, usersRes] = await Promise.all([
                    api.get('/api/orders'),
                    api.get('/api/products'),
                    api.get('/api/users')
                ])

                const ordersData = ordersRes.data
                const productsData = productsRes.data
                const usersData = usersRes.data

                // Tính tổng doanh thu (chỉ tính những đơn đã thanh toán)
                const revenue = ordersData
                    .filter(order => order.isPaid)
                    .reduce((sum, order) => sum + order.totalPrice, 0)

                setStats({
                    revenue,
                    totalOrders: ordersData.length,
                    totalProducts: productsData.length,
                    totalCustomers: usersData.length
                })

                // Lấy 5 đơn hàng mới nhất
                setRecentOrders(ordersData.slice(0, 5))
                setLoading(false)
            } catch (error) {
                console.error('Error fetching dashboard data:', error)
                toast.error("Không thể tải dữ liệu thống kê")
                setLoading(false)
            }
        }

        fetchDashboardData()
    }, [])

    if (loading) {
        return <div className="p-10 text-center font-serif italic text-gray-400">
            Đang tải dữ liệu tổng quan...</div>
    }

    const StatCard = ({ title, value, icon: Icon, link }) => (
        <div className="bg-white p-6 border border-gray-100 shadow-sm flex flex-col justify-between group hover:shadow-xl hover:shadow-black/5 hover:border-gray-200 transition-all duration-500 relative overflow-hidden">
            <div className="flex justify-between items-start z-10 relative">
                <div>
                    <p className="text-[10px] text-gray-400 uppercase tracking-[0.2em] font-bold mb-2">{title}</p>
                    <h3 className="text-3xl font-serif tracking-widest">{value}</h3>
                </div>
                <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center text-gray-300 group-hover:bg-black group-hover:text-white transition-all duration-500">
                    <Icon size={20} strokeWidth={1.5} />
                </div>
            </div>
            {link && (
                <Link to={link} className="flex items-center gap-2 text-[9px] uppercase tracking-widest font-bold text-gray-300 hover:text-black mt-8 w-max transition-colors z-10 relative">
                    Xem chi tiết <ArrowUpRight size={12} />
                </Link>
            )}

            {/* Background Icon Watermark */}
            <Icon size={120} className="absolute -right-6 -bottom-6 text-gray-50 opacity-50 group-hover:scale-110 transition-transform duration-700" />
        </div>
    )

    return (
        <div className="space-y-10 animate-in fade-in duration-700">
            {/* HEADER */}
            <div>
                <h1 className="text-2xl font-serif tracking-widest uppercase">Tổng quan hệ thống</h1>
                <p className="text-[10px] text-gray-400 uppercase tracking-[0.2em] mt-2 font-medium">Số liệu thống kê thời gian thực</p>
            </div>

            {/* SUMMARY CARDS */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    title="Tổng Doanh Thu"
                    value={`${stats.revenue.toLocaleString('vi-VN')}đ`}
                    icon={DollarSign}
                    link="/admin/orders"
                />
                <StatCard
                    title="Tổng Đơn Hàng"
                    value={stats.totalOrders}
                    icon={ShoppingCart}
                    link="/admin/orders"
                />
                <StatCard
                    title="Sản Phẩm"
                    value={stats.totalProducts}
                    icon={Package}
                    link="/admin/products"
                />
                <StatCard
                    title="Khách Hàng"
                    value={stats.totalCustomers}
                    icon={Users}
                    link="/admin/users"
                />
            </div>

            {/* RECENT ORDERS */}
            <div className="bg-white border border-gray-100 shadow-sm overflow-hidden mt-8">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                    <h2 className="text-[11px] font-bold uppercase tracking-widest text-black">Đơn hàng gần đây</h2>
                    <Link to="/admin/orders" className="text-[10px] uppercase font-bold tracking-widest text-gray-400 hover:text-black transition-colors flex items-center gap-1">
                        Xem tất cả <ArrowUpRight size={12} />
                    </Link>
                </div>

                {recentOrders.length === 0 ? (
                    <div className="p-10 text-center text-sm font-serif italic text-gray-400">Chưa có đơn hàng nào.</div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="border-b border-gray-50 text-[9px] uppercase tracking-[0.2em] text-gray-400">
                                    <th className="p-4 text-left font-bold w-24">Mã Đơn</th>
                                    <th className="p-4 text-left font-bold">Khách Hàng</th>
                                    <th className="p-4 text-right font-bold">Tổng Tiền</th>
                                    <th className="p-4 text-center font-bold">Thanh Toán</th>
                                    <th className="p-4 text-center font-bold">Trạng Thái</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {recentOrders.map((order) => (
                                    <tr key={order._id} className="hover:bg-gray-50/30 transition-colors">
                                        <td className="p-4 text-xs font-mono text-gray-500">#{order._id.substring(0, 6)}</td>
                                        <td className="p-4 text-xs font-bold">{order.user ? order.user.name : 'Khách vãng lai'}</td>
                                        <td className="p-4 text-xs text-right font-bold text-emerald-600">{order.totalPrice.toLocaleString('vi-VN')}đ</td>
                                        <td className="p-4 text-center">
                                            {order.isPaid ? (
                                                <span className="inline-flex items-center justify-center gap-1 bg-emerald-50 text-emerald-600 px-2 py-1 text-[9px] uppercase tracking-widest font-bold">
                                                    <CheckCircle2 size={10} /> Đã thanh toán
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center justify-center gap-1 bg-amber-50 text-amber-600 px-2 py-1 text-[9px] uppercase tracking-widest font-bold">
                                                    <Clock size={10} /> Chờ TT
                                                </span>
                                            )}
                                        </td>
                                        <td className="p-4 text-center">
                                            {order.isDelivered ? (
                                                <span className="inline-flex items-center justify-center gap-1 bg-blue-50 text-blue-600 px-2 py-1 text-[9px] uppercase tracking-widest font-bold">
                                                    Đã giao hàng
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center justify-center gap-1 border border-gray-200 text-gray-500 px-2 py-1 text-[9px] uppercase tracking-widest font-bold">
                                                    Chờ xử lý
                                                </span>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    )
}

export default AdminDashboardPage
