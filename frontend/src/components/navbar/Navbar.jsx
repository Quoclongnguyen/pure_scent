import React from 'react'
import { Link } from 'react-router-dom';
import { ShoppingCart, User, Search } from 'lucide-react';

const Navbar = () => {
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
                    <li className=' hover:font-semibold transition-all duration-300'><Link to="/shop">Cửa hàng</Link></li>
                    <li className=' hover:font-semibold transition-all duration-300'><Link to="/about">Thương hiệu</Link></li>
                    <li className=' hover:font-semibold transition-all duration-300'><Link to="/about">Nước Hoa</Link></li>
                    <li className=' hover:font-semibold transition-all duration-300'><Link to="/about">Liên hệ</Link></li>
                </ul>
                {/* Icons tiện ích */}
                <div className="flex gap-5 items-center cursor-pointer">
                    <Search size={20} strokeWidth={1.5} />
                    <Link to="/login">
                        <User size={20} strokeWidth={1.5} />
                    </Link>
                    <div className="relative">
                        <ShoppingCart size={20} strokeWidth={1.5} />
                        <span className="absolute -top-2 -right-2 bg-black text-white text-[10px] w-4 h-4 rounded-full flex justify-center items-center">0</span>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar