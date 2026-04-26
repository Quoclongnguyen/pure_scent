import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ChevronRight, CreditCard, Landmark, Truck, ShieldCheck, MapPin } from 'lucide-react'
import CartContext from '../context/CartContext';
import AuthContext from '../context/AuthContext';
import { toast } from 'sonner';
import api from '../utils/Axios'



const CheckoutPage = () => {
    const navigate = useNavigate()
    const { cartItems, cartTotal, cartCount } = useContext(CartContext)
    const { userInfo } = useContext(AuthContext)
    const [shippingAddress, setShippingAddress] = useState({
        fullname: userInfo?.name || '',
        phone: '',
        address: '',
        city: '',
        note: ''
    })
    const [paymentMethod, setPaymentMethod] = useState('Chuyển khoản')

    const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const shippingPrice = subtotal > 1000000 ? 0 : 35000;
    const totalPrice = cartTotal + shippingPrice;

    const formatPrice = (num) => num.toLocaleString('vi-VN') + 'đ';

    const handleChange = (e) => {
        setShippingAddress({ ...shippingAddress, [e.target.name]: e.target.value })
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        if (cartItems.length === 0) {
            toast.error("Giỏ hàng đang trống!")
            return
        }
        try {
            const orderData = {
                orderItems: cartItems,
                shippingAddress,
                paymentMethod,
                itemsPrice: cartTotal,
                shippingPrice,
                totalPrice
            }
            const { data } = await api.post('/api/orders', orderData)
            toast.success("Đặt hàng thành công!")
            // Chuyển đến trang chi tiết đơn hàng để hiện mã QR
            navigate(`/order/${data._id}`)
        } catch (error) {
            toast.error(error.response?.data?.message || "Có lỗi khi đặt hàng")
        }
    }

    if (cartCount === 0) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center p-4">
                <h2 className="text-2xl font-light mb-4">Giỏ hàng của bạn đang trống</h2>
                <button onClick={() => navigate('/')} className="px-8 py-3 bg-black text-white uppercase text-xs tracking-widest hover:bg-gray-800 transition-all"> Quay lại mua sắm </button>
            </div>
        )
    }
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
                    <form onSubmit={handleSubmit}>
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
                                    <input required name="fullname"
                                        value={shippingAddress.fullname}
                                        onChange={handleChange}
                                        className="w-full border-b border-gray-200 py-3 focus:outline-none focus:border-black transition-colors text-sm" />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase tracking-widest font-bold">
                                        Số điện thoại</label>
                                    <input required name="phone"
                                        value={shippingAddress.phone}
                                        onChange={handleChange}
                                        placeholder="0123 456 789"
                                        className="w-full border-b border-gray-200 py-3 focus:outline-none focus:border-black transition-colors text-sm" />
                                </div>

                                <div className="md:col-span-2 space-y-2">
                                    <label className="text-[10px] uppercase tracking-widest font-bold">
                                        Email nhận hóa đơn</label>
                                    <input type="email" placeholder="example@gmail.com" className="w-full border-b border-gray-200 py-3 focus:outline-none focus:border-black transition-colors text-sm" />
                                </div>
                                <div className="md:col-span-2 space-y-2">
                                    <label className="text-[10px] uppercase tracking-widest font-bold">
                                        Địa chỉ giao hàng</label>
                                    <input required name="address"
                                        value={shippingAddress.address}
                                        onChange={handleChange}
                                        placeholder="Số nhà, tên đường, phường/xã..."
                                        className="w-full border-b border-gray-200 py-3 focus:outline-none focus:border-black transition-colors text-sm" />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase tracking-widest text-gray-400">Tỉnh / Thành phố</label>
                                    <input required name="city" value={shippingAddress.city} onChange={handleChange} className="w-full border-b border-gray-200 py-2 outline-none focus:border-black transition-colors text-sm" placeholder="Ví dụ: Hà Nội" />
                                </div>
                            </div>

                            {/* Order Note */}
                            <div className="space-y-2 pb-5">
                                <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400 italic">
                                    Ghi chú đơn hàng (Tùy chọn)
                                </label>
                                <input name="note"
                                    value={shippingAddress.note}
                                    onChange={handleChange}
                                    placeholder="Ví dụ: Giao giờ hành chính, gọi trước khi đến..."
                                    className="w-full border border-gray-100 p-4 focus:outline-none focus:border-black transition-colors text-sm bg-gray-50/30">

                                </input>
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
                                <label className={`flex items-center justify-between p-6 border transition-all cursor-pointer 
                                 ${paymentMethod === 'COD' ?
                                        'border-black' :
                                        'border-gray-100'}`}>
                                    <div className="flex items-center gap-4">
                                        <input type="radio" name="payment"
                                            checked={paymentMethod === 'COD'}
                                            onChange={() =>
                                                setPaymentMethod('COD')}
                                            className="accent-black" />
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
                                    <label className={`flex items-center justify-between p-6 border transition-all cursor-pointer
                                         ${paymentMethod === 'Chuyển khoản'
                                            ? 'border-black'
                                            : 'border-gray-100'}`}>
                                        <div className="flex items-center gap-4">
                                            <input type="radio" name="payment"
                                                checked={paymentMethod === 'Chuyển khoản'}
                                                onChange={() => setPaymentMethod('Chuyển khoản')} className="accent-black" />
                                            <div>
                                                <p className="text-xs font-bold uppercase tracking-widest">Chuyển khoản ngân hàng</p>
                                                <p className="text-[11px] text-gray-400 mt-1">Quét mã QR hoặc chuyển khoản thủ công.</p>
                                            </div>
                                        </div>
                                        <Landmark size={20} strokeWidth={1} className="text-gray-400" />
                                    </label>


                                </div>
                            </div>
                        </section>
                    </form>
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
                                    <span>{shippingPrice === 0 ? 'Miễn phí' : formatPrice(shippingPrice)}</span>
                                </div>
                                <div className="pt-4 border-t border-black flex justify-between font-bold">
                                    <span className="uppercase text-[11px] tracking-widest">Tổng thanh toán</span>
                                    <span className="text-xl">{formatPrice(totalPrice)}</span>
                                </div>
                            </div>


                            <div className="flex items-center gap-3 bg-white p-4 text-[10px] text-gray-500 italic">
                                <ShieldCheck size={16} className="text-black" />
                                <p>Bảo mật thông tin thanh toán hoàn toàn.</p>
                            </div>


                            <button onClick={handleSubmit} className="w-full bg-black text-white py-5 text-[11px] font-bold uppercase tracking-[0.4em] hover:bg-gray-800 transition-all cursor-pointer">
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
