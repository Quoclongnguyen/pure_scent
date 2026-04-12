import React, { useEffect, useState } from 'react'
import api from '../../utils/Axios.js'
import { Edit2, Plus, Trash2, X } from 'lucide-react'
const AdminBrandPage = () => {
    const [brands, setBrands] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [formData, setFormData] = useState({ name: '', origin: '', description: '' })
    const [isEditing, setIsEditing] = useState(false)
    const [currentId, setCurrentId] = useState(null)

    const fetchBrand = async () => {
        try {
            const res = await api.get('/api/brands')
            setBrands(res.data)

        } catch (error) {
            console.error("Lỗi khi lấy danh sách hãng:", error)
        }
    }

    useEffect(() => {
        fetchBrand()

    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            if (isEditing) {
                await api.put(`/api/brands/${currentId}`, formData)
                alert("Cập nhật sản phẩm thành công!")
            } else {
                await api.post('/api/brands', formData)
                alert("Thêm sản phẩm thành công!")
            }

            fetchBrand()
            closeModal()
        } catch (error) {
            console.error("Lỗi khi thêm danh sách hãng:", error)


            alert(error.response?.data?.message || "Có lỗi xảy ra")
        }
    }

    const closeModal = () => {
        setIsModalOpen(false)
        setFormData({ name: '', origin: '', description: '' })
        setIsEditing(false)
    }

    return (
        <div className='bg-white border border-gray-100 shadow-sm overflow-hidden'>
            <div className='flex justify-between items-center bg-white  p-6 border border-gray-100 shadow-sm'>

                <h2 className='font-serif text-3xl tracking-widest uppercase'> Quản lý thương hiệu</h2>
                <button onClick={() => setIsModalOpen(true)}
                    className='bg-black text-white px-6 py-3 text-[10px] uppercase font-bold tracking-widest flex items-center gap-2 hover:bg-gray-800 transition-all cursor-pointer'
                >
                    <Plus />Thêm thương hiệu mới
                </button>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="border-b border-gray-100 text-[10px] uppercase tracking-[0.2em] text-gray-400">
                            <th className="p-6 text-left font-bold">Tên Thương hiệu</th>
                            <th className="p-6 text-left font-bold">Xuất xứ</th>
                            <th className="p-6 text-left font-bold">Mô tả</th>
                            <th className="p-6 text-right font-bold">Hành động</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50 ">
                        {brands.map((brand) => (
                            <tr key={brand._id} className="hover:bg-gray-50/50 transition-colors group">
                                <td className="p-6 text-sm font-bold tracking-wide">{brand.name}</td>
                                <td className="p-6 text-xs text-gray-500 uppercase">{brand.origin || '---'}</td>
                                <td className="p-6 text-xs text-gray-400 max-w-xs truncate">{brand.description || '---'}</td>
                                <td className="p-6 text-right">
                                    <div className="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button className="text-gray-400 hover:text-black transition-colors"><Edit2 size={16} /></button>
                                        <button className="text-gray-400 hover:text-red-500 transition-colors"><Trash2 size={16} /></button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-6">
                    <div className="bg-white w-full max-w-md p-10 shadow-2xl relative">
                        <button onClick={closeModal} className="absolute top-6 right-6 text-gray-400 hover:text-black">
                            <X size={20} />
                        </button>
                        <h2 className="font-serif text-2xl tracking-widest border-b pb-4 mb-8 uppercase">
                            {isEditing ? "Cập nhật hãng" : "Thêm hãng mới"}
                        </h2>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="text-[10px] uppercase font-bold tracking-widest block mb-2">Tên hãng</label>
                                <input
                                    type="text" required
                                    className="w-full border-b border-gray-200 py-2 focus:border-black outline-none transition-colors text-sm"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="text-[10px] uppercase font-bold tracking-widest block mb-2">Xuất xứ</label>
                                <input
                                    type="text"
                                    className="w-full border-b border-gray-200 py-2 focus:border-black outline-none transition-colors text-sm"
                                    placeholder="Ví dụ: Pháp, Ý..."
                                    value={formData.origin}
                                    onChange={(e) => setFormData({ ...formData, origin: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="text-[10px] uppercase font-bold tracking-widest block mb-2">Mô tả ngắn</label>
                                <textarea
                                    className="w-full border border-gray-100 p-3 focus:border-black outline-none transition-colors text-sm min-h-[100px]"
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                />
                            </div>
                            <button type="submit" className="w-full bg-black text-white py-4 text-[10px] uppercase font-bold tracking-widest hover:bg-gray-800 transition-all">
                                {isEditing ? "Cập nhật ngay" : "Lưu thương hiệu"}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>




    )
}

export default AdminBrandPage