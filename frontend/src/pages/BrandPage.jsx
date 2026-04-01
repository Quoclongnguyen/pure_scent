import React from 'react'
import { Link } from 'react-router-dom';
import { Star, Shield, Zap } from 'lucide-react';

const BrandPage = () => {
    return (
        <main className='min-h-screen bg-white'>
            {/* 1. HERO SECTION */}
            <section className='h-[30vh] flex flex-col items-center justify-center text-center px-6 bg-[#fcfcfc] pt-6'>
                <span className='text-[10px] uppercase tracking-[0.4em] text-gray-400 mb-8 font-medium'>
                    The Essence of Elegance
                </span>
                <h1 className='font-serif text-5xl md:text-7xl text-black leading-tight max-w-4xl'>
                    Nghệ Thuật Của <br />
                    <span className='italic font-light text-gray-600'>Những Nốt Hương</span>
                </h1>
                <div className='w-px h-24 bg-gray-200 mt-12 animate-pulse'></div>
            </section>

            {/* 2. OUR STORY SECTION */}
            <section className='max-w-7xl mx-auto px-6 py-32 grid grid-cols-1 md:grid-cols-2 gap-24 items-center'>
                <div className='relative group'>
                    <div className='aspect-[4/5] overflow-hidden rounded-[8px]'>
                        <img
                            src="/src/assets/img1.png"
                            alt="Brand Story"
                            className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000'
                        />
                    </div>
                    {/* Floating Accent */}
                    <div className='absolute -bottom-10 -right-10 w-48 h-48 bg-[#f9f9f9] -z-10 rounded-[8px]'></div>
                </div>

                <div className='space-y-8'>
                    <h2 className='font-serif text-4xl text-black'>Hành trình tìm kiếm <br /> <span className='italic'>Cái đẹp tinh khiết</span></h2>
                    <div className='w-12 h-px bg-black'></div>
                    <p className='text-gray-500 leading-relaxed text-lg'>
                        PureScent bắt đầu từ một niềm tin đơn giản: nước hoa không chỉ là mùi hương, mà là một ngôn ngữ thầm lặng định nghĩa bản sắc cá nhân.
                        Chúng tôi đi khắp thế giới để tìm kiếm những nguyên liệu tinh túy nhất — từ nụ hồng Grasse đến gỗ đàn hương Mysore.
                    </p>
                    <p className='text-gray-500 leading-relaxed text-lg'>
                        Mỗi chai nước hoa PureScent ra đời là kết quả của hàng ngàn giờ thử nghiệm, cân bằng tỉ mỉ để tạo ra những tầng hương có khả năng "đánh thức" ký ức và cảm xúc.
                    </p>
                </div>
            </section>

            {/* 3. CORE VALUES */}
            <section className='bg-[#1a1a1a] text-white py-32'>
                <div className='max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-16'>
                    <div className='space-y-6 text-center md:text-left'>
                        <Star size={24} strokeWidth={1} className='mx-auto md:mx-0 text-gray-400' />
                        <h4 className='text-xs font-bold uppercase tracking-[0.2em]'>Nguyên liệu tinh khiết</h4>
                        <p className='text-gray-400 text-sm leading-relaxed'>
                            Cam kết 100% tinh dầu tự nhiên, được thu hoạch vào thời điểm hoàn hảo nhất để tối ưu hóa mùi hương.
                        </p>
                    </div>

                    <div className='space-y-6 text-center md:text-left'>
                        <Shield size={24} strokeWidth={1} className='mx-auto md:mx-0 text-gray-400' />
                        <h4 className='text-xs font-bold uppercase tracking-[0.2em]'>Sáng tạo độc bản</h4>
                        <p className='text-gray-400 text-sm leading-relaxed'>
                            Hợp tác với những nhà làm hương (Perfumers) hàng đầu thế giới để tạo ra những mùi hương không thể sao chép.
                        </p>
                    </div>

                    <div className='space-y-6 text-center md:text-left'>
                        <Zap size={24} strokeWidth={1} className='mx-auto md:mx-0 text-gray-400' />
                        <h4 className='text-xs font-bold uppercase tracking-[0.2em]'>Lưu hương bền lâu</h4>
                        <p className='text-gray-400 text-sm leading-relaxed'>
                            Công nghệ chiết xuất hiện đại giúp các nốt hương ổn định và bám tỏa ấn tượng suốt cả ngày dài.
                        </p>
                    </div>
                </div>
            </section>

            {/* 4. INSPIRATION QUOTE */}
            <section className='py-48 px-6 text-center'>
                <div className='max-w-3xl mx-auto space-y-12'>
                    <h3 className='font-serif text-3xl md:text-5xl italic text-gray-800 leading-tight'>
                        "Mùi hương là thứ trang phục cuối cùng bạn khoác lên người trước khi ra khỏi cửa."
                    </h3>
                    <div className='flex flex-col items-center gap-8'>
                        <div className='w-12 h-px bg-black'></div>
                        <Link
                            to="/shop"
                            className='inline-block border border-black px-12 py-5 text-[10px] font-bold uppercase tracking-[0.4em] hover:bg-black hover:text-white transition-all duration-500'
                        >
                            Khám phá bộ sưu tập
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default BrandPage