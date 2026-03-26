import React from 'react'
import { ShoppingCart, Eye } from 'lucide-react'
// Nhận product từ props
const ProductCard = ({ product }) => {
    return (
        <div className='group cursor-pointer space-y-4'>

            <div className='relative aspect-[3/4] overflow-hidden  bg-gray-100 Overlay'>
                <img
                    src={product.image}
                    alt={product.name}
                    className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-700'
                />
                <button className='absolute text-white top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0 '>
                    <Eye size={20} strokeWidth={2.5} />
                </button>
                <div className='absolute top-4 left-4'>
                    <span className='bg-white/80 backdrop-blur-sm px-3 py-1 text-[10px] uppercase tracking-widest text-black font-semibold rounded-full'>
                        {product.gender}
                    </span>
                </div>
            </div>

            {/* Thông tin sản phẩm */}

            <div className='text-center space-y-1'>
                <p className='text-[10px] uppercase tracking-[0.2em] text-gray-400 font-medium'>
                    {product.brand}
                </p>
                <h3 className='font-serif text-lg text-black'>
                    {product.name}
                </h3>
                <p className='text-sm font-semibold text-gray-900'>
                    {product.price}
                </p>
                <button className='bg-gray-400 py-3 px-8 hover:bg-gray-800 text-white mt-3 cursor-pointer'>
                    <ShoppingCart size={20} strokeWidth={2.5} /></button>


            </div>

        </div>
    )
}

export default ProductCard
