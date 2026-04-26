import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import api from '../utils/Axios'
import { Printer, CheckCircle2, CreditCard, Truck, Calendar, ArrowLeft, Phone, MapPin } from 'lucide-react'
import { toast } from 'sonner'

const OrderDetailsPage = () => {
    const { id } = useParams()
    const [order, setOrder] = useState(null)
    const [loading, setLoading] = useState(true)


    const BANK_ID = "MB"
    const ACCOUNT_NO = "9999999999"
    const ACCOUNT_NAME = "PURESCENT VIETNAM"

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const { data } = await api.get(`/api/orders/${id}`)
                setOrder(data)
                setLoading(false)
            } catch (error) {
                toast.error("Không thể tải đơn hàng")
                setLoading(false)
            }
        }
        fetchOrder()
    }, [id])

    if (loading) return <div className="min-h-screen flex items-center justify-center font-serif italic text-gray-400">Đang chuẩn bị đơn hàng...</div>
    if (!order) return <div className="min-h-screen flex items-center justify-center font-serif">Không tìm thấy đơn hàng</div>

    return (
        <main className="min-h-screen bg-gray-50/50 pt-24 pb-24 px-4 md:px-8">
            <div className="max-w-4xl mx-auto space-y-8">


                <div className="flex justify-between items-center print:hidden">
                    <Link to="/" className="text-[10px] uppercase tracking-[0.3em] text-gray-500 hover:text-black flex items-center gap-2">
                        <ArrowLeft size={14} /> Quay lại trang chủ
                    </Link>
                    <button onClick={() => window.print()} className="bg-black text-white px-6 py-3 text-[10px] uppercase tracking-[0.2em] font-bold flex items-center gap-3 hover:bg-gray-800 transition-all shadow-xl cursor-pointer">
                        <Printer size={16} /> In hóa đơn nhiệt
                    </button>
                </div>


                <div className="bg-white shadow-2xl border border-gray-100 overflow-hidden print:hidden">
                    {/* Header Web */}
                    <div className="bg-black text-white p-10 flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
                        <div>
                            <h1 className="text-3xl font-serif tracking-[0.3em] mb-2 uppercase">PureScent</h1>
                            <p className="text-[10px] uppercase tracking-widest opacity-60">Chi tiết đơn hàng của bạn</p>
                        </div>
                        <div className="bg-white/10 px-6 py-3 border border-white/20">
                            <p className="text-[10px] uppercase tracking-widest opacity-60 mb-1 font-bold text-center">Mã Đơn</p>
                            <p className="text-xl font-mono tracking-tighter">#{order._id.slice(-8).toUpperCase()}</p>
                        </div>
                    </div>

                    <div className="p-10 space-y-12">
                        {/* Status  */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-10 border-b border-gray-100">
                            <div className="space-y-2">
                                <p className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Trạng thái</p>
                                <div className="flex items-center gap-2">
                                    <CheckCircle2 className="text-green-500" size={18} />
                                    <span className="text-sm font-bold uppercase tracking-widest">{order.status}</span>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <p className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Ngày đặt</p>
                                <div className="flex items-center gap-2">
                                    <Calendar size={18} className="text-gray-400" />
                                    <span className="text-sm">{new Date(order.createdAt).toLocaleDateString('vi-VN')}</span>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <p className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Thanh toán</p>
                                <div className="flex items-center gap-2">
                                    <CreditCard size={18} className="text-gray-400" />
                                    <span className="text-sm font-bold">{order.paymentMethod}</span>
                                </div>
                            </div>
                        </div>

                        {/* Customer & Payment View */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
                            <div className="space-y-6">
                                <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold text-black border-l-2 border-black pl-3">Thông tin nhận hàng</h4>
                                <div className="bg-gray-50 p-6 space-y-3 text-sm">
                                    <p className="font-bold text-lg">{order.shippingAddress.fullname}</p>
                                    <p className="text-gray-500 flex items-center gap-2"><Phone size={14} /> {order.shippingAddress.phone}</p>
                                    <p className="text-gray-500 flex items-start gap-2"><MapPin size={14} className="mt-1" /> {order.shippingAddress.address}, {order.shippingAddress.city}</p>
                                </div>
                            </div>

                            {/* QR Section for Web */}
                            {order.paymentMethod === 'Chuyển khoản' && !order.isPaid && (
                                <div className="border border-dashed border-gray-200 p-8 flex flex-col items-center bg-gray-50/50">
                                    <p className="text-[9px] uppercase tracking-[0.2em] font-bold mb-4 text-gray-400">Quét để thanh toán đơn hàng</p>
                                    <img
                                        src={`https://img.vietqr.io/image/${BANK_ID}-${ACCOUNT_NO}-compact.png?amount=${order.totalPrice}&addInfo=THANH TOAN ${order._id.slice(-6).toUpperCase()}&accountName=${encodeURIComponent(ACCOUNT_NAME)}`}
                                        alt="VietQR"
                                        className="w-40 h-40 shadow-xl border-4 border-white mb-4"
                                    />
                                    <div className="text-center font-mono text-[11px] space-y-1">
                                        <p className="font-bold">{BANK_ID}: {ACCOUNT_NO}</p>
                                        <p className="opacity-60">{ACCOUNT_NAME}</p>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Items Table for Web */}
                        <div className="space-y-6">
                            <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold text-black border-l-2 border-black pl-3">Sản phẩm đã chọn</h4>
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead className="border-b border-gray-100">
                                        <tr className="text-left text-[10px] uppercase tracking-widest text-gray-400">
                                            <th className="py-4 font-bold">Sản phẩm</th>
                                            <th className="py-4 font-bold text-center">SL</th>
                                            <th className="py-4 font-bold text-right">Đơn giá</th>
                                            <th className="py-4 font-bold text-right">Tổng</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-50">
                                        {order.orderItems.map((item, index) => (
                                            <tr key={index}>
                                                <td className="py-6 flex items-center gap-4">
                                                    <img src={item.image} alt="" className="w-16 h-20 object-cover bg-gray-50" />
                                                    <div>
                                                        <p className="font-bold uppercase text-[11px] tracking-widest">{item.name}</p>
                                                        <p className="text-[10px] text-gray-400 mt-1">Phân loại: {item.size}</p>
                                                    </div>
                                                </td>
                                                <td className="py-6 text-center">x{item.quantity}</td>
                                                <td className="py-6 text-right">{item.price.toLocaleString()}đ</td>
                                                <td className="py-6 text-right font-bold">{(item.price * item.quantity).toLocaleString()}đ</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Summary for Web */}
                        <div className="flex justify-end border-t border-gray-100 pt-10">
                            <div className="w-full md:w-80 space-y-4">
                                <div className="flex justify-between text-xs text-gray-500">
                                    <span>Tạm tính</span>
                                    <span>{order.itemsPrice.toLocaleString()}đ</span>
                                </div>
                                <div className="flex justify-between text-xs text-gray-500">
                                    <span>Phí vận chuyển</span>
                                    <span>{order.shippingPrice.toLocaleString()}đ</span>
                                </div>
                                <div className="flex justify-between pt-4 border-t border-black font-bold">
                                    <span className="text-[11px] uppercase tracking-[0.2em]">Tổng cộng</span>
                                    <span className="text-2xl tracking-tighter">{order.totalPrice.toLocaleString()}đ</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 
                     ẨN TRÊN WEB - CHỈ HIỆN KHI IN
                 */}
                <div id="thermal-receipt" className="hidden print:block bg-white text-black font-mono text-[11px] leading-tight p-0 mx-auto w-[80mm]">

                    <div className="text-center space-y-1 mb-4">
                        <h1 className="text-xl font-serif uppercase tracking-[0.2em] mb-1">PureScent</h1>
                        <p className="text-[9px] font-bold">78d đường số 3, TP.HCM</p>
                        <p className="text-[9px]">Hotline: 0961 998 554</p>
                    </div>

                    <div className="border-t border-dashed border-black my-2"></div>


                    <div className="text-center font-bold uppercase my-3 text-[12px] tracking-widest">
                        Hóa đơn bán lẻ / Retail Receipt
                    </div>

                    {/* Info */}
                    <div className="space-y-1 mb-3">
                        <div className="flex justify-between">
                            <span>Ngày: {new Date(order.createdAt).toLocaleDateString('vi-VN')}</span>
                            <span>{new Date(order.createdAt).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}</span>
                        </div>
                        <p>Số HD: {order._id.slice(-8).toUpperCase()}</p>
                        <p>Khách: {order.shippingAddress.fullname}</p>
                    </div>

                    <div className="border-t border-black my-1"></div>

                    {/*  Table */}
                    <div className="grid grid-cols-12 font-bold my-1 text-[9px] uppercase">
                        <span className="col-span-6">Tên sản phẩm</span>
                        <span className="col-span-1 text-center">SL</span>
                        <span className="col-span-5 text-right">Thành tiền</span>
                    </div>
                    <div className="border-t border-dashed border-gray-400 mb-2"></div>

                    <div className="space-y-2">
                        {order.orderItems.map((item, index) => (
                            <div key={index} className="grid grid-cols-12 gap-1 items-start">
                                <div className="col-span-6 uppercase leading-tight">
                                    {item.name} <span className="text-[8px] block">({item.size})</span>
                                </div>
                                <span className="col-span-1 text-center">{item.quantity}</span>
                                <span className="col-span-5 text-right font-bold">{(item.price * item.quantity).toLocaleString()}</span>
                            </div>
                        ))}
                    </div>

                    <div className="border-t border-black my-3"></div>

                    {/* Receipt Totals */}
                    <div className="space-y-1">
                        <div className="flex justify-between">
                            <span>Tạm tính:</span>
                            <span>{order.itemsPrice.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Phí ship:</span>
                            <span>{order.shippingPrice.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between font-bold text-[13px] border-t border-dashed border-black pt-2 mt-2 uppercase">
                            <span>Tổng tiền:</span>
                            <span>{order.totalPrice.toLocaleString()} VND</span>
                        </div>
                    </div>

                    <div className="mt-4 text-[9px] italic">
                        <p>HTTT: {order.paymentMethod}</p>
                        <p>Trạng thái: {order.isPaid ? "Đã thanh toán" : "Chờ xác nhận"}</p>
                    </div>

                    <div className="border-t border-dashed border-black my-4"></div>


                    <div className="text-center space-y-3">
                        <p className="font-bold uppercase text-[9px]">Cảm ơn quý khách đã mua sắm!</p>
                        <p className="text-[8px] opacity-70">Vui lòng kiểm tra hàng trước khi thanh toán.</p>


                        <div className="flex flex-col items-center pt-2">
                            <div className="h-8 w-full bg-[repeating-linear-gradient(90deg,black,black_2px,transparent_2px,transparent_4px)] opacity-80"></div>
                            <p className="text-[8px] font-bold mt-1 uppercase tracking-widest">{order._id.slice(-12)}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/*  ĐIỀU KHIỂN HIỂN THỊ KHI IN */}
            <style dangerouslySetInnerHTML={{
                __html: `
                @media print {
                    @page { margin: 0; size: 80mm auto; }
                    body { background: white !important; padding: 0 !important; margin: 0 !important; }
                    main { padding: 0 !important; background: white !important; margin: 0 !important; }
                    .max-w-4xl { max-width: 100% !important; margin: 0 !important; }
                    .print\\:hidden, nav, footer, header { display: none !important; }
                    
                    /* Bật hiển thị cho hóa đơn nhiệt khi in */
                    #thermal-receipt { 
                        display: block !important; 
                        width: 80mm !important; 
                        padding: 10mm 5mm !important;
                    }
                }
            ` }} />
        </main>
    )
}

export default OrderDetailsPage
