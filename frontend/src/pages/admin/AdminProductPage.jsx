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
    const [imagePreviews, setImagePreviews] = useState([]) // Lưu đường dẫn
    const [categories, setCategories] = useState([])

    const [isEditing, setIsEditing] = useState(false)
    const [currentProductId, setCurrentProductId] = useState(null)

    const [page, setPage] = useState(1)
    const [pages, setPages] = useState(1)
    const [formData, setFormData] = useState({
        name: '',
        brand: '',
        price: '',
        category: '',
        description: '',
        stock: 10,
        images: ['']
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


    useEffect(() => {
        fetchProducts()
        fetchCategories()
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

            const productData = {
                ...formData,
                images: uploadedImages.length > 0 ? uploadedImages : formData.images
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
        setImagePreviews(prev =>
            prev.filter((_, i) => i !== index));
        setSelectedFiles(prev =>
            prev.filter((_, i) => i !== index));
    };

    const handleEdit = (product) => {
        setIsEditing(true)
        setCurrentProductId(product._id)

        // Đổ dữ liệu cũ vào Form
        setFormData({
            name: product.name,
            brand: product.brand,
            price: product.price,
            category: product.category?._id || product.category, // Backend sẽ nhận ID danh mục
            description: product.description,
            stock: product.stock,
            images: product.images // Giữ lại link ảnh cũ
        })

        // Hiển thị ảnh cũ lên phần Xem trước
        setImagePreviews(product.images)
        setIsModalOpen(true)
    }


    const closeModal = () => {
        setIsModalOpen(false)
        setIsEditing(false)
        setCurrentProductId(null)

        // Reset Form về trắng
        setFormData({
            name: '', brand: '', price: '', category: '', description: '', stock: 10, images: ['']
        })
        setImagePreviews([])
        setSelectedFiles([])
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
                                <td className="p-6 text-sm font-medium">{product.price.toLocaleString()}đ</td>
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
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-in fade-in duration-300">
                    <div className="bg-white w-full max-w-xl shadow-2xl p-10 relative animate-in zoom-in-95 duration-300">


                        <button onClick={closeModal}
                            className="absolute top-6 right-6 text-gray-400 hover:text-black">
                            <X size={20} /></button>

                        <h2 className="font-serif text-2xl tracking-widest border-b pb-4 mb-8">
                            {isEditing ? "Cập nhật sản phẩm" : "Thêm sản phẩm mới"}</h2>



                        <form onSubmit={hanldeSubmit} className="space-y-6">

                            <div className='grid grid-cols-2 gap-5'>
                                <div>
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
                                    <input
                                        type="text"
                                        required
                                        value={formData.brand}
                                        onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                                        className="w-full border-b border-gray-100 py-2 focus:outline-none focus:border-black transition-colors"
                                    />
                                </div>

                                <div>
                                    <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">
                                        Giá sản phẩm (vnđ)
                                    </label>
                                    <input
                                        type="number"
                                        required
                                        value={formData.price}
                                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                        className="w-full border-b border-gray-100 py-2 focus:outline-none focus:border-black transition-colors [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                    />
                                </div>

                                <div>
                                    <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">
                                        Trong kho
                                    </label>
                                    <input
                                        type="number"
                                        required
                                        value={formData.stock}
                                        onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                                        className="w-full border-b border-gray-100 py-2 focus:outline-none focus:border-black transition-colors "
                                    />
                                </div>

                                {/*Hình ảnh */}
                                <div className='col-span-2'>
                                    <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-4">
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
                                        Danh mục sản phẩm
                                    </label>
                                    <select
                                        required
                                        value={formData.category}
                                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                        className="w-full border-b border-gray-100 py-2 focus:outline-none focus:border-black transition-colors text-[12px] bg-white "
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



                            </div>
                            <div>
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




                            <button type='submit' className="w-full bg-black text-white py-4 text-[10px] uppercase font-bold tracking-widest mt-8 hover:bg-gray-800 transition-all cursor-pointer">
                                {isEditing ? "Cập nhật ngay" : "Lưu sản phẩm"}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>


    )
}

export default AdminProductPage