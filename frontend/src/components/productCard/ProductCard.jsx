import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { ShoppingCart, Eye } from 'lucide-react'
import CartContext from '../../context/CartContext'
import { toast } from 'sonner'

// Nhận product từ props
const ProductCard = ({ product }) => {
    const { addToCart } = useContext(CartContext)
    const handleAddToCard = async () => {
        try {
            const defaultVariant = product.variants?.[0]
            const quantity = 1 // vì ở trang chủ không chọn được dung tích 
            if (defaultVariant) {
                addToCart(product, defaultVariant, quantity)
                toast.success(`Đã thêm ${product.name} (${defaultVariant.size}) vào giõ hàng!`)
            }
            else {
                toast.error("Vui lòng chọn dung tích!")
            }
        } catch (error) {
            console.log('Lỗi khi thêm vào giõ hàng'.error)
        }

    }
    return (
        <div className='group cursor-pointer space-y-4 text-left'>

            <Link to={`/product/${product._id}`} className='relative aspect-[4/5] block overflow-hidden bg-[#fcfcfc] Overlay'>
                <img
                    src={product.images?.[0].startsWith('http')
                        ? product.images[0]
                        : `http://localhost:3001${product.images?.[0]}`
                    }
                    alt={product.name}
                    className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-700'
                />
                <div className='absolute text-white top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0 '>
                    <Eye size={20} strokeWidth={2.5} />
                </div>
                <div className='absolute top-4 left-4'>
                    <span className='bg-white/80 backdrop-blur-sm px-3 py-1 text-[10px] uppercase tracking-widest text-black font-bold rounded-full'>
                        {product.gender}
                    </span>
                </div>
            </Link>

            {/* Thông tin sản phẩm */}
            <div className='space-y-1 px-1'>
                <p className='text-[10px] uppercase tracking-[0.2em] text-gray-400 font-bold'>
                    {product.brand?.name || product.brand}
                </p>
                <Link to={`/product/${product._id}`}>
                    <h3 className='font-serif text-lg text-black hover:text-gray-600 transition-colors'>
                        {product.name}
                    </h3>
                </Link>

                <div className='flex items-center gap-2'>
                    {product.variants?.[0]?.discountPrice ? (
                        <>
                            <span className='text-sm font-bold text-black'>
                                {product.variants[0].discountPrice.toLocaleString('vi-VN')}₫
                            </span>
                            <span className='text-[10px] text-gray-400 line-through'>
                                {product.variants[0].originalPrice.toLocaleString('vi-VN')}₫
                            </span>
                        </>
                    ) : (
                        <p className='text-sm font-medium text-gray-900'>
                            {product.variants && product.variants.length > 0
                                ? `${product.variants[0].originalPrice.toLocaleString('vi-VN')}₫`
                                : (product.price ? `${product.price.toLocaleString('vi-VN')}₫` : "Liên hệ")}
                        </p>
                    )}
                </div>
                <button onClick={() => handleAddToCard()} className='bg-gray-500 text-white px-5 py-3 text-[10px] uppercase tracking-widest font-bold hover:bg-gray-800 transition-all mt-4 w-full flex items-center justify-center gap-2 cursor-pointer'>
                    <ShoppingCart size={14} />
                    Thêm vào giỏ hàng
                </button>
            </div>
        </div>
    )
}

export default ProductCard
