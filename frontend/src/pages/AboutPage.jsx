import React from 'react'
import { Link } from 'react-router-dom'

const AboutPage = () => {
    return (
        <main className="min-h-screen bg-white pt-24 pb-20">
            {/* HERO SECTION */}
            <div className="max-w-4xl mx-auto px-4 text-center mb-24 mt-10">
                <h1 className="text-4xl md:text-5xl font-serif tracking-[0.2em] uppercase mb-8">Câu Chuyện Của PureScent</h1>
                <p className="text-gray-500 max-w-2xl mx-auto leading-relaxed italic font-serif text-lg">
                    "Hương thơm không chỉ là một món trang sức vô hình, mà còn là bản ngã,
                    là ký ức và là cách bạn kể câu chuyện của chính mình mà không cần dùng đến ngôn từ."
                </p>
            </div>

            {/* CONTENT SECTION */}
            <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-32">
                <div className="space-y-8 pr-0 md:pr-10">
                    <h2 className="text-2xl font-serif uppercase tracking-widest border-b border-black pb-4 inline-block">Khởi Nguyên</h2>
                    <div className="space-y-6 text-gray-600 leading-loose text-sm">
                        <p>
                            Được thành lập vào năm 2026, PureScent ra đời từ niềm đam mê mãnh liệt với thế giới chế tác mùi hương. Chúng tôi tin rằng mỗi người đều xứng đáng sở hữu một lọ nước hoa mang đậm dấu ấn cá nhân, một "chữ ký mùi hương" (Signature Scent) không thể nhầm lẫn.
                        </p>
                        <p>
                            Tại PureScent, chúng tôi không chỉ bán nước hoa. Chúng tôi mang đến những tác phẩm nghệ thuật khứu giác được tuyển chọn khắt khe từ những thương hiệu danh tiếng nhất trên thế giới. Mỗi sản phẩm đặt trên kệ của chúng tôi đều mang trong mình một câu chuyện riêng, chờ đợi người phù hợp để đánh thức.
                        </p>
                    </div>
                    <div className="pt-4">
                        <Link to="/shop" className="inline-block border border-black text-black px-8 py-4 text-[10px] uppercase font-bold tracking-[0.2em] hover:bg-black hover:text-white transition-colors">
                            Khám phá Bộ Sưu Tập
                        </Link>
                    </div>
                </div>
                <div className="h-[500px] bg-gray-100 flex items-center justify-center relative overflow-hidden group">
                    <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-700"></div>
                    <img
                        src="https://theme.hstatic.net/200000860799/1001299126/14/featured_coll_1_1_img.jpg?v=289"
                        alt="PureScent Store"
                        className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-1000 scale-105 group-hover:scale-100"
                    />
                </div>
            </div>

            {/* CORE VALUES */}
            <div className="bg-gray-50 py-24">
                <div className="max-w-6xl mx-auto px-4">
                    <h2 className="text-center text-3xl font-serif tracking-[0.2em] uppercase mb-20">Giá Trị Cốt Lõi</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-16 text-center">
                        <div className="space-y-6 bg-white p-10 shadow-sm hover:shadow-md transition-shadow">
                            <div className="w-12 h-12 bg-black text-white mx-auto flex items-center justify-center font-serif text-xl italic">A</div>
                            <h3 className="font-bold uppercase tracking-[0.2em] text-sm">Authenticity</h3>
                            <p className="text-xs text-gray-500 leading-relaxed">Cam kết 100% sản phẩm chính hãng, minh bạch trong nguồn gốc xuất xứ, hoàn tiền nếu phát hiện hàng giả.</p>
                        </div>
                        <div className="space-y-6 bg-white p-10 shadow-sm hover:shadow-md transition-shadow">
                            <div className="w-12 h-12 bg-black text-white mx-auto flex items-center justify-center font-serif text-xl italic">E</div>
                            <h3 className="font-bold uppercase tracking-[0.2em] text-sm">Exclusivity</h3>
                            <p className="text-xs text-gray-500 leading-relaxed">Bộ sưu tập đa dạng từ Designer đến Niche Perfume độc bản, hiếm có và ít đụng hàng.</p>
                        </div>
                        <div className="space-y-6 bg-white p-10 shadow-sm hover:shadow-md transition-shadow">
                            <div className="w-12 h-12 bg-black text-white mx-auto flex items-center justify-center font-serif text-xl italic">E</div>
                            <h3 className="font-bold uppercase tracking-[0.2em] text-sm">Experience</h3>
                            <p className="text-xs text-gray-500 leading-relaxed">Trải nghiệm mua sắm đẳng cấp, tư vấn tận tâm và chuyên nghiệp để tìm ra mùi hương thuộc về bạn.</p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default AboutPage
