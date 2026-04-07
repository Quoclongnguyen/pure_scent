import React, { useState } from 'react'
import { Plus, Tag, Trash2, Edit3, ChevronRight, X } from 'lucide-react'
import api from '../../utils/Axios.js'
import { useEffect } from 'react';

const AdminCategoryPage = () => {

    const [categories, setCategories] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [editId, setEditId] = useState(null)
    const [formData, setFormData] = useState({ name: '', description: '' });

    const fetchCategories = async () => {
        const { data } = await api.get('/api/categories')
        setCategories(data)
    }

    useEffect(() => {
        fetchCategories()
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            if (editId) {
                await api.put(`/api/categories/${editId}`, formData)

            } else {
                await api.post('/api/categories', formData)
            }
            setIsModalOpen(false)
            setEditId(null)
            setFormData({ name: '', description: '' })
            alert('thêm danh mục sản phẩm thành công')
            fetchCategories()
        } catch (error) {
            console.error("Lỗi khi cập nhật danh mục sản phẩm", error)
        }
    }

    const handleEdit = async (category) => {
        try {
            setEditId(category._id)
            setFormData({
                name: category.name,
                description: category.description
            })
            setIsModalOpen(true);
        } catch (error) {
            console.error("Lỗi khi sửa danh mục sản phẩm", error)

        }

    }

    const handleDelete = async (id) => {
        try {
            if (window.confirm('Xác nhận xóa danh mục')) {
                await api.delete(`/api/categories/${id}`)
            }
            fetchCategories()
        } catch (error) {
            console.error('Lỗi khi xóa danh mục ', error)
        }
    }


    return (
        <div className="max-w-4xl space-y-10 animate-in fade-in duration-700">
            {/* --- HEADER & QUICK ADD --- */}
            <div className="flex justify-between bg-white p-10 border border-gray-100 shadow-sm space-y-4">
                <div>
                    <h1 className="text-2xl font-serif tracking-widest text-black">Quản lý Danh mục</h1>
                    <p className="text-[11px] text-gray-400 uppercase tracking-[0.2em] mt-2 font-medium">Phân loại các nhóm hương tinh hoa</p>
                </div>

                <div className=" gap-4">
                    <div className="relative flex-1 group">
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="bg-black text-white px-10 py-4 text-[10px] uppercase font-bold tracking-[0.3em] hover:bg-gray-800 transition-all flex items-center gap-3 shrink-0 cursor-pointer"
                        >
                            <Plus size={16} /> Thêm nhanh
                        </button>
                    </div>

                </div>
            </div>


            <div className="grid grid-cols-1 gap-4">
                {categories.map((category) => (
                    <div
                        key={category._id}
                        className="group bg-white border border-gray-50 p-6 flex items-center justify-between hover:shadow-xl hover:shadow-black/5 hover:border-gray-200 transition-all duration-500"
                    >
                        <div className="flex items-center gap-6">
                            <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center text-gray-300 group-hover:bg-black group-hover:text-white transition-all duration-500">
                                <Tag size={20} strokeWidth={1.5} />
                            </div>
                            <div>
                                <div className="flex items-center gap-4">
                                    <h3 className="text-sm font-bold tracking-tight text-gray-900">{category.name}</h3>
                                    <span className="bg-gray-100 text-[10px] px-2 py-0.5 rounded text-gray-400 font-bold">{category.count} sản phẩm</span>
                                </div>
                                <p className="text-xs text-gray-400 mt-1 italic">{category.description}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <button
                                onClick={() => handleEdit(category)}
                                className="p-3 text-gray-300 hover:text-black hover:bg-gray-50 transition-all rounded-full">
                                <Edit3 size={16} />
                            </button>
                            <button
                                onClick={() => handleDelete(category._id)}
                                className="p-3 text-gray-300 hover:text-red-500 hover:bg-red-50 transition-all rounded-full">
                                <Trash2 size={16} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-in fade-in duration-300">
                    <div className="bg-white w-full max-w-xl shadow-2xl p-10 relative animate-in zoom-in-95 duration-300">


                        <button onClick={() =>
                            setIsModalOpen(false)}
                            className="absolute top-6 right-6 text-gray-400 hover:text-black">
                            <X size={20} /></button>

                        <h2 className="font-serif text-2xl tracking-widest border-b pb-4 mb-8">
                            Thêm danh mục sản phẩm mới</h2>



                        <form onSubmit={handleSubmit} className="space-y-6">

                            <div className='grid grid-cols2 gap-5'>
                                <div className='col-span-2'>
                                    <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">
                                        Tên Danh mục
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full border-b border-gray-100 py-2 focus:outline-none focus:border-black transition-colors"
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

export default AdminCategoryPage
