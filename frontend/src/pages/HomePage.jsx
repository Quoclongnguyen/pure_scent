import React, { useState } from 'react'
import ProductCard from '../components/productCard/ProductCard'
const mockProducts = [
    { id: 1, name: "Santal 33", brand: "Le Labo", gender: "Unisex", price: "5.500.000đ", image: "/src/assets/img1.png" },
    { id: 2, name: "Another 13", brand: "Le Labo", gender: "Men", price: "5.200.000đ", image: "/src/assets/img1.png" },
    { id: 3, name: "Rose 31", brand: "Le Labo", gender: "Women", price: "4.800.000đ", image: "/src/assets/img1.png" },
    { id: 5, name: "Lys 41", brand: "Le Labo", gender: "Women", price: "5.000.000đ", image: "/src/assets/img1.png" },
    { id: 6, name: "Lys 41", brand: "Le Labo", gender: "Men", price: "5.000.000đ", image: "/src/assets/img1.png" },
    { id: 7, name: "Lys 41", brand: "Le Labo", gender: "Women", price: "5.000.000đ", image: "/src/assets/img1.png" },
    { id: 8, name: "Lys 41", brand: "Le Labo", gender: "Men", price: "5.000.000đ", image: "/src/assets/img1.png" },
    { id: 9, name: "Lys 41", brand: "Le Labo", gender: "Men", price: "5.000.000đ", image: "/src/assets/img1.png" },

];
const HomePage = () => {
    const [filter, setFilter] = useState("All")

    const filterredProducts = filter === "All" ? mockProducts : mockProducts.filter(p => p.gender === filter)

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
                                <button className='bg-gray-500 text-white  p-4 uppercase text-xs tracking-widest hover:bg-gray-800 transition-all font-medium cursor-pointer'>
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

                <section className='max-w-7xl mx-auto px-10 py-20'>

                    <h2 className='font-serif text-3xl text-center mb-16 uppercase tracking-widest'>
                        Sản phẩm mới nhất
                    </h2>
                    <div className='flex justify-center gap-10 mb-16 text-xs uppercase tracking-[0.2rem] font-medium'>
                        {['All', 'Men', 'Women', 'Unisex'].map((cat) =>
                            <button
                                key={cat}
                                onClick={() => setFilter(cat)}
                                className={`cursor-pointer transition-all ${filter === cat
                                    ? 'text-black border-b border-black pb-1'
                                    : 'text-gray-400 hover:text-black'} `}
                            >
                                {cat === 'All' ? 'Tất cả' : cat}
                            </button>
                        )}
                    </div>


                    {/* Grid chia 4 cột trên máy tính, 2 cột trên điện thoại */}
                    <div className='grid grid-cols-2 lg:grid-cols-4 gap-10'>
                        {filterredProducts.map((item) => (
                            <ProductCard key={item.id} product={item} />
                        ))}

                    </div>

                </section>

            </main >

        </>




    )
}

export default HomePage