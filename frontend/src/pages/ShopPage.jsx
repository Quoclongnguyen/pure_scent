import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import ProductCard from '../components/productCard/ProductCard'
import { ChevronLeft, ChevronRight } from 'lucide-react';
import api from '../utils/Axios.js'
import Pagination from '../components/ui/Pagination.jsx';
import TableSkeleton from '../components/ui/TableSkeleton';

const ShopPage = () => {
    const [products, setProduct] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [pages, setPages] = useState(1)

    // Filter states
    const [categories, setCategories] = useState([])
    const [brands, setBrands] = useState([])

    const [selectedCategory, setSelectedCategory] = useState('')
    const [selectedBrand, setSelectedBrand] = useState('')
    const [priceRange, setPriceRange] = useState({ min: '', max: '' })
    const [sort, setSort] = useState('newest')

    // Fetch filter options (Categories & Brands)
    useEffect(() => {
        const fetchFilters = async () => {
            try {
                const [catRes, brandRes] = await Promise.all([
                    api.get('/api/categories'),
                    api.get('/api/brands')
                ])
                setCategories(catRes.data)
                setBrands(brandRes.data)
            } catch (error) {
                console.error("Lỗi khi fetch categories và brands", error)
            }
        }
        fetchFilters()
    }, [])

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true)
                let url = `/api/products?pageNumber=${page}`
                if (selectedCategory) url += `&category=${selectedCategory}`
                if (selectedBrand) url += `&brand=${selectedBrand}`
                if (priceRange.min !== '') url += `&minPrice=${priceRange.min}`
                if (priceRange.max !== '') url += `&maxPrice=${priceRange.max}`
                if (sort) url += `&sort=${sort}`

                const res = await api.get(url)
                setProduct(res.data.products)
                setPages(res.data.pages)
                setPage(res.data.page)
                setLoading(false)
            } catch (error) {
                console.error("Lỗi khi Get sản phẩm: ", error)
                setLoading(false)
            }
        }
        fetchProducts()
    }, [page, selectedCategory, selectedBrand, priceRange, sort])

    if (loading) return (
        <div className="p-10">
            <TableSkeleton rows={8} />
        </div>
    )

    return (

        <main className='min-h-screen bg-white'>

            <div className='bg-[#f9f9f9] py-8 border-b border-gray-100 mb-12'>
                <div className='max-w-7xl mx-auto px-6 text-center space-y-4'>
                    <h1 className='font-serif text-4xl uppercase tracking-[0.2em]'>
                        Nước Hoa</h1>
                    <p className='text-gray-400 text-[10px] uppercase tracking-widest flex items-center justify-center gap-2'>
                        <Link to="/" className='hover:text-black transition-colors flex'>Trang chủ</Link>
                        <span>/</span>
                        <span className='text-black'><Link to="/shop" className='hover:text-black transition-colors flex'>Nước Hoa</Link></span>
                    </p>
                </div>
            </div>

            <div className='max-w-7xl mx-[300px] px-6 flex flex-col md:flex-row gap-16 pb-24'>
                {/* SIDEBAR */}
                <aside className='w-full md:w-64 space-y-12'>
                    <div className='space-y-6'>
                        <h4 className='text-xs font-bold uppercase tracking-[0.2em] border-b border-black pb-2'>Bộ Sưu Tập
                        </h4>
                        <div className='flex flex-col gap-4 text-xs uppercase tracking-widest text-gray-500'>
                            <button 
                                onClick={() => { setSelectedCategory(''); setPage(1); }} 
                                className={`text-left hover:text-black transition-colors ${selectedCategory === '' ? 'text-black font-bold' : ''}`}>
                                Tất cả sản phẩm
                            </button>
                            {categories.map(cat => (
                                <button 
                                    key={cat._id}
                                    onClick={() => { setSelectedCategory(cat._id); setPage(1); }}
                                    className={`text-left hover:text-black transition-colors ${selectedCategory === cat._id ? 'text-black font-bold' : ''}`}>
                                    {cat.name}
                                </button>
                            ))}
                        </div>

                    </div>


                    <div className='space-y-6'>
                        <h4 className='text-xs font-bold uppercase tracking-[0.2em] border-b border-black pb-2'>Thương Hiệu</h4>
                        <div className='flex flex-col gap-4 text-xs uppercase tracking-widest text-gray-500'>
                            <button 
                                onClick={() => { setSelectedBrand(''); setPage(1); }} 
                                className={`text-left hover:text-black transition-colors ${selectedBrand === '' ? 'text-black font-bold' : ''}`}>
                                Tất cả thương hiệu
                            </button>
                            {brands.map(b => (
                                <button 
                                    key={b._id}
                                    onClick={() => { setSelectedBrand(b._id); setPage(1); }}
                                    className={`text-left hover:text-black transition-colors ${selectedBrand === b._id ? 'text-black font-bold' : ''}`}>
                                    {b.name}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className='space-y-6'>
                        <h4 className='text-xs font-bold uppercase tracking-[0.2em] border-b border-black pb-2'>Giá Sản Phẩm</h4>
                        <div className='flex flex-col gap-4 text-xs uppercase tracking-widest text-gray-500'>
                            <button onClick={() => { setPriceRange({ min: '', max: '' }); setPage(1); }} className={`text-left hover:text-black transition-colors ${priceRange.min === '' && priceRange.max === '' ? 'text-black font-bold' : ''}`}>Tất cả mức giá</button >
                            <button onClick={() => { setPriceRange({ min: 0, max: 100000 }); setPage(1); }} className={`text-left hover:text-black transition-colors ${priceRange.max === 100000 ? 'text-black font-bold' : ''}`}>Giá dưới 100.000đ</button >
                            <button onClick={() => { setPriceRange({ min: 100000, max: 200000 }); setPage(1); }} className={`text-left hover:text-black transition-colors ${priceRange.min === 100000 && priceRange.max === 200000 ? 'text-black font-bold' : ''}`}>100.000đ - 200.000đ</button>
                            <button onClick={() => { setPriceRange({ min: 200000, max: 300000 }); setPage(1); }} className={`text-left hover:text-black transition-colors ${priceRange.min === 200000 && priceRange.max === 300000 ? 'text-black font-bold' : ''}`}>200.000đ - 300.000đ</button>
                            <button onClick={() => { setPriceRange({ min: 500000, max: 1000000 }); setPage(1); }} className={`text-left hover:text-black transition-colors ${priceRange.min === 500000 ? 'text-black font-bold' : ''}`}>500.000đ - 1.000.000đ</button>
                            <button onClick={() => { setPriceRange({ min: 1000000, max: '' }); setPage(1); }} className={`text-left hover:text-black transition-colors ${priceRange.min === 1000000 ? 'text-black font-bold' : ''}`}>Giá trên 1.000.000đ</button>
                        </div>
                    </div>

                </aside>

                {/* 2. PRODUCT GRID */}
                <div className='flex-1 space-y-8'>
                    <div className='flex justify-between items-center text-[15px] uppercase tracking-widest text-gray border-b border-gray-200 pb-2'>
                        <p>Hiển thị {products?.length} sản phẩm</p>
                        <select 
                            value={sort}
                            onChange={(e) => { setSort(e.target.value); setPage(1); }}
                            className='bg-transparent focus:outline-none text-back font-medium cursor-pointer'>
                            <option value="newest">Mới Nhất</option>
                            <option value="price_asc">Giá: Thấp đến cao</option>
                            <option value="price_desc">Giá: Cao đến thấp</option>
                        </select>
                    </div>
                    {/* SẢN PHẨM */}
                    <div className='grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12'>
                        {products.map((item) => (
                            <ProductCard key={item._id} product={item} />
                        ))}
                    </div>

                    {/* PHÂN TRANG */}
                    <Pagination page={page} pages={pages} setPage={setPage} />


                </div>
            </div>






        </main>
    )
}

export default ShopPage