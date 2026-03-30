import React from 'react'
import { Instagram, Facebook, Twitter, MapPin, Phone, Mail } from 'lucide-react'
const Footer = () => {
    return (
        <footer className='bg-[#1a1a1a] text-white pt-20 pb-10'>
            <div className='max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 border-b border-gray-800 pb-16'>


                <div className='space-y-6'>
                    <h2 className='font-serif text-2xl tracking-widest'>PURE SCENT</h2>
                    <p className='text-gray-400 text-sm leading-relaxed'>
                        Nâng tầm phong cách cá nhân qua những nốt hương tinh tế và đẳng cấp nhất thế giới.
                    </p>
                    <div className='flex gap-4'>
                        <Instagram size={18} className='cursor-pointer hover:text-gray-400 transition-colors' />
                        <Facebook size={18} className='cursor-pointer hover:text-gray-400 transition-colors' />
                        <Twitter size={18} className='cursor-pointer hover:text-gray-400 transition-colors' />
                    </div>
                </div>

                <div className='space-y-6'>
                    <h4 className='text-xs font-bold uppercase tracking-widest'>Cửa hàng</h4>
                    <ul className='space-y-4 text-gray-400 text-xs tracking-widest'>
                        <li className='hover:text-white cursor-pointer transition-colors'>Nước Hoa Nam</li>
                        <li className='hover:text-white cursor-pointer transition-colors'>Nước Hoa Nữ</li>
                        <li className='hover:text-white cursor-pointer transition-colors'>Bộ Sưu Tập Unisex</li>
                        <li className='hover:text-white cursor-pointer transition-colors'>Nến Thơm</li>
                    </ul>
                </div>

                <div className='space-y-6'>
                    <h4 className='text-xs font-bold uppercase tracking-widest'>Hỗ trợ</h4>
                    <ul className='space-y-4 text-gray-400 text-xs tracking-widest'>
                        <li className='hover:text-white cursor-pointer transition-colors'>Chính sách đổi trả</li>
                        <li className='hover:text-white cursor-pointer transition-colors'>Theo dõi đơn hàng</li>
                        <li className='hover:text-white cursor-pointer transition-colors'>Câu hỏi thường gặp</li>
                        <li className='hover:text-white cursor-pointer transition-colors'>Chính sách bảo mật</li>
                    </ul>
                </div>

                <div className='space-y-6'>
                    <h4 className='text-xs font-bold uppercase tracking-widest'>Liên hệ</h4>
                    <ul className='space-y-4 text-gray-400 text-xs tracking-widest'>
                        <li className='flex items-center gap-3'><MapPin size={14} /> LongDev, Saigon</li>
                        <li className='flex items-center gap-3'><Phone size={14} /> +84 961 998 556</li>
                        <li className='flex items-center gap-3'><Mail size={14} /> quoclong@purescent.com</li>
                    </ul>
                </div>

                <div className='max-w-7xl mx-auto  px-6 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-gray-500 tracking-widest uppercase'>
                    <p>© 2026 PURESCENT. ALL RIGHTS RESERVED.</p>
                    <p>DESIGNED BY YOUR BRAND TEAM</p>
                </div>
            </div>



        </footer >
    )
}

export default Footer