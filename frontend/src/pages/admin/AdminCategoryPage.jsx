import React, { useState } from 'react'
import { Plus, Tag, Trash2, Edit3, ChevronRight } from 'lucide-react'

const AdminCategoryPage = () => {

    const [categories, setCategories] = useState([
        { id: 1, name: "Woody (Hương Gỗ)", count: 12, description: "Ấm áp, nồng nàn và sang trọng." },
        { id: 2, name: "Floral (Hương Hoa)", count: 24, description: "Ngọt ngào, nữ tính và lãng mạn." },
        { id: 3, name: "Citrus (Hương Cam Chanh)", count: 8, description: "Tươi mát, năng động và sảng khoái." },
        { id: 4, name: "Oriental (Hương Phương Đông)", count: 15, description: "Bí ẩn, quyến rũ và đậm đà." },
        { id: 4, name: "Oriental (Hương Phương Đông)", count: 15, description: "Bí ẩn, quyến rũ và đậm đà." },
        { id: 4, name: "Oriental (Hương Phương Đông)", count: 15, description: "Bí ẩn, quyến rũ và đậm đà." },
        { id: 4, name: "Oriental (Hương Phương Đông)", count: 15, description: "Bí ẩn, quyến rũ và đậm đà." },
        { id: 4, name: "Oriental (Hương Phương Đông)", count: 15, description: "Bí ẩn, quyến rũ và đậm đà." },
        { id: 4, name: "Oriental (Hương Phương Đông)", count: 15, description: "Bí ẩn, quyến rũ và đậm đà." },
    ]);

    const [newCategory, setNewCategory] = useState("");

    const handleAddCategory = () => {
        if (newCategory.trim()) {
            const newItem = {
                id: categories.length + 1,
                name: newCategory,
                count: 0,
                description: "Danh mục mới được thêm."
            };
            setCategories([...categories, newItem]);
            setNewCategory("");
        }
    };

    return (
        <div className="max-w-4xl space-y-10 animate-in fade-in duration-700">
            {/* --- HEADER & QUICK ADD --- */}
            <div className="bg-white p-10 border border-gray-100 shadow-sm space-y-8">
                <div>
                    <h1 className="text-2xl font-serif tracking-widest text-black">Quản lý Danh mục</h1>
                    <p className="text-[11px] text-gray-400 uppercase tracking-[0.2em] mt-2 font-medium">Phân loại các nhóm hương tinh hoa</p>
                </div>

                <div className="flex gap-4">
                    <div className="relative flex-1 group">
                        <Tag size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-black transition-colors" />
                        <input
                            type="text"
                            placeholder="Nhập tên danh mục mới (vd: Amber, Spicy...)"
                            value={newCategory}
                            onChange={(e) => setNewCategory(e.target.value)}
                            className="w-full bg-gray-50 border border-gray-100 py-4 pl-12 pr-4 text-xs focus:outline-none focus:bg-white focus:border-black transition-all"
                        />
                    </div>
                    <button
                        onClick={handleAddCategory}
                        className="bg-black text-white px-10 py-4 text-[10px] uppercase font-bold tracking-[0.3em] hover:bg-gray-800 transition-all flex items-center gap-3 shrink-0 cursor-pointer"
                    >
                        <Plus size={16} /> Thêm nhanh
                    </button>
                </div>
            </div>


            <div className="grid grid-cols-1 gap-4">
                {categories.map((category) => (
                    <div
                        key={category.id}
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
                            <button className="p-3 text-gray-300 hover:text-black hover:bg-gray-50 transition-all rounded-full">
                                <Edit3 size={16} />
                            </button>
                            <button className="p-3 text-gray-300 hover:text-red-500 hover:bg-red-50 transition-all rounded-full">
                                <Trash2 size={16} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default AdminCategoryPage
