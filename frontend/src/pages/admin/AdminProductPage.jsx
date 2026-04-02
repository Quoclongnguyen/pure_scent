import { Edit2, Plus, Trash2, X } from 'lucide-react'
import React, { useState } from 'react'

const AdminProductPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [products, setProducts] = useState([
        { id: 1, name: "Santal 33", category: "Gỗ", price: 5500000, img: "/src/assets/img1.png" },
        { id: 2, name: "Another 13", category: "Xạ hương", price: 5200000, img: "/src/assets/img1.png" },
    ]);
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
                    className="bg-black text-white px-6 py-3 text-[12px] uppercase font-bold tracking-widest flex items-center gap-2 hover:bg-gray-800 transition-all cursor-pointer">

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
                            <tr key={product.id} className="hover:bg-gray-50/50 transition-colors">
                                <td className="p-6"><img src={product.img} className="w-12 h-12 object-cover grayscale-0" /></td>
                                <td className="p-6 text-sm font-bold">{product.name}</td>
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
                        <div className="space-y-6">
                            <div>
                                <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">
                                    Tên nước hoa
                                </label>
                                <input
                                    type="text"
                                    className="w-full border-b border-gray-100 py-2 focus:outline-none focus:border-black transition-colors"
                                />
                            </div>
                            {/* ...*/}
                            <button className="w-full bg-black text-white py-4 text-[10px] uppercase font-bold tracking-widest mt-8">
                                Lưu sản phẩm
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>


    )
}

export default AdminProductPage