import React from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { LayoutDashboard, Package, ShoppingCart, Layers, LogOut, Bell, User, Bandage, Award } from 'lucide-react'

const AdminLayout = () => {
    const location = useLocation();

    const menuItems = [
        {
            path: '/admin/dashboard',
            icon: <LayoutDashboard size={18} />,
            label: 'Tổng quan'
        },
        {
            path: '/admin/products',
            icon: <Package size={18} />,
            label: 'Sản phẩm'
        },
        {
            path: '/admin/orders',
            icon: <ShoppingCart size={18} />,
            label: 'Đơn hàng'
        },
        {
            path: '/admin/categories',
            icon: <Layers size={18} />,
            label: 'Danh mục'
        },
        {
            path: '/admin/brands',
            icon: <Award size={18} />,
            label: 'Thương hiệu'
        },
    ];

    return (
        <div className="flex min-h-screen bg-[#f8f9fa]">

            {/* 1. Sidebar */}
            <aside className="w-64 bg-white border-r border-gray-100 flex flex-col sticky top-0 h-screen z-50">

                <div className="p-8 border-b border-gray-50">
                    <Link to="/" className="font-serif text-xl tracking-widest font-bold">
                        PURE <span className="font-light">SCENT</span>
                    </Link>
                    <p className="text-[9px] uppercase tracking-[0.3em] text-gray-400 mt-2 font-bold">Admin Panel</p>
                </div>

                {/* Navigation */}
                <nav className="flex-1 p-4 space-y-2 mt-6">
                    {menuItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`flex items-center gap-4 px-6 py-4 rounded-sm text-[11px] uppercase tracking-widest font-bold transition-all 
                                ${location.pathname === item.path
                                    ? 'bg-gray-400 text-white shadow-lg shadow-black/10'
                                    : 'text-gray-400 hover:bg-gray-50 hover:text-black'
                                }`}
                        >
                            {item.icon}
                            {item.label}
                        </Link>
                    ))}
                </nav>


                <div className="p-6 border-t border-gray-50">
                    <Link to="/" className="flex items-center gap-4 px-6 py-4 text-[11px] uppercase tracking-widest font-bold text-gray-400 hover:text-red-500 transition-colors">
                        <LogOut size={18} />
                        Thoát
                    </Link>
                </div>
            </aside>

            {/* 2. Main Content */}
            <main className="flex-1 flex flex-col overflow-hidden">

                <header className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-10 shrink-0">
                    <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400">
                        {menuItems.find(i => i.path === location.pathname)?.label || 'Bảng điều khiển'}
                    </h2>

                    <div className="flex items-center gap-8">
                        <button className="relative text-gray-400 hover:text-black transition-colors cursor-pointer">
                            <Bell size={20} strokeWidth={1.5} />
                            <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                        </button>
                        <div className="flex items-center gap-3 pl-8 border-l border-gray-100">
                            <div className="text-right">
                                <p className="text-[10px] font-bold uppercase tracking-widest">Admin Name</p>
                                <p className="text-[9px] text-gray-400">Super Admin</p>
                            </div>
                            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                                <User size={20} strokeWidth={1.5} className="text-gray-400" />
                            </div>
                        </div>
                    </div>
                </header>


                <div className="flex-1 p-10 overflow-y-auto">
                    <Outlet />
                </div>
            </main>

        </div>
    )
}

export default AdminLayout