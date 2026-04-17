import React, { useEffect, useState } from 'react'
import ProductCard from '../components/productCard/ProductCard'
import api from '../utils/Axios'
import { Link } from 'react-router-dom'
const HomePage = () => {
    const [filter, setFilter] = useState("All")
    const [loading, setLoading] = useState(true)
    const [products, setProducts] = useState([])

    const fetchProducts = async () => {
        try {
            const res = await api.get('/api/products')
            setProducts(res.data.products)
            setLoading(false)
        } catch (error) {
            console.error("Lỗi khi Get sản phẩm: ", error)
            setLoading(false)
        }
    }
    useEffect(() => {
        fetchProducts()
    }, [])
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
                        {products.map((item) => (
                            <div key={item._id} className="opacity-80 hover:opacity-100 transition-opacity">
                                <ProductCard product={item} />
                            </div>
                        ))}
                    </div>
                    <div className='flex justify-center items-center mt-8 text-white '>
                        <Link to="/shop" className='bg-gray-500  p-4 uppercase text-xs tracking-widest hover:bg-gray-800 transition-all font-medium cursor-pointer'>
                            Xem tất cả</Link>
                    </div>


                </section>

                <section className='w-full bg-[#f9f9f9] py-16 md:py-24'>
                    <div className='max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center'>
                        <div className='relative h-[450px] overflow-hidden rounded-[8px] shadow-2xl'>
                            <img
                                src="/src/assets/img1.png"
                                alt="Nước Hoa"
                                className='w-full h-full object-cover'
                            />
                        </div>
                        <div className='space-y-8'>
                            <div className='grid justify-center justify-items-start gap-6 items-center'>


                                <h1 className='font-serif text-5xl leading-tight text-black'>
                                    Đánh Thức <br />
                                    <span className='italic font-light '>Mọi Giác Quan</span>
                                    <br />
                                </h1>
                                <p className='text-gray-500 text-lg leading-relaxed max-w-md'>
                                    Bắt nguồn từ đam mê với những nốt hương thiên nhiên, PureScent mang đến bộ sưu tập nước hoa cao cấp được tuyển chọn kỹ lưỡng.
                                    Chúng tôi tập trung vào độ lưu hương bền lâu và sự tinh tế trong từng tầng hương.
                                </p>
                                <button className='bg-gray-500 text-white  p-4 uppercase text-xs tracking-widest hover:bg-gray-800 transition-all font-medium cursor-pointer'>
                                    Mua Ngay
                                </button>
                            </div>
                        </div>



                    </div>



                </section>

                {/*  Newsletter */}
                <section className='w-full bg-white py-24 text-black'>
                    <div className='max-w-4xl mx-auto px-6 text-center space-y-10'>

                        <div className='space-y-4'>
                            <h2 className='font-serif text-4xl leading-tight'>
                                Kết nối với <span className='italic font-light text-gray-500'>PureScent</span>
                            </h2>
                            <p className='text-gray-500 text-sm uppercase tracking-[0.3em] font-medium'>
                                Nhận ngay voucher 10% cho đơn hàng đầu tiên của bạn
                            </p>
                        </div>

                        <form className='flex flex-col md:flex-row items-center justify-center gap-6 max-w-2xl mx-auto'>
                            <input
                                type="email"
                                placeholder="ĐỊA CHỈ EMAIL CỦA BẠN"
                                className='w-full md:flex-1 bg-transparent border-b border-gray-700 py-4 text-xs tracking-widest focus:outline-none focus:border-white transition-colors duration-300'
                            />
                            <button className='w-full md:w-auto bg-white text-black px-12 py-4 text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-gray-200 transition-all duration-300'>
                                Đăng Ký
                            </button>
                        </form>

                        <p className='text-[10px] text-gray-600 uppercase tracking-widest'>
                            Chúng tôi cam kết bảo mật thông tin và không gửi spam.
                        </p>

                    </div>
                </section>


            </main >

        </>




    )
}

export default HomePage