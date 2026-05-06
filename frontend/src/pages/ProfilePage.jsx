import React, { useContext, useEffect, useState } from 'react'
import AuthContext from '../context/AuthContext'
import { Navigate, Link } from 'react-router-dom'
import api from '../utils/Axios'
import { toast } from 'sonner'
import { User, Package, Eye, CheckCircle2, Clock } from 'lucide-react'

const ProfilePage = () => {
    const { userInfo, logout, login } = useContext(AuthContext)
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)
    const [activeTab, setActiveTab] = useState('orders') // orders, profile, password

    // Form states
    const [profileData, setProfileData] = useState({
        name: userInfo?.name || '',
        email: userInfo?.email || '',
        phone: userInfo?.phone || '',
        address: userInfo?.address || ''
    })

    const [passwordData, setPasswordData] = useState({
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
    })

    const [isUpdating, setIsUpdating] = useState(false)

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

    const handleUpdateProfile = async (e) => {
        e.preventDefault()
        try {
            setIsUpdating(true)
            const { data } = await api.put('/api/users/profile', profileData)
            login(data) // Use login function which updates state and localStorage
            toast.success("Cập nhật thông tin thành công!")
        } catch (error) {
            toast.error(error.response?.data?.message || "Cập nhật thất bại")
        } finally {
            setIsUpdating(false)
        }
    }

    const handleChangePassword = async (e) => {
        e.preventDefault()
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            toast.error("Mật khẩu xác nhận không khớp!")
            return
        }
        try {
            setIsUpdating(true)
            await api.put('/api/users/profile/password', {
                oldPassword: passwordData.oldPassword,
                newPassword: passwordData.newPassword
            })
            toast.success("Đổi mật khẩu thành công!")
            setPasswordData({ oldPassword: '', newPassword: '', confirmPassword: '' })
        } catch (error) {
            toast.error(error.response?.data?.message || "Đổi mật khẩu thất bại")
        } finally {
            setIsUpdating(false)
        }
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

                        <div className="border-t border-gray-100 pt-6 mt-6 space-y-2">
                            <button
                                onClick={() => setActiveTab('orders')}
                                className={`w-full text-left px-4 py-3 text-[10px] uppercase font-bold tracking-widest transition-colors ${activeTab === 'orders' ? 'bg-black text-white' : 'text-gray-500 hover:bg-gray-50'}`}
                            >
                                Lịch sử mua hàng
                            </button>
                            <button
                                onClick={() => setActiveTab('profile')}
                                className={`w-full text-left px-4 py-3 text-[10px] uppercase font-bold tracking-widest transition-colors ${activeTab === 'profile' ? 'bg-black text-white' : 'text-gray-500 hover:bg-gray-50'}`}
                            >
                                Thông tin cá nhân
                            </button>
                            <button
                                onClick={() => setActiveTab('password')}
                                className={`w-full text-left px-4 py-3 text-[10px] uppercase font-bold tracking-widest transition-colors ${activeTab === 'password' ? 'bg-black text-white' : 'text-gray-500 hover:bg-gray-50'}`}
                            >
                                Đổi mật khẩu
                            </button>
                        </div>

                        <div className="border-t border-gray-100 pt-6 mt-6">
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
                    {activeTab === 'orders' && (
                        <div className="bg-white p-6 md:p-8 shadow-sm border border-gray-100 animate-in fade-in duration-500">
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
                    )}

                    {activeTab === 'profile' && (
                        <div className="bg-white p-6 md:p-8 shadow-sm border border-gray-100 animate-in fade-in duration-500">
                            <div className="flex items-center gap-3 mb-8 pb-4 border-b border-gray-100">
                                <User className="text-gray-400" />
                                <h2 className="text-xl font-serif tracking-widest uppercase">Thông tin cá nhân</h2>
                            </div>
                            <form onSubmit={handleUpdateProfile} className="space-y-6 max-w-xl">
                                <div>
                                    <label className="text-[10px] uppercase font-bold tracking-widest text-gray-400 block mb-2">Họ và tên</label>
                                    <input
                                        type="text"
                                        required
                                        value={profileData.name}
                                        onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                                        className="w-full border-b border-gray-200 py-3 focus:outline-none focus:border-black transition-colors" />
                                </div>
                                <div>
                                    <label className="text-[10px] uppercase font-bold tracking-widest text-gray-400 block mb-2">Địa chỉ Email</label>
                                    <input
                                        type="email"
                                        required
                                        value={profileData.email} onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                                        className="w-full border-b border-gray-200 py-3 focus:outline-none focus:border-black transition-colors" />
                                </div>
                                <div>
                                    <label className="text-[10px] uppercase font-bold tracking-widest text-gray-400 block mb-2">Số điện thoại</label>
                                    <input type="tel"
                                        value={profileData.phone}
                                        onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                                        className="w-full border-b border-gray-200 py-3 focus:outline-none focus:border-black transition-colors"
                                        placeholder="Chưa cập nhật" />
                                </div>
                                <div>
                                    <label className="text-[10px] uppercase font-bold tracking-widest text-gray-400 block mb-2">Địa chỉ giao hàng mặc định</label>
                                    <input type="text" value={profileData.address} onChange={(e) => setProfileData({ ...profileData, address: e.target.value })}
                                        className="w-full border-b border-gray-200 py-3 focus:outline-none focus:border-black transition-colors"
                                        placeholder="Chưa cập nhật" />
                                </div>
                                <button
                                    type="submit"
                                    disabled={isUpdating}
                                    className="bg-black text-white px-8 py-4 text-[10px] uppercase font-bold tracking-widest hover:bg-gray-800 transition-all mt-4 disabled:opacity-50">
                                    {isUpdating ? 'Đang cập nhật...' : 'Lưu thay đổi'}
                                </button>
                            </form>
                        </div>
                    )}

                    {activeTab === 'password' && (
                        <div className="bg-white p-6 md:p-8 shadow-sm border border-gray-100 animate-in fade-in duration-500">
                            <div className="flex items-center gap-3 mb-8 pb-4 border-b border-gray-100">
                                <User className="text-gray-400" />
                                <h2 className="text-xl font-serif tracking-widest uppercase">Đổi mật khẩu</h2>
                            </div>
                            <form onSubmit={handleChangePassword} className="space-y-6 max-w-xl">
                                <div>
                                    <label className="text-[10px] uppercase font-bold tracking-widest text-gray-400 block mb-2">Mật khẩu hiện tại</label>
                                    <input type="password" required value={passwordData.oldPassword} onChange={(e) => setPasswordData({ ...passwordData, oldPassword: e.target.value })} className="w-full border-b border-gray-200 py-3 focus:outline-none focus:border-black transition-colors" />
                                </div>
                                <div>
                                    <label className="text-[10px] uppercase font-bold tracking-widest text-gray-400 block mb-2">Mật khẩu mới (Tối thiểu 6 ký tự)</label>
                                    <input type="password" required minLength="6" value={passwordData.newPassword} onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })} className="w-full border-b border-gray-200 py-3 focus:outline-none focus:border-black transition-colors" />
                                </div>
                                <div>
                                    <label className="text-[10px] uppercase font-bold tracking-widest text-gray-400 block mb-2">Xác nhận mật khẩu mới</label>
                                    <input type="password" required minLength="6" value={passwordData.confirmPassword} onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })} className="w-full border-b border-gray-200 py-3 focus:outline-none focus:border-black transition-colors" />
                                </div>
                                <button type="submit" disabled={isUpdating} className="bg-black text-white px-8 py-4 text-[10px] uppercase font-bold tracking-widest hover:bg-gray-800 transition-all mt-4 disabled:opacity-50">
                                    {isUpdating ? 'Đang cập nhật...' : 'Đổi mật khẩu'}
                                </button>
                            </form>
                        </div>
                    )}
                </div>
            </div>
        </main>
    )
}

export default ProfilePage
