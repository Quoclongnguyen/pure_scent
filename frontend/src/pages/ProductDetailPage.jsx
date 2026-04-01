import React, { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ShoppingBag, ChevronRight, ChevronLeft, Star, Heart } from 'lucide-react'
import ProductCard from '../components/productCard/ProductCard'

// Mock data cho demo
const mockProducts = [
    {
        id: 1,
        name: "Santal 33",
        brand: "Le Labo",
        price: "5.500.000đ",
        image: "/src/assets/img1.png",
        description: "An open fire. The soft drift of smoke. Where sensuality rises after the light has gone. Santal 33 là biểu tượng của tinh thần tự do và sự sáng tạo không giới hạn.",
        notes: {
            top: "Violet Accord, Cardamom",
            heart: "Iris, Ambrox",
            base: "Cedarwood, Leather, Sandalwood"
        },
        sizes: ["50ml", "100ml"]
    },
    //dùng mock này cho trang chi tiết
];

const ProductDetailPage = () => {
    const { id } = useParams();
    const [selectedSize, setSelectedSize] = useState("50ml");
    const [quantity, setQuantity] = useState(1);

    // Lấy product (trong thực tế sẽ fetch từ API theo id)
    const product = mockProducts[0];

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
                    <div className="aspect-[4/5] bg-[#fcfcfc] overflow-hidden rounded-[4px] relative group">
                        <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <button className="absolute top-6 right-6 p-3 bg-white/80 backdrop-blur-md rounded-full hover:bg-white transition-all shadow-sm">
                            <Heart size={18} strokeWidth={1} />
                        </button>
                    </div>
                    {/* Thumbnails (nếu có nhiều ảnh) */}
                    <div className="grid grid-cols-4 gap-4">
                        <div className="aspect-square bg-gray-50 border border-black p-2 cursor-pointer">
                            <img src={product.image} alt="thumb" className="w-full h-full object-contain opacity-100" />
                        </div>
                        {/* Placeholder thumbs */}
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="aspect-square bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer opacity-50 hover:opacity-100"></div>
                        ))}
                    </div>
                </div>

                {/* 2. Product Information */}
                <div className="flex flex-col space-y-10 py-4">
                    <div className="space-y-4">
                        <p className="text-[11px] uppercase tracking-[0.3em] text-gray-400 font-bold">
                            {product.brand}
                        </p>
                        <h1 className="font-serif text-4xl md:text-5xl text-black leading-tight">
                            {product.name}
                        </h1>
                        <p className="text-2xl font-light text-gray-900 border-b border-gray-100 pb-8">
                            {product.price}
                        </p>
                    </div>

                    {/* Description */}
                    <p className="text-gray-500 leading-relaxed text-lg">
                        {product.description}
                    </p>




                    <div className="grid grid-cols-3 gap-6 py-8 border-y border-gray-50">
                        <div className="space-y-2">
                            <h4 className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Top</h4>
                            <p className="text-sm font-medium">{product.notes.top}</p>
                        </div>
                        <div className="space-y-2">
                            <h4 className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Heart</h4>
                            <p className="text-sm font-medium">{product.notes.heart}</p>
                        </div>
                        <div className="space-y-2">
                            <h4 className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Base</h4>
                            <p className="text-sm font-medium">{product.notes.base}</p>
                        </div>
                    </div>



                    {/* Size Selection */}
                    <div className="space-y-5">
                        <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-black">
                            Chọn dung tích
                        </label>
                        <div className="flex gap-4">
                            {product.sizes.map((size) => (
                                <button
                                    key={size}
                                    onClick={() => setSelectedSize(size)}
                                    className={`px-8 py-3 text-xs tracking-widest transition-all cursor-pointer ${selectedSize === size
                                        ? 'bg-black text-white'
                                        : 'border border-gray-200 text-gray-400 hover:border-black hover:text-black'
                                        }`}
                                >
                                    {size}
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
                        <details className="group border-b border-gray-100 pb-4 cursor-pointer">
                            <summary className="flex items-center justify-between font-bold text-[10px] uppercase tracking-widest list-none">
                                Chi tiết sản phẩm
                                <span className="group-open:rotate-180 transition-transform font-light">+</span>
                            </summary>
                            <p className="pt-4 text-sm text-gray-500 leading-relaxed">
                                Được chắt lọc từ những nguyên liệu quý hiếm, Santal 33 mang đến một hành trình khứu giác độc bản.
                                Sản phẩm được đóng gói thủ công trong bao bì tái chế sang trọng.
                            </p>
                        </details>
                        <details className="group border-b border-gray-100 pb-4 cursor-pointer">
                            <summary className="flex items-center justify-between font-bold text-[10px] uppercase tracking-widest list-none">
                                Vận chuyển & Đổi trả
                                <span className="group-open:rotate-180 transition-transform font-light">+</span>
                            </summary>
                            <p className="pt-4 text-sm text-gray-500 leading-relaxed">
                                Miễn phí vận chuyển cho đơn hàng từ 2.000.000đ. Chính sách đổi trả trong vòng 7 ngày nếu sản phẩm còn lớp niêm phong.
                            </p>
                        </details>
                    </div>
                </div>
            </div>

            {/* Related Products Section */}
            <section className="max-w-7xl mx-auto px-6 pt-32">
                <h2 className="font-serif text-3xl text-center mb-16 uppercase tracking-widest">
                    Có thể bạn cũng thích
                </h2>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-10">
                    {/* Reuse ProductCard with some dummy data */}
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="opacity-80 hover:opacity-100 transition-opacity">
                            <ProductCard product={{ id: i, name: "Sample Scent", brand: "PureScent", price: "2.000.000đ", image: "/src/assets/img1.png" }} />
                        </div>
                    ))}
                </div>
            </section>
        </main>
    )
}

export default ProductDetailPage
