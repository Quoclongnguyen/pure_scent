import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronRight, CreditCard, Landmark, Truck, ShieldCheck, MapPin } from 'lucide-react'


const cartItems = [
    { id: 1, name: "Santal 33", price: 5500000, quantity: 1, image: "/src/assets/img1.png" },
    { id: 2, name: "Another 13", price: 5200000, quantity: 1, image: "/src/assets/img1.png" }
];

const CheckoutPage = () => {
    const [paymentMethod, setPaymentMethod] = useState('cod');

    const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const shipping = subtotal > 5000000 ? 0 : 35000;
    const total = subtotal + shipping;

    const formatPrice = (num) => num.toLocaleString('vi-VN') + 'đ';

    return (
        <main className="min-h-screen bg-white pb-24">

            <div className="max-w-7xl mx-auto px-6 py-12">
                <h1 className="font-serif text-3xl uppercase tracking-widest">Thanh toán</h1>
                <nav className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-gray-400 mb-4">
                    <Link to="/" className="hover:text-black transition-colors">Trang chủ</Link>
                    <span>/</span>
                    <Link to="/cart" className="hover:text-black transition-colors">Giỏ hàng</Link>
                    <span>/</span>
                    <span className="text-black">Thanh toán</span>
                </nav>

            </div>

            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16">


                <div className="lg:col-span-7 space-y-16">

                    {/* Shipping Info */}
                    <section className="space-y-8">
                        <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
                            <MapPin size={20} strokeWidth={1.5} />
                            <h3 className="text-xs font-bold uppercase tracking-[0.2em]">Thông tin giao hàng</h3>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-[10px] uppercase tracking-widest font-bold">
                                    Họ và tên</label>
                                <input type="text" placeholder="Nguyễn Văn A" className="w-full border-b border-gray-200 py-3 focus:outline-none focus:border-black transition-colors text-sm" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] uppercase tracking-widest font-bold">
                                    Số điện thoại</label>
                                <input type="tel" placeholder="0901 234 567" className="w-full border-b border-gray-200 py-3 focus:outline-none focus:border-black transition-colors text-sm" />
                            </div>
                            <div className="md:col-span-2 space-y-2">
                                <label className="text-[10px] uppercase tracking-widest font-bold">
                                    Email nhận hóa đơn</label>
                                <input type="email" placeholder="example@gmail.com" className="w-full border-b border-gray-200 py-3 focus:outline-none focus:border-black transition-colors text-sm" />
                            </div>
                            <div className="md:col-span-2 space-y-2">
                                <label className="text-[10px] uppercase tracking-widest font-bold">
                                    Địa chỉ giao hàng</label>
                                <input type="text" placeholder="Số nhà, tên đường, phường/xã..." className="w-full border-b border-gray-200 py-3 focus:outline-none focus:border-black transition-colors text-sm" />
                            </div>
                        </div>

                        {/* Order Note */}
                        <div className="space-y-2 pt-4">
                            <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400 italic">
                                Ghi chú đơn hàng (Tùy chọn)
                            </label>
                            <textarea rows="2" placeholder="Ví dụ: Giao giờ hành chính, gọi trước khi đến..." className="w-full border border-gray-100 p-4 focus:outline-none focus:border-black transition-colors text-sm bg-gray-50/30"></textarea>
                        </div>
                    </section>



                    {/* Payment Methods */}
                    <section className="space-y-8">
                        <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
                            <CreditCard size={20} strokeWidth={1.5} />
                            <h3 className="text-xs font-bold uppercase tracking-[0.2em]">
                                Phương thức thanh toán
                            </h3>
                        </div>

                        <div className="space-y-4">
                            {/* COD Option */}
                            <label className={`flex items-center justify-between p-6 border transition-all cursor-pointer ${paymentMethod === 'cod'
                                ? 'border-black bg-gray-50'
                                : 'border-gray-100 hover:border-gray-300'}`}>
                                <div className="flex items-center gap-4">
                                    <input type="radio" name="payment" checked={paymentMethod === 'cod'} onChange={() => setPaymentMethod('cod')} className="accent-black" />
                                    <div>
                                        <p className="text-xs font-bold uppercase tracking-widest">
                                            Thanh toán khi nhận hàng (COD)
                                        </p>
                                        <p className="text-[11px] text-gray-400 mt-1">
                                            Trả tiền mặt khi Shipper giao hàng đến nơi.
                                        </p>
                                    </div>
                                </div>
                                <Truck size={20} strokeWidth={1} className="text-gray-400" />
                            </label>

                            {/* Bank Transfer Option */}
                            <div className="space-y-0">
                                <label className={`flex items-center justify-between p-6 border transition-all cursor-pointer ${paymentMethod === 'bank'
                                    ? 'border-black border-b-0 bg-gray-50'
                                    : 'border-gray-100 hover:border-gray-300'}`}>
                                    <div className="flex items-center gap-4">
                                        <input type="radio" name="payment" checked={paymentMethod === 'bank'} onChange={() => setPaymentMethod('bank')} className="accent-black" />
                                        <div>
                                            <p className="text-xs font-bold uppercase tracking-widest">Chuyển khoản ngân hàng</p>
                                            <p className="text-[11px] text-gray-400 mt-1">Quét mã QR hoặc chuyển khoản thủ công.</p>
                                        </div>
                                    </div>
                                    <Landmark size={20} strokeWidth={1} className="text-gray-400" />
                                </label>

                                {/*QR + Details */}
                                {paymentMethod === 'bank' && (
                                    <div className="p-8 border border-black border-t-0 bg-gray-50 flex flex-col md:flex-row gap-10 items-center justify-center animate-in fade-in slide-in-from-top-4 duration-500">
                                        {/* QR Code Placeholder */}

                                        <div className="w-40 h-40 bg-white p-2 border border-gray-200 rotate-0 hover:rotate-3 transition-transform">
                                            <div className="w-full h-full bg-gray-100 flex items-center justify-center text-[10px] text-gray-400 uppercase tracking-widest text-center">
                                                [VietQR code]
                                            </div>
                                        </div>

                                        {/* Bank Details */}
                                        <div className="space-y-4 text-center md:text-left">
                                            <div>
                                                <p className="text-[9px] uppercase tracking-widest text-gray-400 font-bold mb-1">
                                                    Ngân hàng</p>
                                                <p className="text-xs font-bold">
                                                    Vietcombank - CN TP.HCM</p>
                                            </div>
                                            <div>
                                                <p className="text-[9px] uppercase tracking-widest text-gray-400 font-bold mb-1">
                                                    Số tài khoản</p>
                                                <p className="text-lg font-serif">
                                                    123 456 789 000</p>
                                            </div>
                                            <div>
                                                <p className="text-[9px] uppercase tracking-widest text-gray-400 font-bold mb-1">
                                                    Chủ tài khoản</p>
                                                <p className="text-xs font-bold uppercase"
                                                >CONG TY PURESCENT VIET NAM</p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </section>
                </div>

                {/* 2 RIGHT*/}
                <aside className="lg:col-span-5">
                    <div className="sticky top-24 space-y-10">
                        <div className="bg-[#fcfcfc] p-8 border border-gray-50 space-y-8">
                            <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] border-b border-gray-100 pb-4">
                                Tóm tắt đơn hàng
                            </h4>

                            {/* Simple Product List */}
                            <div className="space-y-6">
                                {cartItems.map(item => (
                                    <div key={item.id} className="flex gap-4 items-center">
                                        <div className="relative w-16 h-20 bg-white">
                                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                            <span className="absolute -top-2 -right-2 w-5 h-5 bg-black text-white text-[9px] flex items-center justify-center rounded-full font-bold">{item.quantity}</span>
                                        </div>
                                        <div className="flex-1 space-y-1">
                                            <h5 className="text-[11px] font-bold uppercase tracking-widest">{item.name}</h5>
                                            <p className="text-[10px] text-gray-400">100ml / Unisex</p>
                                        </div>
                                        <p className="text-xs font-medium">{formatPrice(item.price)}</p>
                                    </div>
                                ))}
                            </div>

                            {/* Totals */}
                            <div className="space-y-4 pt-4 border-t border-gray-100">
                                <div className="flex justify-between text-xs">
                                    <span className="text-gray-400">Tạm tính</span>
                                    <span>{formatPrice(subtotal)}</span>
                                </div>
                                <div className="flex justify-between text-xs">
                                    <span className="text-gray-400">Phí vận chuyển</span>
                                    <span>{shipping === 0 ? 'Miễn phí' : formatPrice(shipping)}</span>
                                </div>
                                <div className="pt-4 border-t border-black flex justify-between font-bold">
                                    <span className="uppercase text-[11px] tracking-widest">Tổng thanh toán</span>
                                    <span className="text-xl">{formatPrice(total)}</span>
                                </div>
                            </div>


                            <div className="flex items-center gap-3 bg-white p-4 text-[10px] text-gray-500 italic">
                                <ShieldCheck size={16} className="text-black" />
                                <p>Bảo mật thông tin thanh toán hoàn toàn.</p>
                            </div>


                            <button className="w-full bg-black text-white py-5 text-[11px] font-bold uppercase tracking-[0.4em] hover:bg-gray-800 transition-all cursor-pointer">
                                Đặt hàng ngay
                            </button>
                        </div>
                    </div>
                </aside>
            </div>
        </main>
    )
}

export default CheckoutPage
