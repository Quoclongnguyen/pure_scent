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
        <div className='bg-white border border-gray-100 shadow-sm overflow-hidden animate-in fade-in duration-500'>
            <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white p-6 border-b border-gray-100 gap-4'>
                <div>
                    <h2 className='font-serif text-2xl tracking-widest uppercase'>Quản lý Danh mục</h2>
                    <p className="text-[10px] text-gray-400 uppercase tracking-widest mt-1">Phân loại các nhóm hương tinh hoa</p>
                </div>
                <button onClick={() => setIsModalOpen(true)}
                    className='bg-black text-white px-6 py-3 text-[10px] uppercase font-bold tracking-widest flex items-center gap-2 hover:bg-gray-800 transition-all cursor-pointer shrink-0'
                >
                    <Plus size={16} />Thêm danh mục mới
                </button>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full border-collapse min-w-[800px]">
                    <thead>
                        <tr className="border-b border-gray-100 text-[10px] uppercase tracking-[0.2em] text-gray-400 bg-gray-50">
                            <th className="p-4 text-left font-bold">Tên Danh mục</th>
                            <th className="p-4 text-left font-bold">Mô tả</th>
                            <th className="p-4 text-center font-bold">Số lượng SP</th>
                            <th className="p-4 text-right font-bold">Thao tác</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {categories.map((category) => (
                            <tr key={category._id} className="hover:bg-gray-50/50 transition-colors group">
                                <td className="p-4 text-sm font-bold tracking-wide flex items-center gap-3">
                                    <Tag size={16} className="text-gray-400" />
                                    {category.name}
                                </td>
                                <td className="p-4 text-xs text-gray-500 max-w-xs truncate">{category.description || '---'}</td>
                                <td className="p-4 text-center">
                                    <span className="bg-gray-100 text-[10px] px-2 py-0.5 rounded text-gray-500 font-bold">{category.count || 0} SP</span>
                                </td>
                                <td className="p-4 text-right">
                                    <div className="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button onClick={() => handleEdit(category)} className="p-2 text-gray-400 hover:text-black transition-colors" title="Sửa danh mục"><Edit3 size={16} /></button>
                                        <button onClick={() => handleDelete(category._id)} className="p-2 text-gray-400 hover:text-red-500 transition-colors" title="Xóa danh mục"><Trash2 size={16} /></button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
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
