import { Edit2, Plus, Trash2, X } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import api from '../../utils/Axios.js'
import Pagination from '../../components/ui/Pagination.jsx'
const BACKEND_URL = 'http://localhost:3001'
const AdminProductPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)

    const [selectedFiles, setSelectedFiles] = useState([]) // Lưu các file thật để gửi lên Server
    const [imagePreviews, setImagePreviews] = useState([])
    const [selectedDescFiles, setSelectedDescFiles] = useState([])
    const [descImagePreviews, setDescImagePreviews] = useState([])


    const [categories, setCategories] = useState([])

    const [isEditing, setIsEditing] = useState(false)
    const [currentProductId, setCurrentProductId] = useState(null)

    const [page, setPage] = useState(1)
    const [pages, setPages] = useState(1)

    const [brands, setBrands] = useState([])
    const [activeTab, setActiveTab] = useState('basic')
    const [formData, setFormData] = useState({
        name: '',
        brand: '',
        category: '',
        description: '',
        images: [''],

        variants: [{ size: '', originalPrice: '', discountPercent: '', discountPrice: '', stock: 0 }],
        scentNotes: { top: '', heart: '', base: '' },
        specs: { longevity: '', sillage: '', concentration: '' },
        origin: '',
        scentGroup: '',
        targetGender: '',
        usageInstructions: '',
        designDescription: '',
        descriptionImages: []

    })




    const fetchProducts = async () => {
        try {
            const res = await api.get(`/api/products?pageNumber=${page}`)
            setProducts(res.data.products)
            setPages(res.data.pages)
            setPage(res.data.page)

            setLoading(false)
        } catch (error) {
            console.error("Lỗi khi Get sản phẩm: ", error)
            setLoading(false)
        }
    }

    const fetchCategories = async () => {
        try {
            const res = await api.get('/api/categories')
            setCategories(res.data)
        } catch (error) {
            console.error("Lỗi khi lấy danh mục:", error)
        }
    }

    const fetchBrands = async () => {
        try {
            const res = await api.get('/api/brands')
            setBrands(res.data)
        } catch (error) {
            console.error("Lỗi khi lấy thương hiệu:", error)
        }
    }


    useEffect(() => {
        fetchProducts()
        fetchCategories()
        fetchBrands()
    }, [page])

    const hanldeSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {

            let uploadedImages = []
            if (selectedFiles.length > 0) {
                const formDataUpload = new FormData()
                selectedFiles.forEach(file => {
                    formDataUpload.append('images', file)
                })


                const response = await api.post('/api/upload', formDataUpload, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                })

                uploadedImages = response.data
            }

            //  Upload ảnh cho mô tả chi tiết
            let uploadedDescImages = []
            if (selectedDescFiles.length > 0) {
                const formDataDesc = new FormData()
                selectedDescFiles.forEach(file => {
                    formDataDesc.append('images', file)
                })
                const resDesc = await api.post('/api/upload', formDataDesc, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                })
                uploadedDescImages = resDesc.data
            }


            const productData = {
                ...formData,
                // Nếu có upload ảnh mới thì dùng ảnh mới, không thì giữ ảnh cũ
                images: uploadedImages.length > 0 ? uploadedImages : formData.images,
                descriptionImages: uploadedDescImages.length > 0
                    ? uploadedDescImages
                    : formData.descriptionImages
            }

            if (isEditing) {
                // Nếu đang sửa gọi PUT
                await api.put(`/api/products/${currentProductId}`, productData)
                alert("Cập nhật sản phẩm thành công!")
            } else {

                await api.post('/api/products', productData)
                alert("Thêm sản phẩm thành công!")
            }


            closeModal()
            fetchProducts()

        } catch (error) {
            console.error("Lỗi khi thêm sản phẩm:", error);
            alert("Có lỗi xảy ra, vui lòng kiểm tra lại!");
        } finally {
            setLoading(false);
        }
    }

    //  Hàm chọn file từ máy tính
    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);

        // Tạo link xem trước (ObjectURL)
        const newPreviews = files.map(file => URL.createObjectURL(file));

        setImagePreviews(prev => [...prev, ...newPreviews].slice(0, 5)); // Ghép vào ảnh cũ, tối đa 5
        setSelectedFiles(prev => [...prev, ...files].slice(0, 5));
    };

    // xóa ảnh đã chọn
    const removeImage = (index) => {
        setImagePreviews(prev => prev.filter((_, i) => i !== index));
        setSelectedFiles(prev => prev.filter((_, i) => i !== index));
    };

    // Xử lý ảnh mô tả
    const handleDescFileChange = (e) => {

        const files = Array.from(e.target.files)
        const newPreviews = files.map(file => URL.createObjectURL(file))
        // Tạo link xem trước cho các ảnh mới
        setDescImagePreviews(prev => [...prev, ...newPreviews].slice(0, 5))
        setSelectedDescFiles(prev => [...prev, ...files].slice(0, 5))
    };

    const removeDescImage = (index) => {
        setDescImagePreviews(prev => prev.filter((_, i) => i !== index));
        setSelectedDescFiles(prev => prev.filter((_, i) => i !== index));
    };

    const handleEdit = (product) => {
        setIsEditing(true)
        setCurrentProductId(product._id)

        const updatedVariants = product.variants?.map(v => ({
            ...v,
            discountPercent: v.originalPrice && v.discountPrice
                ? Math.round((1 - v.discountPrice / v.originalPrice) * 100)
                : ''
        })) || [{ size: '', originalPrice: '', discountPercent: '', discountPrice: '', stock: 0 }]

        // Đổ dữ liệu cũ vào Form
        setFormData({
            name: product.name,
            brand: product.brand?._id || product.brand,

            category: product.category?._id || product.category, // Backend sẽ nhận ID danh mục
            description: product.description,

            images: product.images, // Giữ lại link ảnh cũ
            variants: updatedVariants,
            scentNotes: product.scentNotes || { top: '', heart: '', base: '' },
            specs: product.specs || { longevity: '', sillage: '', concentration: '' },
            origin: product.origin || '',
            scentGroup: product.scentGroup || '',
            targetGender: product.targetGender || '',
            usageInstructions: product.usageInstructions || '',
            designDescription: product.designDescription || '',
            descriptionImages: product.descriptionImages || []
        })

        // Hiển thị ảnh cũ lên phần Xem trước
        setImagePreviews(product.images)
        setDescImagePreviews(product.descriptionImages || [])
        setIsModalOpen(true)
        setActiveTab('basic') // Reset về tab đầu tiên khi mở modal
    }

    //Hàm xử lý thay đổi cho các ô nhập liệu lồng nhau (scentNotes, specs)
    const handleNestedChange = (parent, field, value) => {
        setFormData(prev => ({
            ...prev,
            [parent]: {
                ...prev[parent],
                [field]: value
            }

        }))
    }

    const addVariant = () => {
        setFormData({
            ...formData,
            variants: [...formData.variants, { size: '', originalPrice: '', discountPrice: '', stock: 0 }]
        })
    }

    // Xử lý thay đổi cho từng dung tích Variants
    const handleVariantChange = (index, field, value) => {
        const updatedVariants = [...formData.variants]

        if (field === 'discountPercent') {
            updatedVariants[index].discountPercent = value

            // Tính toán giá thực tế để gửi về Backend
            const originalPrice = Number(updatedVariants[index].originalPrice) || 0

            const percent = parseFloat(value) || 0
            updatedVariants[index].discountPrice = originalPrice - (originalPrice * percent / 100)

        }
        else if (field === 'originalPrice') {
            updatedVariants[index].originalPrice = value
            // Nếu đã có % giảm giá trước đó, tính lại giá giảm theo giá gốc mới
            const percent = parseFloat(updatedVariants[index].discountPercent) || 0
            if (percent > 0) {
                updatedVariants[index].discountPrice = value - (value * percent / 100);
            }
        } else {
            updatedVariants[index][field] = value;
        }


        setFormData({ ...formData, variants: updatedVariants })
    }

    const removeVariant = (index) => {
        if (formData.variants.length > 1) {
            const newVariants = formData.variants.filter((_, i) => i !== index) //Luôn còn ít nhất 1 variant tránh form bị rỗng
            setFormData({ ...formData, variants: newVariants })
        }
    }

    const closeModal = () => {
        setIsModalOpen(false)
        setIsEditing(false)
        setCurrentProductId(null)

        // Reset Form về trắng
        setFormData({
            name: '',
            brand: '',
            category: '',
            description: '',
            images: [''],
            variants: [{ size: '', originalPrice: '', discountPrice: '', stock: 0 }],
            scentNotes: { top: '', heart: '', base: '' },
            specs: { longevity: '', sillage: '', concentration: '' },
            origin: '',
            scentGroup: '',
            targetGender: '',
            usageInstructions: '',
            designDescription: '',
            descriptionImages: []
        })
        setImagePreviews([])
        setSelectedFiles([])
        setDescImagePreviews([])
        setSelectedDescFiles([])
        setActiveTab('basic')
    }

    const hanldeDelete = async (id) => {
        try {
            if (window.confirm('Xác nhận xóa sản phẩm')) {
                await api.delete(`/api/products/${id} `)
            }
            fetchProducts()
            alert('Bạn đã xóa thành công')
        } catch (error) {
            console.error("Lỗi khi xóa sản phẩm: ", error)
        }
    }

    if (loading) return <p>Loading...</p>
    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/*HEADER*/}
            <div className='flex justify-between items-center bg-white  p-6 border border-gray-100 shadow-sm'>
                <div>
                    <h1 className="text-xl font-serif tracking-widest " >Danh mục sản phẩm</h1>
                    <p className="text-[12px] text-gray-400 uppercase tracking-widest mt-1">
                        Quản lý kho hàng nước hoa của bạn
                    </p>

                </div>
                <button
                    onClick={() => {
                        closeModal()
                        setIsModalOpen(true)
                    }
                    }
                    className="bg-gray-500 text-white  px-6 py-3 text-[12px] uppercase font-bold tracking-widest flex items-center gap-2 hover:bg-gray-800 transition-all cursor-pointer">

                    <Plus size={16} /> Thêm sản phẩm mới
                </button>
            </div>


            {/*TABLE*/}
            <div className="bg-white border border-gray-100 shadow-sm overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-gray-50 border-b border-gray-100">
                        <tr>
                            <th className="p-6 text-[10px] uppercase tracking-widest font-bold text-gray-400">Hình ảnh</th>
                            <th className="p-6 text-[10px] uppercase tracking-widest font-bold text-gray-400">Tên nước hoa</th>
                            <th className="p-6 text-[10px] uppercase tracking-widest font-bold text-gray-400">Danh mục</th>
                            <th className="p-6 text-[10px] uppercase tracking-widest font-bold text-gray-400">Giá</th>
                            <th className="p-6 text-[10px] uppercase tracking-widest font-bold text-gray-400 text-right">Hành động</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {products.map(product => (
                            <tr key={product._id} className="hover:bg-gray-50/50 transition-colors">
                                <td className="p-6">

                                    <img
                                        src={
                                            product.images?.[0]?.startsWith('http')
                                                ? product.images[0] // Nếu là link web (http) -> Giữ nguyên
                                                : product.images?.[0].startsWith('/uploads')
                                                    ? `${BACKEND_URL}${product.images[0]} ` //Nếu là ảnh vừa upload  -> Thêm cổng 3001
                                                    : product.images[0]  // Nếu là ảnh mẫu (/src/assets)
                                        }


                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = 'https://placehold.co/100x100?text=No+Image'
                                        }}  // Ảnh dự phòng nếu lỗi

                                        className="w-12 h-12 object-cover grayscale-25"
                                    />
                                </td>
                                <td className="p-6 text-sm font-bold">
                                    {product.name}
                                </td>
                                <td className="p-6 text-xs text-gray-500 uppercase tracking-widest"> {product.category?.name || "Chưa phân loại"} </td>
                                <td className="p-6 text-sm font-medium">
                                    {product.variants && product.variants.length > 0
                                        ? `${product.variants[0].originalPrice.toLocaleString()}đ`
                                        : (product.price ? `${product.price.toLocaleString()}đ` : "N/A")}
                                </td>
                                <td className="p-6 text-right">
                                    <div className="flex justify-end gap-4">
                                        <button onClick={() => { handleEdit(product) }} className="text-gray-400 hover:text-black transition-colors"><Edit2 size={16} /></button>
                                        <button onClick={() => hanldeDelete(product._id)} className="text-gray-400 hover:text-red-500 transition-colors"><Trash2 size={16} /></button>
                                    </div>

                                </td>

                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className='pb-10'>
                    <Pagination page={page} pages={pages} setPage={setPage} />
                </div>
            </div>

            {/*MODAL*/}
            {isModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-in fade-in duration-300 ">
                    <div className="bg-white w-full max-w-xl shadow-2xl p-10 relative animate-in zoom-in-95 duration-300">


                        <button onClick={closeModal}
                            className="absolute top-6 right-6 text-gray-400 hover:text-black">
                            <X size={20} />
                        </button>

                        <h2 className="font-serif text-2xl tracking-widest border-b pb-4 mb-8">
                            {isEditing ? "Cập nhật sản phẩm" : "Thêm sản phẩm mới"}
                        </h2>

                        <div className="flex gap-8 border-b border-gray-50 mb-8">
                            {['basic', 'pricing', 'details'].map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`pb-4 text-[10px] uppercase font-bold tracking-[0.2em] transition-all relative 
                                        ${activeTab === tab ? 'text-black' : 'text-gray-300 hover:text-gray-500'
                                        }`}
                                >
                                    {tab === 'basic' ? 'Thông tin cơ bản' : tab === 'pricing' ? 'Dung tích & Giá' : 'Hương & Thông số'}
                                    {activeTab === tab &&
                                        <div className="absolute bottom-0 left-0 w-full h-[2px] bg-black animate-in slide-in-from-left duration-300"
                                        />}
                                </button>
                            ))}
                        </div>

                        <form onSubmit={hanldeSubmit} className="space-y-6">

                            {/* --- TAB 1: THÔNG TIN CƠ BẢN --- */}
                            {activeTab === 'basic' && (
                                <div className='space-y-6 animate-in fade-in duration-500 max-h-[60vh] overflow-y-auto [scrollbar-width:none]'>
                                    <div className='grid grid-cols-2 gap-5'>
                                        <div className='col-span-2'>
                                            <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">
                                                Tên nước hoa
                                            </label>
                                            <input
                                                type="text"
                                                required
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                className="w-full border-b border-gray-100 py-2 focus:outline-none focus:border-black transition-colors"
                                            />
                                        </div>


                                        <div>
                                            <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">
                                                Thương hiệu
                                            </label>
                                            <select
                                                type="text"
                                                required
                                                value={formData.brand}
                                                onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                                                className="w-full border-b text-[15px] border-gray-100 py-2 focus:outline-none focus:border-black transition-colors">

                                                <option className='' value="">Chọn hãng</option>
                                                {brands.map(b =>
                                                    <option
                                                        key={b._id}
                                                        value={b._id}
                                                    >{b.name}</option>
                                                )}
                                            </select>
                                        </div>


                                        <div >
                                            <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">
                                                Danh mục sản phẩm
                                            </label>
                                            <select
                                                required
                                                value={formData.category}
                                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                                className="w-full border-b text-[15px] border-gray-100 py-2 focus:outline-none focus:border-black transition-colors bg-white "
                                            >
                                                <option value="" className='text-gray-300'>Chọn danh mục</option>
                                                {categories.map((cat) => (
                                                    <option className="py-2 font-sans"
                                                        key={cat._id} value={cat._id}>
                                                        {cat.name}
                                                    </option>
                                                ))}
                                            </select>



                                        </div>


                                        {/*Hình ảnh */}
                                        <div className='col-span-2'>
                                            <label className='text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-4'>
                                                Hình ảnh sản phẩm (Tối đa 5 ảnh)
                                            </label>
                                            <div className='flex flex-wrap gap-4'>
                                                {imagePreviews.map((url, index) => (
                                                    <div key={index} className='relative w-24 h-24 group border border-gray-400'>
                                                        <img src={url} className='w-ful h-full object-cover' />
                                                        <button
                                                            className='absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer shadow-lg'
                                                            type='button'
                                                            onClick={() => removeImage(index)}
                                                        >    <X size={12} /></button>
                                                    </div>
                                                ))}
                                                {imagePreviews.length < 5 && (
                                                    <label className="w-24 h-24 border-2 border-dashed border-gray-100 flex flex-col items-center justify-center text-gray-300 hover:border-black hover:text-black transition-all cursor-pointer">
                                                        <Plus size={24} strokeWidth={1} />
                                                        <span className="text-[8px] uppercase mt-2 font-bold tracking-tighter">Thêm ảnh</span>
                                                        <input
                                                            type="file"
                                                            multiple
                                                            accept="image/*"
                                                            className="hidden"
                                                            onChange={handleFileChange}
                                                        />
                                                    </label>
                                                )}

                                                <div className='mt-4 border-t border-gray-50 pt-4'>
                                                    <label className='text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-2 block'>Hoặc dán link ảnh từ bên ngoài (URL)</label>
                                                    <input type="text" placeholder='Dán link http://... vào đây' value={selectedFiles.length === 0
                                                        ? formData.images[0]
                                                        : ""
                                                    }
                                                        onChange={(e) => setFormData({ ...formData, images: [e.target.value] })}
                                                        className='w-full border-b border-gray-100 py-2 focus:outline-none focus:border-black transition-colors text-[12px] italic text-gray-500' />
                                                    <p className='text-[9px] text-gray-300 mt-1'>*Ưu tiên ảnh bạn đã chọn từ máy tính nếu có</p>
                                                </div>
                                            </div>
                                        </div>


                                        <div className='col-span-2'>
                                            <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">
                                                Mô tả sản phẩm
                                            </label>
                                            <textarea
                                                required
                                                placeholder="Mô tả ngắn gọn về hương thơm..."
                                                value={formData.description}
                                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                                className="w-full border-b border-gray-100 py-4 focus:outline-none focus:border-black transition-colors text-sm  min-h-[100px]"
                                            />
                                        </div>


                                    </div>
                                </div>
                            )}

                            {/* --- TAB 2: DUNG TÍCH & GIÁ  --- */}
                            {activeTab === 'pricing' && (
                                <div className='space-y-6 animate-in fade-in duration-500'>
                                    {formData.variants.map((variant, index) => (
                                        <div
                                            key={index}
                                            className="grid  grid-cols-4 gap-4 p-4 bg-gray-50/50 relative group">
                                            <div>
                                                <label
                                                    className="text-[10px] uppercase font-bold text-gray-400 block mb-1">Dung tích</label>
                                                <input
                                                    placeholder="VD: 10ml"
                                                    value={variant.size}
                                                    onChange={(e) => handleVariantChange(index, 'size', e.target.value)}
                                                    className="w-full bg-transparent border-b border-gray-200 py-1 focus:outline-none focus:border-black text-xs" />
                                            </div>
                                            <div>
                                                <label
                                                    className="text-[10px] uppercase font-bold text-gray-400 block mb-1">Giá gốc</label>
                                                <input
                                                    type="number"
                                                    value={variant.originalPrice}
                                                    onChange={(e) => handleVariantChange(index, 'originalPrice', e.target.value)}
                                                    className="w-full bg-transparent border-b border-gray-200 py-1 focus:outline-none focus:border-black text-xs" />
                                            </div>

                                            <div>
                                                <label className="text-[10px] uppercase font-bold text-gray-400 block mb-1">Giảm giá (%)</label>
                                                <input
                                                    type="number"
                                                    placeholder="VD: 20"
                                                    value={variant.discountPercent || ''}

                                                    onChange={(e) =>
                                                        handleVariantChange(index, 'discountPercent', e.target.value)}
                                                    className="w-full bg-transparent border-b border-gray-200 py-1 focus:outline-none focus:border-black text-xs" />

                                                {variant.discountPrice > 0 && variant.discountPrice < variant.originalPrice && (
                                                    <p className='text-[9px] text-red-500 font-medium mt-1'>
                                                        Giá thật {Math.round(variant.discountPrice).toLocaleString()}đ
                                                    </p>
                                                )}
                                            </div>

                                            <div>
                                                <label className="text-[10px] uppercase font-bold text-gray-400 block mb-1">Số lượng</label>
                                                <input
                                                    type="number" value={variant.stock}
                                                    onChange={(e) => handleVariantChange(index, 'stock', e.target.value)}
                                                    className="w-full bg-transparent border-b border-gray-200 py-1 focus:outline-none focus:border-black text-xs" />
                                            </div>
                                            {formData.variants.length > 1 && (
                                                <button type="button" onClick={() => removeVariant(index)} className="absolute -right-2 -top-2 bg-white text-red-500 rounded-full p-1 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <X size={12} />
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                    <button
                                        type="button"
                                        onClick={addVariant}
                                        className="w-full border border-dashed border-gray-200 py-3 text-[9px] uppercase font-bold tracking-widest text-gray-400 hover:border-black hover:text-black transition-all">
                                        + Thêm dung tích khác
                                    </button>
                                </div>
                            )}

                            {/* --- TAB 3: HƯƠNG & THÔNG SỐ --- */}
                            {activeTab === 'details' && (
                                <div className="space-y-8 animate-in fade-in duration-500 max-h-[60vh] overflow-y-auto pr-2 [scrollbar-width:none]">
                                    <div className="grid grid-cols-2 gap-8">

                                        <div className="space-y-6">
                                            <h4 className="text-[10px] uppercase font-bold tracking-widest border-b border-gray-50 pb-2">Tầng hương</h4>
                                            {['top', 'heart', 'base'].map((n) => (
                                                <div key={n}>
                                                    <label className="text-[8px] uppercase text-gray-400 block mb-1">
                                                        {n === 'top' ? 'Hương đầu' : n === 'heart' ? 'Hương giữa' : 'Hương cuối'}
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={formData.scentNotes[n]}
                                                        onChange={(e) => handleNestedChange('scentNotes', n, e.target.value)}
                                                        className="w-full border-b border-gray-100 py-1 focus:outline-none focus:border-black text-xs"
                                                        placeholder="VD: Cam Bergamot, Gỗ tuyết tùng..."
                                                    />
                                                </div>
                                            ))}

                                            <h4 className="text-[10px] uppercase font-bold tracking-widest border-b border-gray-50 pb-2 mt-8">Thông số kỹ thuật</h4>
                                            {['longevity', 'sillage', 'concentration'].map((s) => (
                                                <div key={s}>
                                                    <label className="text-[8px] uppercase text-gray-400 block mb-1">
                                                        {s === 'longevity' ? 'Độ lưu hương' : s === 'sillage' ? 'Độ tỏa hương' : 'Nồng độ'}
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={formData.specs[s]}
                                                        onChange={(e) => handleNestedChange('specs', s, e.target.value)}
                                                        className="w-full border-b border-gray-100 py-1 focus:outline-none focus:border-black text-xs"
                                                        placeholder="VD: 8-12 tiếng, Extrait de Parfum..."
                                                    />
                                                </div>
                                            ))}
                                        </div>

                                        {/* Cột 2: Thông tin chi tiết mới */}
                                        <div className="space-y-6">
                                            <h4 className="text-[10px] uppercase font-bold tracking-widest border-b border-gray-50 pb-2">Thông tin bổ sung</h4>
                                            <div>
                                                <label className="text-[8px] uppercase text-gray-400 block mb-1">Xuất xứ</label>
                                                <input
                                                    type="text"
                                                    value={formData.origin}
                                                    onChange={(e) => setFormData({ ...formData, origin: e.target.value })}
                                                    className="w-full border-b border-gray-100 py-1 focus:outline-none focus:border-black text-xs"
                                                    placeholder="VD: Pháp, Ý, Dubai..."
                                                />
                                            </div>
                                            <div>
                                                <label className="text-[8px] uppercase text-gray-400 block mb-1">Nhóm hương</label>
                                                <input
                                                    type="text"
                                                    value={formData.scentGroup}
                                                    onChange={(e) => setFormData({ ...formData, scentGroup: e.target.value })}
                                                    className="w-full border-b border-gray-100 py-1 focus:outline-none focus:border-black text-xs"
                                                    placeholder="VD: Woody, Floral, Oriental..."
                                                />
                                            </div>
                                            <div>
                                                <label className="text-[8px] uppercase text-gray-400 block mb-1">Đối tượng (Gender)</label>
                                                <input
                                                    type="text"
                                                    value={formData.targetGender}
                                                    onChange={(e) => setFormData({ ...formData, targetGender: e.target.value })}
                                                    className="w-full border-b border-gray-100 py-1 focus:outline-none focus:border-black text-xs"
                                                    placeholder="VD: Nam, Nữ, Unisex..."
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Phần mô tả dài ở dưới */}
                                    <div className="space-y-6 pt-4">
                                        <h4 className="text-[10px] uppercase font-bold tracking-widest border-b border-gray-50 pb-2">Mô tả thiết kế & Cách dùng</h4>
                                        <div>
                                            <label className="text-[8px] uppercase text-gray-400 block mb-1">Mô tả thiết kế</label>
                                            <textarea
                                                value={formData.designDescription}
                                                onChange={(e) => setFormData({ ...formData, designDescription: e.target.value })}
                                                className="w-full border border-gray-100 p-2 focus:outline-none focus:border-black text-xs min-h-[80px]"
                                                placeholder="Mô tả về kiểu dáng chai, hộp đựng..."
                                            />
                                        </div>
                                        <div>
                                            <label className="text-[8px] uppercase text-gray-400 block mb-1">Hướng dẫn sử dụng & Bảo quản</label>
                                            <textarea
                                                value={formData.usageInstructions}
                                                onChange={(e) => setFormData({ ...formData, usageInstructions: e.target.value })}
                                                className="w-full border border-gray-100 p-2 focus:outline-none focus:border-black text-xs min-h-[80px]"
                                                placeholder="Cách xịt, vị trí xịt, cách bảo quản..."
                                            />
                                        </div>

                                        {/* Thêm phần tải ảnh cho mô tả */}
                                        <div className="pt-4">
                                            <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-4 block">
                                                Ảnh minh họa bài viết
                                            </label>
                                            <p className="text-[10px] text-gray-400 mb-4 italic">* Thứ tự: 1-Ảnh Mùi hương | 2-Ảnh Thiết kế | 3-Ảnh Hướng dẫn</p>

                                            <div className="flex flex-wrap gap-4">
                                                {descImagePreviews.map((url, index) => (
                                                    <div key={index} className="relative w-24 h-24 group border border-gray-100">
                                                        <img src={url} className="w-full h-full object-cover" />
                                                        <button
                                                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer shadow-lg"
                                                            type="button"
                                                            onClick={() => removeDescImage(index)}
                                                        >
                                                            <X size={12} />
                                                        </button>
                                                    </div>
                                                ))}
                                                {descImagePreviews.length < 5 && (
                                                    <label className="w-24 h-24 border-2 border-dashed border-gray-100 flex flex-col items-center justify-center text-gray-300 hover:border-black hover:text-black transition-all cursor-pointer">
                                                        <Plus size={24} strokeWidth={1} />
                                                        <span className="text-[8px] uppercase mt-2 font-bold tracking-tighter text-center">Tải ảnh mô tả</span>
                                                        <input
                                                            type="file"
                                                            multiple
                                                            accept="image/*"
                                                            className="hidden"
                                                            onChange={handleDescFileChange}
                                                        />
                                                    </label>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}


                            <button type='submit' className="w-full bg-black text-white py-4 text-[10px] uppercase font-bold tracking-widest mt-8 hover:bg-gray-800 transition-all cursor-pointer">
                                {isEditing ? "Cập nhật ngay" : "Lưu sản phẩm"}
                            </button>
                        </form>
                    </div>
                </div >
            )}
        </div >


    )
}

export default AdminProductPage