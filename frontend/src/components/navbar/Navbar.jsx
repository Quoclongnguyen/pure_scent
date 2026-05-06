import React, { useContext, useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom';
import { ShoppingCart, User, Search } from 'lucide-react';
import AuthContext from '../../context/AuthContext';
import api from '../../utils/Axios.js'
import CartContext from '../../context/CartContext';
import { toast } from 'sonner';
const Navbar = () => {
    const { userInfo, logout } = useContext(AuthContext)
    const { cartCount } = useContext(CartContext)

    // States cho Search
    const [isSearchOpen, setIsSearchOpen] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')
    const [searchResults, setSearchResults] = useState([])
    const [isSearching, setIsSearching] = useState(false)
    const searchRef = useRef(null)

    // Debounce Call API
    useEffect(() => {
        const delayDebounceFn = setTimeout(async () => {
            if (searchQuery.trim()) {
                setIsSearching(true)
                try {
                    const res = await api.get(`/api/products?keyword=${searchQuery}&limit=5`)
                    setSearchResults(res.data.products)
                } catch (error) {
                    console.error("Lỗi khi tìm kiếm", error)
                } finally {
                    setIsSearching(false)
                }
            } else {
                setSearchResults([])
            }
        }, 500) // Đợi 500ms sau khi user ngừng gõ mới gọi API (Debounce)

        return () => clearTimeout(delayDebounceFn)
    }, [searchQuery])

    // Đóng popup khi click ra ngoài
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setIsSearchOpen(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])
    const handleLogout = async () => {
        try {
            await api.post('api/users/logout')
            logout()
            toast.success("Đã đăng xuất")
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

                    {/* Thanh tìm kiếm */}
                    <div className="relative flex items-center" ref={searchRef}>
                        <div className={`flex items-center overflow-hidden transition-all duration-300 ease-in-out ${isSearchOpen ? 'w-48 md:w-64 border-b border-black' : 'w-5'}`}>
                            <Search
                                size={20}
                                strokeWidth={1.5}
                                onClick={() => {
                                    setIsSearchOpen(!isSearchOpen)
                                    if (isSearchOpen) setSearchQuery('')
                                }}
                                className="cursor-pointer flex-shrink-0"
                            />
                            <input
                                type="text"
                                placeholder="Tìm kiếm nước hoa..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className={`bg-transparent outline-none text-[11px] px-2 w-full transition-opacity duration-300 ${isSearchOpen ? 'opacity-100' : 'opacity-0'}`}
                            />
                        </div>

                        {/* Kết quả tìm kiếm Dropdown */}
                        {isSearchOpen && searchQuery.trim() && (
                            <div className="absolute top-full right-0 mt-4 w-72 md:w-80 bg-white border border-gray-100 shadow-[0_10px_40px_rgba(0,0,0,0.08)] z-[100] rounded-sm max-h-[400px] overflow-y-auto">
                                {isSearching ? (
                                    <div className="p-6 text-center text-[10px] uppercase tracking-widest text-gray-400 font-bold">
                                        Đang tìm kiếm...
                                    </div>
                                ) : searchResults.length > 0 ? (
                                    <div className="flex flex-col">
                                        {searchResults.map(product => (
                                            <Link
                                                key={product._id}
                                                to={`/product/${product._id}`}
                                                onClick={() => {
                                                    setIsSearchOpen(false)
                                                    setSearchQuery('')
                                                }}
                                                className="flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-0 group"
                                            >
                                                <div className="w-12 h-16 bg-[#fcfcfc] flex-shrink-0 overflow-hidden">
                                                    <img
                                                        src={product.images?.[0]?.startsWith('http') ? product.images[0] : `http://localhost:3001${product.images?.[0]}`}
                                                        alt={product.name}
                                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                                    />
                                                </div>
                                                <div className="flex flex-col gap-1">
                                                    <span className="text-[10px] font-bold uppercase tracking-widest line-clamp-1 group-hover:text-gray-600 transition-colors">{product.name}</span>
                                                    <span className="text-[10px] text-gray-400">
                                                        {product.variants?.[0]?.discountPrice
                                                            ? product.variants[0].discountPrice.toLocaleString('vi-VN')
                                                            : product.variants?.[0]?.originalPrice?.toLocaleString('vi-VN')}đ
                                                    </span>
                                                </div>
                                            </Link>
                                        ))}
                                        <Link
                                            to={`/shop?keyword=${searchQuery}`}
                                            onClick={() => { setIsSearchOpen(false); setSearchQuery(''); }}
                                            className="block p-4 text-center text-[10px] uppercase font-bold tracking-widest text-gray-400 hover:text-black hover:bg-gray-50 transition-colors border-t border-gray-100"
                                        >
                                            Xem tất cả kết quả
                                        </Link>
                                    </div>
                                ) : (
                                    <div className="p-6 text-center text-[10px] uppercase tracking-widest text-gray-400 font-bold">
                                        Không tìm thấy "{searchQuery}"
                                    </div>
                                )}
                            </div>
                        )}
                    </div>



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