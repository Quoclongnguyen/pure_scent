import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { Trash2, ChevronRight, ArrowLeft } from 'lucide-react'
import CartContext from '../context/CartContext'


const CartPage = () => {
    const { cartItems, removeFromCart, updateQuantity, cartTotal } = useContext(CartContext)


    const [voucher, setVoucher] = useState("");
    // tính phí ship nếu tổng đơn dưới 5tr
    const shipping = cartTotal > 5000000
        ? 0
        : 35000;

    const total = cartTotal + shipping;

    const formatPrice = (num) => {
        return num.toLocaleString('vi-VN') + 'đ';
    };

    if (cartItems.length === 0) {
        return (
            <main className="min-h-[70vh] flex flex-col items-center justify-center space-y-8 px-6">
                <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center">
                    <Trash2 size={32} strokeWidth={1} className="text-gray-300" />
                </div>
                <div className="text-center space-y-2">
                    <h2 className="font-serif text-2xl uppercase tracking-widest">Giỏ hàng của bạn đang trống</h2>
                    <p className="text-gray-400 text-sm">Có vẻ như bạn chưa chọn được mùi hương ưng ý.</p>
                </div>
                <Link to="/shop" className="border border-black px-12 py-4 text-[10px] font-bold uppercase tracking-[0.4em] hover:bg-black hover:text-white transition-all duration-500">
                    Tiếp tục mua sắm
                </Link>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-white pb-24">


            <div className="max-w-7xl mx-auto px-6 py-12">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-gray-100 pb-8">
                    <div className="space-y-4">
                        <h1 className="font-serif text-3xl uppercase tracking-widest">Giỏ hàng</h1>
                        <nav className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-gray-400">
                            <Link to="/" className="hover:text-black transition-colors">Trang chủ</Link>
                            <span>/</span>
                            <span className="text-black">Giỏ hàng ({cartItems.length})</span>
                        </nav>

                    </div>
                </div>
            </div>




            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16">


                <div className="lg:col-span-8 space-y-12">

                    <div className="hidden md:grid grid-cols-12 text-[10px] uppercase tracking-[0.2em] font-bold text-gray-400 pb-4 border-b border-gray-50">
                        <div className="col-span-6">Sản phẩm</div>
                        <div className="col-span-2 text-center">Giá</div>
                        <div className="col-span-2 text-center">Số lượng</div>
                        <div className="col-span-2 text-right">Tổng</div>
                    </div>

                    {/* Cart Items */}
                    <div className="space-y-8">
                        {cartItems.map((item) => (
                            <div key={`${item.id}-${item.size}`} className="grid grid-cols-1 md:grid-cols-12 items-center gap-6 md:gap-0 pb-8 border-b border-gray-50 group">
                                {/* Info */}
                                <div className="col-span-6 flex gap-6">
                                    <div className="w-24 h-32 bg-[#fcfcfc] overflow-hidden rounded-sm">
                                        <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                    </div>
                                    <div className="flex flex-col justify-center space-y-1">
                                        <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">{item.brand}</p>
                                        <h3 className="font-serif text-lg leading-tight">{item.name}</h3>
                                        <p className="text-xs text-gray-400">Dung tích:
                                            <span className="text-black font-medium">{item.size}</span></p>
                                        <button
                                            onClick={() => removeFromCart(item.id, item.size)}
                                            className="text-[10px] uppercase tracking-widest text-gray-400 hover:text-black transition-colors pt-4 text-left w-fit cursor-pointer"
                                        >
                                            Xóa sản phẩm
                                        </button>
                                    </div>
                                </div>

                                {/* Price */}
                                <div className="hidden md:block col-span-2 text-center text-sm font-light">
                                    {formatPrice(item.price)}
                                </div>

                                {/* Quantity Selector */}
                                <div className="col-span-2 flex justify-center">
                                    <div className="flex items-center border border-gray-100">
                                        <button
                                            onClick={() => updateQuantity(item.id, item.size, -1)}
                                            className="px-3 py-2 hover:bg-gray-50 transition-colors cursor-pointer"
                                        >-</button>
                                        <span className="w-8 text-center text-xs font-medium">{item.quantity}</span>

                                        <button
                                            onClick={() => updateQuantity(item.id, item.size, 1)}
                                            className="px-3 py-2 hover:bg-gray-50 transition-colors cursor-pointer"
                                        >+</button>

                                    </div>
                                </div>

                                {/* Total */}
                                <div className="col-span-2 text-right font-medium text-sm">
                                    {formatPrice(item.price * item.quantity)}
                                </div>
                            </div>
                        ))}
                    </div>
                    <Link to="/shop" className="inline-flex items-center gap-3 text-[10px] uppercase tracking-[0.2em] font-bold text-gray-400 hover:text-black transition-colors">
                        <ArrowLeft size={16} />
                        Tiếp tục mua hàng
                    </Link>
                </div>

                {/* SUMMARY SIDEBAR */}
                <aside className="lg:col-span-4 lg:pl-8 space-y-10">
                    <div className="bg-[#f9f9f9] p-8 space-y-10">
                        <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] border-b border-gray-200 pb-4">Tóm tắt đơn hàng</h4>

                        <div className="space-y-4">
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-400">Tạm tính</span>
                                <span>{formatPrice(cartTotal)}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-400">Phí vận chuyển</span>
                                <span>{shipping === 0 ? 'Miễn phí' : formatPrice(shipping)}</span>
                            </div>
                            <div className="pt-4 border-t border-gray-200 flex justify-between font-bold">
                                <span className="uppercase text-[11px] tracking-widest">Tổng cộng</span>
                                <span className="text-lg">{formatPrice(total)}</span>
                            </div>
                        </div>

                        {/* Voucher */}
                        <div className="space-y-4 pt-4">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-black flex items-center gap-2">
                                Bạn có mã giảm giá?
                            </label>
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    placeholder="Nhập mã tại đây..."
                                    value={voucher}
                                    onChange={(e) => setVoucher(e.target.value)}
                                    className="flex-1 bg-white border border-gray-100 px-4 py-3 text-xs focus:outline-none focus:border-black transition-colors"
                                />
                                <button className="bg-black text-white px-6 py-3 text-[10px] font-bold uppercase tracking-widest hover:bg-gray-800 transition-all cursor-pointer">
                                    Áp dụng
                                </button>
                            </div>
                        </div>

                        {/* Checkout CTA */}
                        <div className="pt-6">
                            <p className="text-[10px] text-gray-400 mb-6 italic leading-relaxed">
                                Thuế và chi phí vận chuyển cuối cùng sẽ được tính cụ thể tại bước Thanh toán.
                            </p>
                            <span className="text-white"><Link to="/checkout" className="w-full bg-black py-5 text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-gray-800 transition-all cursor-pointer block text-center">
                                Tiến hành thanh toán
                            </Link></span>

                        </div>
                    </div>
                </aside>
            </div>
        </main>
    )
}

export default CartPage
