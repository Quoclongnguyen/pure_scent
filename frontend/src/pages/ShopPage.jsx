import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import ProductCard from '../components/productCard/ProductCard'
import { ChevronLeft, ChevronRight } from 'lucide-react';
import api from '../utils/Axios.js'

const ShopPage = () => {
    const [products, setProduct] = useState([])
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await api.get('/api/products')
                setProduct(res.data)
                setLoading(false)
            } catch (error) {
                console.error("Lỗi khi Get sản phẩm: ", error)
                setLoading(false)
            }
        }
        fetchProducts()
    }, [])
    if (loading)
        return <div className="p-20 text-center font-serif text-xl">Đang tải sản phẩm...</div>
    return (

        <main className='min-h-screen bg-white'>

            <div className='bg-[#f9f9f9] py-8 border-b border-gray-100 mb-12'>
                <div className='max-w-7xl mx-auto px-6 text-center space-y-4'>
                    <h1 className='font-serif text-4xl uppercase tracking-[0.2em]'>
                        Nước Hoa</h1>
                    <p className='text-gray-400 text-[10px] uppercase tracking-widest flex items-center justify-center gap-2'>
                        <Link to="/" className='hover:text-black transition-colors flex'>Trang chủ</Link>
                        <span>/</span>
                        <span className='text-black'><Link to="/shop" className='hover:text-black transition-colors flex'>Nước Hoa</Link></span>
                    </p>
                </div>
            </div>

            <div className='max-w-7xl mx-[300px] px-6 flex flex-col md:flex-row gap-16 pb-24'>
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

                    <div className='space-y-6'>
                        <h4 className='text-xs font-bold uppercase tracking-[0.2em] border-b border-black pb-2'>Giá Sản Phẩm</h4>
                        <div className='flex flex-col gap-4 text-xs uppercase tracking-widest text-gray-500'>
                            <button className='text-left hover:text-black transition-colors'>Giá dưới 100.000đ</button >
                            <button className='text-left hover:text-black transition-colors'>100.000đ - 200.000đ</button>
                            <button className='text-left hover:text-black transition-colors'>200.000đ - 300.000đ</button>
                            <button className='text-left hover:text-black transition-colors'>500.000đ - 1.000.000đ</button>
                            <button className='text-left hover:text-black transition-colors'>Giá trên 1.000.000đ</button>
                        </div>
                    </div>

                </aside>

                {/* 2. PRODUCT GRID */}
                <div className='flex-1 space-y-8'>
                    <div className='flex justify-between items-center text-[15px] uppercase tracking-widest text-gray border-b border-gray-200 pb-2'>
                        <p>Hiển thị {products.length} sản phẩm</p>
                        <select className='bg-transparent focus:outline-none text-back font-medium cursor-pointer'>
                            <option>Mới Nhất</option>
                            <option>Giá: Thấp đến cao</option>
                            <option>Giá: Cao đến thấp</option>
                        </select>
                    </div>
                    {/* SẢN PHẨM */}
                    <div className='grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12'>
                        {products.map((item) => (
                            <ProductCard key={item._id} product={item} />
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