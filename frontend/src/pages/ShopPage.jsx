import React from 'react'
import ProductCard from '../components/productCard/ProductCard'
import Footer from '../components/footer/Footer';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const mockProducts = [
    { id: 1, name: "Santal 33", brand: "Le Labo", gender: "Unisex", price: "5.500.000đ", image: "/src/assets/img1.png" },
    { id: 2, name: "Another 13", brand: "Le Labo", gender: "Men", price: "5.200.000đ", image: "/src/assets/img1.png" },
    { id: 3, name: "Rose 31", brand: "Le Labo", gender: "Women", price: "4.800.000đ", image: "/src/assets/img1.png" },
    { id: 5, name: "Lys 41", brand: "Le Labo", gender: "Women", price: "5.000.000đ", image: "/src/assets/img1.png" },
    { id: 6, name: "Lys 41", brand: "Le Labo", gender: "Men", price: "5.000.000đ", image: "/src/assets/img1.png" },
    { id: 7, name: "Lys 41", brand: "Le Labo", gender: "Women", price: "5.000.000đ", image: "/src/assets/img1.png" },
    { id: 8, name: "Lys 41", brand: "Le Labo", gender: "Men", price: "5.000.000đ", image: "/src/assets/img1.png" },
    { id: 9, name: "Lys 41", brand: "Le Labo", gender: "Men", price: "5.000.000đ", image: "/src/assets/img1.png" },

];
const ShopPage = () => {
    return (
        <main className='min-h-screen bg-white'>

            <div className='bg-[#f9f9f9] py-16 border-b border-gray-100 mb-12'>
                <div className='max-w-7xl mx-auto px-6 text-center space-y-4'>
                    <h1 className='font-serif text-4xl uppercase tracking-[0.2em]'>
                        Nước Hoa</h1>
                    <p className='text-gray-400 text-[15px] uppercase tracking-widest '>
                        Trang chủ / Nước Hoa</p>
                </div>
            </div>

            <div className='max-w-7xl mx-auto px-6 flex flex-col md:flex-row gap-16 pb-24'>
                {/* SIDEBAR */}
                <aside className='w-full md:w-64 space-y-12'>
                    <div className='space-y-6'>
                        <h4 className='text-xs font-bold uppercase tracking-[0.2em] border-b border-black pb-2'>Bộ Sưu Tập

                        </h4>
                        <div className='flex flex-col gap-4 text-xs uppercase tracking-widest text-gray-500'>
                            <button className='text-left hover:text-black transition-colors'>Tất cả sản phẩm</button>
                            <button className='text-left hover:text-black transition-colors'>Nước Hoa Nam</button>
                            <button className='text-left hover:text-black transition-colors'>Nước Hoa Nữ</button>
                            <button className='text-left hover:text-black transition-colors'>Unisex</button>
                        </div>

                    </div>


                    <div className='space-y-6'>
                        <h4 className='text-xs font-bold uppercase tracking-[0.2em] border-b border-black pb-2'>Thương Hiệu</h4>
                        <div className='flex flex-col gap-4 text-xs uppercase tracking-widest text-gray-500'>
                            <button className='text-left hover:text-black transition-colors'>Le Labo</button>
                            <button className='text-left hover:text-black transition-colors'>Chanel</button>
                            <button className='text-left hover:text-black transition-colors'>Dior</button>
                        </div>
                    </div>

                </aside>

                {/* 2. PRODUCT GRID */}
                <div className='flex-1 space-y-8'>
                    <div className='flex justify-between items-center text-[15px] uppercase tracking-widest text-gray border-b border-gray-200 pb-2'>
                        <p>Hiển thị 6 sản phẩm</p>
                        <select className='bg-transparent focus:outline-none text-back font-medium cursor-pointer'>
                            <option>Mới Nhất</option>
                            <option>Giá: Thấp đến cao</option>
                            <option>Giá: Cao đến thấp</option>
                        </select>
                    </div>
                    {/* SẢN PHẨM */}
                    <div className='grid grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12'>
                        {mockProducts.map((item) => (
                            <ProductCard key={item.id} product={item} />
                        ))}
                    </div>

                    {/* PHÂN TRANG */}
                    <div className='flex justify-center items-center gap-8 pt-16 border-t border-gray-100 mt-12 text-[10px] tracking-[0.2em] font-bold'>
                        <button className='text-gray-300 hover:text-black transition-colors cursor-pointer'>
                            <ChevronLeft size={20} strokeWidth={1.5} />
                        </button>
                        <div className='flex gap-6'>
                            <span className='cursor-pointer text-black border-b border-black pb-1'>01</span>
                            <span className='cursor-pointer text-gray-400 hover:text-black transition-colors'>02</span>
                            <span className='cursor-pointer text-gray-400 hover:text-black transition-colors'>03</span>
                            <span className='text-gray-400'>...</span>
                            <span className='cursor-pointer text-gray-400 hover:text-black transition-colors'>39</span>
                        </div>
                        <button className='text-gray-300 hover:text-black transition-colors cursor-pointer'>
                            <ChevronRight size={20} strokeWidth={1.5} />                        </button>
                    </div>
                </div>
            </div>






        </main>
    )
}

export default ShopPage