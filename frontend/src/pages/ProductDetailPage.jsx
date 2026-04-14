import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ShoppingBag, ChevronRight, ChevronLeft, Star, Heart } from 'lucide-react'
import ProductCard from '../components/productCard/ProductCard'
import { getImageUrl } from '../utils/helpers';
import api from '../utils/Axios.js'

const ProductDetailPage = () => {
    const { id } = useParams()
    const [product, setProduct] = useState(null)
    const [products, setProducts] = useState([])
    const [quantity, setQuantity] = useState(1);
    const [activeIndex, setActiveIndex] = useState('')
    const [loading, setLoading] = useState(true)
    const [selectedVariant, setSelectedVariant] = useState(null)

    const [activeTab, setActiveTab] = useState('description')// Quản lý Tab nào đang mở
    const [isExpanded, setIsExpanded] = useState(false) // Ấn Xem thêm
    const fetchProduct = async () => {
        try {
            const { data } = await api.get(`/api/products/${id}`)
            setProduct(data)
            setActiveIndex(0) // mặc định hiển thị ảnh đầu tiên
            if (data.variants && data.variants.length > 0) {
                setSelectedVariant(data.variants[0])
            }
        } catch (error) {
            console.error('Lỗi khi lấy chi tiết sản phẩm ', error)
        } finally {
            setLoading(false)
        }
    }

    const fetchProducts = async () => {
        try {
            const res = await api.get('/api/products')
            setProducts(res.data.products)
            setLoading(false)
        } catch (error) {
            console.error("Lỗi khi Get sản phẩm: ", error)
            setLoading(false)
        }
    }
    useEffect(() => {
        fetchProduct()
        fetchProducts()
    }, [])

    if (loading) return (
        <div className="p-10">
            <TableSkeleton rows={8} />
        </div>
    )

    return (
        <main className="min-h-screen bg-white pb-24">
            {/* Breadcrumb */}
            <div className="max-w-7xl mx-auto px-6 py-8">
                <nav className=" items-center gap-2 text-[10px] uppercase tracking-widest text-gray-400">
                    <Link to="/" className="hover:text-black transition-colors">Trang chủ</Link>
                    <span>/</span>
                    <Link to="/shop" className="hover:text-black transition-colors">Nước hoa</Link>
                    <span>/</span>
                    <span className="text-black">{product.name}</span>
                </nav>
            </div>

            {/* Product Section */}
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">

                {/* 1. Image Gallery */}
                <div className="space-y-4">
                    <div className="relative aspect-[4/5]  w-full bg-[#fcfcfc] overflow-hidden rounded-sm group ">
                        <img
                            src={getImageUrl(product.images?.[activeIndex])}
                            alt={product.name}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <button className="absolute top-6 right-6 p-3 bg-white/80 backdrop-blur-md rounded-full hover:bg-white transition-all shadow-sm">
                            <Heart size={18} strokeWidth={1} />
                        </button>
                    </div>

                    <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide mt-4">
                        {product.images?.map((img, index) =>
                            <div
                                key={index}
                                onClick={() => setActiveIndex(index)}
                                className={`flex-shrink-0 w-20 aspect-[4/5] bg-gray-50 border transition-all duration-300 cursor-pointer
                            ${activeIndex === index ? 'border-black' : 'border-gray-100 opacity-60 hover:opacity-100'} `}
                            >
                                <img src={getImageUrl(img)}
                                    alt="thumb"
                                    className="w-full h-full object-cover opacity-100" />
                            </div>
                        )}



                    </div>
                </div>

                {/* 2. Product Information */}
                <div className="flex flex-col space-y-10 py-4">
                    <div className="space-y-4">
                        <p className="text-[11px] uppercase tracking-[0.3em] text-gray-400 font-bold">
                            {product.brand?.name || product.brand}
                        </p>
                        <h1 className="font-serif text-4xl md:text-5xl text-black leading-tight">
                            {product.name}
                        </h1>

                        <div className='gap-4 border-b border-gray-100 p-8'>
                            {selectedVariant?.discountPrice ? (
                                <div className='space-y-2'>
                                    <div className='flex items-center gap-3'>
                                        <span className='text-3xl font-medium text-black '>
                                            {selectedVariant.discountPrice.toLocaleString('vi-VN')}đ
                                        </span>

                                        <span className='text-lg font-light text-gray-400 line-through'>
                                            {selectedVariant.originalPrice.toLocaleString('vi-VN')}đ
                                        </span>

                                        <span className='bg-[#e30019] text-white text-[11px] px-3 py- font-bold rounded-full'>
                                            -{Math.round((1 - selectedVariant.discountPrice / selectedVariant.originalPrice) * 100)}%
                                        </span>
                                    </div>

                                    <p>
                                        (Tiết kiệm: {(selectedVariant.originalPrice - selectedVariant.discountPrice).toLocaleString('vi-VN')}đ)
                                    </p>

                                </div>
                            ) : (
                                <span className='text-2xl font-light text-gray-900'>
                                    {selectedVariant
                                        ? `${selectedVariant.originalPrice.toLocaleString('vi-VN')}đ`
                                        : (product.price ? `${product.price.toLocaleString('vi-VN')}đ` : 'Đang cập nhật')
                                    }
                                </span>
                            )
                            }

                        </div>

                    </div>

                    {/* Description */}
                    <p className="text-gray-500 leading-relaxed text-lg">
                        {product.description}
                    </p>


                    {/* Size Selection */}
                    <div className="space-y-5">
                        <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-black">
                            Chọn dung tích
                        </label>
                        <div className="flex gap-4">
                            {product.variants?.map((variant, index) => (
                                <button
                                    key={index}
                                    onClick={() => setSelectedVariant(variant)}
                                    className={`px-8 py-3 text-xs tracking-widest transition-all cursor-pointer 
                                        ${selectedVariant?.size === variant.size
                                            ? 'bg-black text-white'
                                            : 'border border-gray-200 text-gray-400 hover:border-black hover:text-black'
                                        }`}
                                >
                                    {variant.size}
                                </button>
                            ))}
                        </div>
                    </div>


                    {/* Quantity & Actions */}
                    <div className="space-y-8 pt-6">
                        <div className="flex items-center gap-8">
                            <div className="flex items-center border border-gray-200">
                                <button
                                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                                    className="px-4 py-3 hover:bg-gray-50 transition-colors"
                                >-</button>
                                <span className="w-12 text-center text-sm font-medium">{quantity}</span>
                                <button
                                    onClick={() => setQuantity(q => q + 1)}
                                    className="px-4 py-3 hover:bg-gray-50 transition-colors"
                                >+</button>
                            </div>
                            <button className="flex-1 bg-black text-white flex items-center justify-center gap-3 py-4 text-xs font-bold uppercase tracking-widest hover:bg-gray-800 transition-all cursor-pointer">
                                <ShoppingBag size={18} />
                                Thêm vào giỏ hàng
                            </button>
                        </div>
                        <button className="w-full border border-black py-4 text-xs font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-all duration-500 cursor-pointer">
                            Mua ngay
                        </button>
                    </div>

                    {/* Collapsible details (Extra Info) */}

                    <div className="pt-8 space-y-4">
                        {product.scentNotes && (
                            <details className='group border-b border-gray-100 pb-4 cursor-pointer' open>
                                <summary className='flex items-center justify-between font-bold text-[10px] uppercase tracking-widest list-none'>
                                    Tầng hương đặc trưng
                                    <span className="group-open:rotate-180 transition-transform font-light">+</span>
                                </summary>
                                <div className='pt-6 grid grid-cols-1 gap-4      items-center'>
                                    <div className='flex gap-4'>
                                        <span className="text-[10px] font-bold uppercase w-32 text-gray-400">Hương đầu:</span>
                                        <span className='text-sm'>
                                            {product.scentNotes.top || 'Đang cập nhật'}
                                        </span>
                                    </div>
                                    <div className='flex gap-4'>
                                        <span className="text-[10px] font-bold uppercase w-32 text-gray-400">Hương giữa:</span>
                                        <span className='text-sm'>
                                            {product.scentNotes.heart || 'Đang cập nhật'}
                                        </span>
                                    </div>
                                    <div className='flex gap-4'>
                                        <span className="text-[10px] font-bold uppercase w-32 text-gray-400">Hương cuối:</span>
                                        <span className='text-sm '>
                                            {product.scentNotes.base || 'Đang cập nhật'}
                                        </span>
                                    </div>
                                </div>
                            </details>
                        )}
                        {product.specs && (
                            <details className='group border-b border-gray-100 pb-4 cursor-pointer'>
                                <summary className='flex items-center justify-between font-bold text-[10px] uppercase tracking-widest list-none'>
                                    Thông số sản phẩm
                                    <span className='group-open:rotate-180 transition-transform font-light'>+</span>
                                </summary>
                                <div className="pt-6 grid grid-cols-1 gap-4 ">
                                    <div className='flex gap-4'>
                                        <span className="text-[10px] font-bold uppercase w-32 text-gray-400">Độ lưu hương:</span>
                                        <span className='text-sm'> {product.specs.longevity}</span>
                                    </div>

                                    <div className="flex gap-4  ">
                                        <span className="text-[10px] font-bold uppercase w-32 text-gray-400">Độ tỏa hương: </span>
                                        <span className='text-sm'> {product.specs.sillage}</span>
                                    </div>

                                </div>
                            </details>
                        )}



                    </div>

                </div>

            </div>

            <section className='max-w-4xl mx-auto px-6 pt-20 border-t border-gray-100'>
                <div className='flex justify-center gap-12 border-b border-gray-100 mb-12'>
                    {['description', 'shipping', 'returns'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`pb-4 text-[11px] uppercase font-bold tracking-[0.2em] transition-all relative
                    ${activeTab === tab ? 'text-black' : 'text-gray-300 hover:text-gray-400'}`}
                        >
                            {tab === 'description' ? 'Mô tả sản phẩm' : tab === 'shipping' ? 'Chính sách giao hàng' : 'Chính sách đổi trả'}
                            {activeTab === tab && <div className="absolute bottom-0 left-0 w-full h-[2px] bg-black animate-in slide-in-from-left" />}
                        </button>
                    ))}
                </div>

                {activeTab === 'description' && (
                    <div className='relative'>
                        <div className={`space-y-12 transition-all duration-700 overflow-hidden 
                            ${isExpanded ? 'max-h-[5000px]' : 'max-h-[600px]'}`}>

                            {/* A. Thông tin tóm tắt (Bullets) */}
                            <div className="space-y-4">
                                <h2 className="font-serif text-3xl text-black">
                                    {product.name} {selectedVariant?.size}
                                </h2>
                                <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-3 text-[13px] text-gray-600 list-disc pl-5">
                                    {product.origin &&
                                        <li>Xuất xứ: {product.origin}
                                        </li>}
                                    {product.targetGender &&
                                        <li>Đối tượng: {product.targetGender}
                                        </li>}
                                    {product.scentGroup &&
                                        <li>Nhóm hương: {product.scentGroup}
                                        </li>}
                                    {product.specs?.longevity &&
                                        <li>Độ lưu hương: {product.specs.longevity}
                                        </li>}
                                    {product.specs?.sillage &&
                                        <li>Độ tỏa hương: {product.specs.sillage}
                                        </li>}
                                    {product.specs?.concentration &&
                                        <li>Nồng độ: {product.specs.concentration}
                                        </li>}
                                </ul>
                            </div>
                            <div className="space-y-6">
                                <h3 className="font-serif text-2xl border-l-2 border-black pl-4">Mùi hương</h3>
                                <p className="text-gray-600 leading-relaxed italic">{product.description}</p>

                                {/* Hiển thị ảnh mô tả đầu tiên (thường là ảnh nốt hương) */}
                                {product.descriptionImages?.[0] && (
                                    <div className="w-[600px] mx-auto bg-gray-50 p-4 rounded-sm">
                                        <img
                                            src={getImageUrl(product.descriptionImages[0])}
                                            className="w-full h-auto object-contain" alt="Scent Infographic" />
                                    </div>
                                )}
                            </div>
                            <div className="space-y-6">
                                <h3 className="font-serif text-2xl border-l-2 border-black pl-4">Thiết kế</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    {product.designDescription || "Đang cập nhật nội dung..."}</p>
                                {product.descriptionImages?.[1] && (
                                    <div className="w-[600px] mx-auto bg-gray-50 p-4 border border-gray-100">
                                        <img src={getImageUrl(product.descriptionImages[1])} className="w-full h-auto" alt="Design" />
                                    </div>
                                )}
                            </div>

                            <div className="space-y-6">
                                <h3 className="font-serif text-2xl border-l-2 border-black pl-4">Hướng dẫn sử dụng</h3>
                                <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                                    {product.usageInstructions || "Đang cập nhật nội dung..."}</p>
                                {product.descriptionImages?.[2] && (
                                    <div className="w-[600px] mx-auto bg-gray-50 p-4 border border-gray-100">
                                        <img src={getImageUrl(product.descriptionImages[2])} className="w-full h-auto" alt="Design" />
                                    </div>
                                )}
                            </div>



                            {!isExpanded && (
                                <div className="absolute bottom-0 left-0 w-full h-18 bg-gradient-to-t from-white via-white/80 to-transparent flex items-bottom justify-center pb-4">
                                    <button
                                        onClick={() => setIsExpanded(true)}
                                        className="bg-white border border-black px-5 py-3 text-[10px] uppercase font-bold tracking-widest hover:bg-black hover:text-white transition-all shadow-xl"
                                    >
                                        Xem thêm nội dung
                                    </button>
                                </div>
                            )}



                        </div>
                    </div>
                )}
                {activeTab !== 'description' && (
                    <div className="text-sm text-gray-500 leading-loose animate-in fade-in">
                        {activeTab === 'shipping' ? (
                            <p>PureScent giao hàng toàn quốc. Thời gian từ 2-4 ngày tùy khu vực...</p>
                        ) : (
                            <p>Hỗ trợ đổi trả trong vòng 7 ngày nếu sản phẩm còn nguyên seal...</p>
                        )}
                    </div>
                )}


            </section>



            {/* Related Products Section */}
            <section className="max-w-7xl mx-auto px-6 pt-32">
                <h2 className="font-serif text-3xl text-center mb-16 uppercase tracking-widest">
                    Có thể bạn cũng thích
                </h2>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-10">


                    {products.map((item) => (
                        <div key={item._id} className="opacity-80 hover:opacity-100 transition-opacity">
                            <ProductCard product={item} />
                        </div>
                    ))}
                </div>
            </section>
        </main>
    )
}

export default ProductDetailPage
