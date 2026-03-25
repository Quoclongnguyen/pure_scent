import React from 'react'

const HomePage = () => {
    return (
        <>
            <main className='min-h-screen bg-white'>
                <section className='w-full bg-[#f9f9f9] py-16 md:py-24'>
                    <div className='max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center'>
                        <div className='space-y-8'>
                            <div className='grid justify-center justify-items-start gap-6 items-center'>

                                <span className='text-xs  uppercase tracking-[0.3em] text-gray-400 font-medium'>
                                    Pure Scent Collection
                                </span>
                                <h1 className='font-serif text-5xl leading-tight text-black'>
                                    Khám phá <br />
                                    <span className='italic font-light '>Hương thơm</span>
                                    <br />Đẳng cấp
                                </h1>
                                <p className='text-gray-500 text-lg leading-relaxed max-w-md'>
                                    Chào mừng bạn đến với thế giới nước hoa tinh tế, nơi mỗi mùi hương
                                    là một câu chuyện kể về sự sang trọng và phong cách cá nhân.
                                </p>
                                <button className='bg-gray-500 text-white  p-4 uppercase text-xs tracking-widest hover:bg-gray-800 transition-all font-medium'>
                                    Mua Ngay
                                </button>
                            </div>
                        </div>


                        <div className='relative h-[450px] overflow-hidden rounded-[8px] shadow-2xl'>
                            <img
                                src="/src/assets/img1.png"
                                alt="Nước Hoa"
                                className='w-full h-full object-cover'
                            />
                        </div>
                    </div>


                </section>
            </main>

        </>




    )
}

export default HomePage