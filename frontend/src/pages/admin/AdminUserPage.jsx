import { Trash2, Shield, User as UserIcon, ShieldAlert } from 'lucide-react'
import React, { useState, useEffect } from 'react'
import api from '../../utils/Axios.js'
import { toast } from 'sonner'
import AuthContext from '../../context/AuthContext'
import { useContext } from 'react'
import Pagination from '../../components/ui/Pagination.jsx'
import TableSkeleton from '../../components/ui/TableSkeleton.jsx'

const AdminUserPage = () => {
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 10
    const { userInfo } = useContext(AuthContext)
    const isSuperAdmin = userInfo.role === 'superAdmin' || (userInfo.isAdmin && (!userInfo.role || userInfo.role === 'user'))

    const fetchUsers = async () => {
        try {
            setLoading(true)
            const { data } = await api.get('/api/users')
            setUsers(data)
            setLoading(false)
        } catch (error) {
            toast.error("Không thể tải danh sách người dùng")
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchUsers()
    }, [])

    const handleUpdateRole = async (id, newRole) => {
        if (!window.confirm(`Bạn có chắc chắn muốn chuyển quyền người dùng này thành ${newRole.toUpperCase()}?`)) return;
        try {
            await api.put(`/api/users/${id}/role`, { role: newRole });
            toast.success("Đã cập nhật quyền thành công");
            fetchUsers();
        } catch (error) {
            toast.error(error.response?.data?.message || "Lỗi khi cập nhật quyền");
        }
    }

    const handleDeleteUser = async (id, isAdmin) => {
        if (isAdmin) {
            toast.error("Không thể xóa tài khoản Quản trị viên!")
            return
        }

        if (id === userInfo._id) {
            toast.error("Bạn không thể tự xóa chính mình!")
            return
        }

        if (window.confirm("Bạn có chắc chắn muốn xóa người dùng này? Thao tác này không thể hoàn tác.")) {
            try {
                await api.delete(`/api/users/${id}`)
                toast.success("Đã xóa người dùng thành công")
                fetchUsers()
            } catch (error) {
                toast.error(error.response?.data?.message || "Lỗi khi xóa người dùng")
            }
        }
    }

    const totalPages = Math.ceil(users.length / itemsPerPage)
    const currentUsers = users.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

    if (loading) return (
        <div className="p-10">
            <TableSkeleton rows={8} />
        </div>
    )

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* HEADER */}
            <div className="bg-white p-6 border border-gray-100 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-xl font-serif tracking-widest uppercase">Quản lý Người dùng</h1>
                    <p className="text-[10px] text-gray-400 uppercase tracking-widest mt-1">Danh sách tài khoản khách hàng và quản trị viên</p>
                </div>
                <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-gray-400">
                    Tổng cộng: {users.length} tài khoản
                </div>
            </div>

            {/* TABLE */}
            <div className="bg-white border border-gray-100 shadow-sm overflow-x-auto">
                {users.length === 0 ? (
                    <div className="p-10 text-center text-sm font-serif italic text-gray-400">Không có người dùng nào.</div>
                ) : (
                    <table className="w-full text-left border-collapse min-w-[800px]">
                        <thead className="bg-gray-50 border-b border-gray-100">
                            <tr>
                                <th className="p-4 text-[10px] uppercase tracking-widest font-bold text-gray-400 w-16">STT</th>
                                <th className="p-4 text-[10px] uppercase tracking-widest font-bold text-gray-400">Người dùng</th>
                                <th className="p-4 text-[10px] uppercase tracking-widest font-bold text-gray-400">Email</th>
                                <th className="p-4 text-[10px] uppercase tracking-widest font-bold text-gray-400 text-center">Vai trò</th>
                                <th className="p-4 text-[10px] uppercase tracking-widest font-bold text-gray-400 text-right">Thao tác</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {currentUsers.map((user, index) => (
                                <tr key={user._id} className="hover:bg-gray-50/50 transition-colors">
                                    <td className="p-4 text-xs font-mono text-gray-400">{(currentPage - 1) * itemsPerPage + index + 1}</td>
                                    <td className="p-4 text-sm font-bold">{user.name} {user._id === userInfo._id && <span className="text-[9px] uppercase tracking-widest text-emerald-500 font-bold ml-2">(Bạn)</span>}</td>
                                    <td className="p-4 text-sm text-gray-500">{user.email}</td>
                                    <td className="p-4 text-center">
                                        {user.role === 'superAdmin' || (user.isAdmin && (!user.role || user.role === 'user')) ? (
                                            <span className="inline-flex items-center gap-1 px-3 py-1 bg-red-600 text-white text-[9px] font-bold uppercase tracking-widest">
                                                <Shield size={10} /> Super Admin
                                            </span>
                                        ) : user.role === 'staff' ? (
                                            <span className="inline-flex items-center gap-1 px-3 py-1 bg-black text-white text-[9px] font-bold uppercase tracking-widest">
                                                <Shield size={10} /> Staff
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center gap-1 px-3 py-1 border border-gray-200 text-gray-500 text-[9px] font-bold uppercase tracking-widest">
                                                <UserIcon size={10} /> User
                                            </span>
                                        )}
                                    </td>
                                    <td className="p-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            {isSuperAdmin && user._id !== userInfo._id && (
                                                <select 
                                                    className="text-[9px] uppercase tracking-widest font-bold border border-gray-200 p-1.5 focus:outline-none"
                                                    value={user.role || (user.isAdmin ? 'superAdmin' : 'user')}
                                                    onChange={(e) => handleUpdateRole(user._id, e.target.value)}
                                                >
                                                    <option value="user">User</option>
                                                    <option value="staff">Staff</option>
                                                    <option value="superAdmin">SuperAdmin</option>
                                                </select>
                                            )}

                                            {isSuperAdmin && user._id !== userInfo._id ? (
                                                <button
                                                    onClick={() => handleDeleteUser(user._id, user.isAdmin)}
                                                    className="text-gray-400 hover:text-red-500 transition-colors p-2 border border-transparent hover:border-red-100"
                                                    title="Xóa tài khoản"
                                                >
                                                    <Trash2 size={14} />
                                                </button>
                                            ) : (
                                                <button disabled className="text-gray-200 p-2 cursor-not-allowed" title="Không có quyền thao tác">
                                                    <ShieldAlert size={14} />
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
                {totalPages > 1 && (
                    <div className='pb-10 pt-4 flex justify-center'>
                        <Pagination page={currentPage} pages={totalPages} setPage={setCurrentPage} />
                    </div>
                )}
            </div>
        </div>
    )
}

export default AdminUserPage
