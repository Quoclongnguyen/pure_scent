import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import { ShoppingCart, User, Search } from 'lucide-react';
import AuthContext from '../../context/AuthContext';
import api from '../../utils/Axios.js'
import CartContext from '../../context/CartContext';
const Navbar = () => {
    const { userInfo, logout } = useContext(AuthContext)
    const { cartCount } = useContext(CartContext)
    const handleLogout = async () => {
        try {
            await api.post('api/users/logout')
            logout()
            alert("Đã đăng xuất")
        } catch (error) {
            console.error("Lỗi đăng xuất", error)
        }
    }
    return (
        <nav className="h-20 w-full flex items-center justify-center border-b border-gray-100 bg-white sticky top-0 z-50">
            <div className="max-w-[95%] w-full h-auto flex justify-between items-center px-6">
                {/* Logo */}
                <Link to="/" className=" font-serif text-2xl tracking-wide font-medium">
                    PURE SCENT
                </Link>
                {/* Menu chính */}
                <ul className="flex gap-8 items-center cursor-pointer ">
                    <li className=' hover:font-semibold transition-all duration-300'><Link to="/">Trang chủ</Link></li>
                    <li className=' hover:font-semibold transition-all duration-300'><Link to="/about">Về chúng tôi</Link></li>
                    <li className=' hover:font-semibold transition-all duration-300'><Link to="/brand">Thương hiệu</Link></li>
                    <li className=' hover:font-semibold transition-all duration-300'><Link to="/shop">Nước Hoa</Link></li>
                    <li className=' hover:font-semibold transition-all duration-300'><Link to="/contact">Liên hệ</Link></li>
                </ul>

                <div className="flex gap-5 items-center cursor-pointer">
                    <Search size={20} strokeWidth={1.5} />



                    {userInfo ? (

                        <div className="relative group py-2">

                            <div className="flex items-center gap-2 cursor-pointer">
                                <User size={20} strokeWidth={1.5} />
                                <span className="text-[11px] uppercase font-bold tracking-widest hidden md:block">
                                    {userInfo.name.split(' ').pop()} {/* Chỉ lấy tên cuối cho gọn */}
                                </span>
                            </div>

                            {/* Dropdown Menu */}
                            <div className="absolute right-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 translate-y-2 group-hover:translate-y-0 z-[100]">
                                <div className="bg-white border border-gray-100 shadow-xl w-48 py-2 rounded-sm">

                                    <div className="px-6 py-3 border-b border-gray-50 mb-2">
                                        <p className="text-[9px] text-gray-400 uppercase tracking-widest font-bold">Tài khoản của</p>
                                        <p className="text-sm font-bold truncate">{userInfo.name}</p>
                                    </div>


                                    <Link to="/profile" className="block px-6 py-3 text-[11px] uppercase tracking-widest font-bold hover:bg-gray-50 transition-colors">
                                        Thông tin cá nhân
                                    </Link>


                                    {userInfo.isAdmin && (
                                        <Link to="/admin" className="block px-6 py-3 text-[11px] uppercase tracking-widest font-bold text-amber-600 hover:bg-gray-50 transition-colors">
                                            Trang Quản Trị
                                        </Link>
                                    )}

                                    <button
                                        onClick={handleLogout}
                                        className="w-full text-left px-6 py-3 text-[11px] uppercase tracking-widest font-bold text-red-400 hover:bg-red-50 hover:text-red-600 transition-all border-t border-gray-50 mt-2 cursor-pointer"
                                    >
                                        Đăng xuất
                                    </button>
                                </div>
                            </div>
                        </div>
                    ) : (

                        <Link to="/login" className="hover:text-gray-400 transition-colors">
                            <User size={20} strokeWidth={1.5} />
                        </Link>
                    )}


                    <Link to="/cart" className="relative">
                        <ShoppingCart size={20} strokeWidth={1.5} />
                        {cartCount > 0 && (
                            <span className="absolute -top-2 -right-2 bg-black text-white text-[10px] w-4 h-4 rounded-full flex justify-center items-center">
                                {cartCount}
                            </span>
                        )}

                    </Link>
                </div>
            </div>
        </nav>
    )
}

export default Navbar