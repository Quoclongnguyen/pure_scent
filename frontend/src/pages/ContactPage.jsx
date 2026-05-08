import React from 'react'
import { MapPin, Phone, Mail, Clock } from 'lucide-react'
import { toast } from 'sonner'

const ContactPage = () => {
    const handleSubmit = (e) => {
        e.preventDefault()
        toast.info("Chức năng gửi tin nhắn đang được bảo trì. Vui lòng liên hệ qua Hotline!")
    }

    return (
        <main className="min-h-screen bg-white pt-24 pb-20">
            <div className="max-w-6xl mx-auto px-4 mt-10">

                <div className="text-center mb-20">
                    <h1 className="text-4xl md:text-5xl font-serif tracking-[0.2em] uppercase mb-6">Liên Hệ Với Chúng Tôi</h1>
                    <p className="text-gray-500 italic font-serif text-lg">Chúng tôi luôn sẵn lòng lắng nghe và hỗ trợ bạn trên hành trình tìm kiếm mùi hương.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24">
                    {/* CONTACT INFO */}
                    <div className="space-y-12">
                        <div className="space-y-6">
                            <h2 className="text-2xl font-serif uppercase tracking-widest border-b border-gray-200 pb-4 inline-block">Thông tin cửa hàng</h2>
                            <p className="text-sm text-gray-500 leading-relaxed">
                                Đội ngũ chuyên gia mùi hương của PureScent luôn sẵn sàng tư vấn và giải đáp mọi thắc mắc của bạn. Đừng ngần ngại ghé thăm cửa hàng hoặc liên hệ với chúng tôi qua các kênh dưới đây.
                            </p>

                            <div className="space-y-8 pt-6">
                                <div className="flex items-start gap-6 group">
                                    <div className="w-12 h-12 bg-gray-50 flex items-center justify-center rounded-full group-hover:bg-black group-hover:text-white transition-colors duration-300">
                                        <MapPin size={20} />
                                    </div>
                                    <div>
                                        <p className="font-bold uppercase tracking-widest text-xs mb-2">Địa chỉ</p>
                                        <p className="text-sm text-gray-600">78d đường số 3, TP.HCM</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-6 group">
                                    <div className="w-12 h-12 bg-gray-50 flex items-center justify-center rounded-full group-hover:bg-black group-hover:text-white transition-colors duration-300">
                                        <Phone size={20} />
                                    </div>
                                    <div>
                                        <p className="font-bold uppercase tracking-widest text-xs mb-2">Hotline (Zalo/Viber)</p>
                                        <p className="text-sm text-gray-600">0961 998 556</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-6 group">
                                    <div className="w-12 h-12 bg-gray-50 flex items-center justify-center rounded-full group-hover:bg-black group-hover:text-white transition-colors duration-300">
                                        <Mail size={20} />
                                    </div>
                                    <div>
                                        <p className="font-bold uppercase tracking-widest text-xs mb-2">Email hỗ trợ</p>
                                        <p className="text-sm text-gray-600">support@purescent.vn</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-6 group">
                                    <div className="w-12 h-12 bg-gray-50 flex items-center justify-center rounded-full group-hover:bg-black group-hover:text-white transition-colors duration-300">
                                        <Clock size={20} />
                                    </div>
                                    <div>
                                        <p className="font-bold uppercase tracking-widest text-xs mb-2">Giờ mở cửa</p>
                                        <p className="text-sm text-gray-600">Thứ 2 - Chủ Nhật: 9:00 - 21:30</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* CONTACT FORM */}
                    <div className="bg-gray-50 p-8 md:p-12">
                        <h2 className="text-2xl font-serif uppercase tracking-widest mb-10 text-center">Gửi Lời Nhắn</h2>
                        <form className="space-y-8" onSubmit={handleSubmit}>
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Họ và tên *</label>
                                <input
                                    required
                                    type="text"
                                    className="w-full border-b border-gray-300 py-3 bg-transparent focus:outline-none focus:border-black transition-colors text-sm"
                                    placeholder="Ví dụ: Nguyễn Văn A"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Email hoặc Số điện thoại *</label>
                                <input
                                    required
                                    type="text"
                                    className="w-full border-b border-gray-300 py-3 bg-transparent focus:outline-none focus:border-black transition-colors text-sm"
                                    placeholder="Để chúng tôi có thể phản hồi cho bạn"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Nội dung lời nhắn *</label>
                                <textarea
                                    required
                                    rows="5"
                                    className="w-full border-b border-gray-300 py-3 bg-transparent focus:outline-none focus:border-black transition-colors resize-none text-sm"
                                    placeholder="Bạn đang quan tâm đến sản phẩm nào, hay cần tư vấn mùi hương?"
                                ></textarea>
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-black text-white py-5 text-[10px] uppercase font-bold tracking-[0.2em] hover:bg-gray-800 transition-colors shadow-lg"
                            >
                                Gửi Tin Nhắn
                            </button>
                        </form>
                    </div>
                </div>
            </div>


        </main>
    )
}

export default ContactPage
