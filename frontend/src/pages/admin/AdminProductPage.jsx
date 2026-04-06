import { Edit2, Plus, Trash2, X } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import api from '../../utils/Axios.js'
const AdminProductPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
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
            const res = await api.get('/api/products')
            setProducts(res.data)
            setLoading(false)
        } catch (error) {
            console.error("Lỗi khi Get sản phẩm: ", error)
            setLoading(false)
        }
    }


    useEffect(() => {
        fetchProducts()
    }, [])

    const hanldeSubmit = async (e) => {
        e.preventDefault()
        try {
            await api.post('/api/products', formData)
            setIsModalOpen(false)
            fetchProducts()
            setFormData({
                name: '',
                brand: '',
                price: '',
                category: '',
                description: '',
                stock: 10,
                images: ['']
            })
            alert('Thêm sản phẩm thành công')
        } catch (error) {
            console.error("Lỗi khi thêm sản phẩm:", error);
            alert("Có lỗi xảy ra, vui lòng kiểm tra lại!");
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
                    onClick={() => setIsModalOpen(true)}
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

                                    <img // Nếu ảnh không bắt đầu bằng http và không có dấu / ở đầu, thì tự thêm / vào
                                        src={product.images?.[0]?.startsWith('http') || product.images?.[0].startsWith('/')
                                            ? product.images[0]
                                            : `/${product.images[0]}`
                                        }
                                        className="w-12 h-12 object-cover grayscale-25"
                                        onError={(e) => { e.target.src = 'https://via.placeholder.com/100'; }} // Ảnh dự phòng nếu lỗi
                                    />
                                </td>
                                <td className="p-6 text-sm font-bold">
                                    {product.name}
                                </td>
                                <td className="p-6 text-xs text-gray-500 uppercase tracking-widest">{product.category}</td>
                                <td className="p-6 text-sm font-medium">{product.price.toLocaleString()}đ</td>
                                <td className="p-6 text-right">
                                    <div className="flex justify-end gap-4">
                                        <button className="text-gray-400 hover:text-black transition-colors"><Edit2 size={16} /></button>
                                        <button className="text-gray-400 hover:text-red-500 transition-colors"><Trash2 size={16} /></button>
                                    </div>

                                </td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/*MODAL*/}
            {isModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-in fade-in duration-300">
                    <div className="bg-white w-full max-w-xl shadow-2xl p-10 relative animate-in zoom-in-95 duration-300">
                        {/* Nội dung Modal sẽ viết ở đây */}

                        <button onClick={() =>
                            setIsModalOpen(false)}
                            className="absolute top-6 right-6 text-gray-400 hover:text-black">
                            <X size={20} /></button>

                        <h2 className="font-serif text-2xl tracking-widest border-b pb-4 mb-8">
                            Thêm sản phẩm mới</h2>


                        {/* Form nhập liệu tạm thời */}
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

                                <div>
                                    <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">
                                        Link hình ảnh
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="VD: /src/assets/img1.png"
                                        value={formData.images[0]}
                                        onChange={(e) => setFormData({ ...formData, images: [e.target.value] })}
                                        className="w-full border-b border-gray-100 py-2 focus:outline-none focus:border-black transition-colors text-[12px]"
                                    />
                                </div>

                                <div>
                                    <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">
                                        ID Danh mục (Category ID)
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="Dán ID từ MongoDB vào đây"
                                        value={formData.category}
                                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                        className="w-full border-b border-gray-100 py-2 focus:outline-none focus:border-black transition-colors text-[12px] "
                                    />
                                </div>



                            </div>
                            <div>
                                <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">
                                    Mô tả sản phẩm
                                </label>
                                <textarea

                                    placeholder="Mô tả ngắn gọn về hương thơm..."
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    className="w-full border-b border-gray-100 py-4 focus:outline-none focus:border-black transition-colors text-sm  min-h-[100px]"
                                />
                            </div>




                            <button type='submit' className="w-full bg-black text-white py-4 text-[10px] uppercase font-bold tracking-widest mt-8 hover:bg-gray-800 transition-all cursor-pointer">
                                Lưu sản phẩm
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>


    )
}

export default AdminProductPage