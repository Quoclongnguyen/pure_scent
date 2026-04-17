import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { User, Mail, Lock, ShieldCheck, ArrowRight, Eye, EyeOff } from 'lucide-react'
import api from '../utils/Axios.js'
import { AuthContext } from '../context/AuthContext' // Kho lưu trữ thông tin
import { toast } from 'sonner'


const RegisterPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setshowConfirmPassword] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');
    const { login } = useContext(AuthContext)
    const navigate = useNavigate()

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('') // reser lỗi cũ

        if (formData.password !== formData.confirmPassword) {
            return setError("Mật khẩu xác nhập không khớp!!")
        }
        try {
            const res = await api.post('/api/users', {
                name: formData.name,
                email: formData.email,
                password: formData.password
            })
            login(res.data)
            toast.success("Đăng ký thành công")
            navigate('/');
        } catch (error) {
            setError(error.response?.data?.message || "Đã có lỗi xảy ra!"); // nếu err thông báo từ server
            toast.error("Đăng ký không thành công")

        }
    }

    return (
        <main className="min-h-screen flex items-center justify-center bg-[#fcfcfc] px-6 py-20">


            <div className="w-full max-w-lg bg-white p-10 md:p-16 shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-gray-50 rounded-sm space-y-12 animate-in fade-in zoom-in-95 duration-700">

                {/* Header */}
                <div className="space-y-4 text-center">
                    <h1 className="font-serif text-4xl tracking-tight text-black">Tạo tài khoản</h1>
                    <p className="text-gray-400 text-[10px] uppercase tracking-[0.3em] font-medium leading-relaxed">
                        Tham gia cùng chúng tôi để nhận <br /> những ưu đãi độc quyền
                    </p>
                </div>


                {/* Form */}
                <form className="space-y-6" onSubmit={handleSubmit}>

                    <div className="space-y-6">

                        <div className="relative group">
                            <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400 group-focus-within:text-black transition-colors">Họ và tên</label>
                            <div className="flex items-center border-b border-gray-100 group-focus-within:border-black transition-all py-2">
                                <User size={16} className="text-gray-300 mr-3" />
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Nguyễn Văn A"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full bg-transparent focus:outline-none text-sm placeholder:text-gray-200"
                                />
                            </div>
                        </div>


                        <div className="relative group">
                            <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400 group-focus-within:text-black transition-colors">Địa chỉ Email</label>
                            <div className="flex items-center border-b border-gray-100 group-focus-within:border-black transition-all py-2">
                                <Mail size={16} className="text-gray-300 mr-3" />
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="example@gmail.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full bg-transparent focus:outline-none text-sm placeholder:text-gray-200"
                                />
                            </div>
                        </div>


                        <div className="relative group">
                            <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400 group-focus-within:text-black transition-colors">Mật khẩu</label>
                            <div className="flex items-center border-b border-gray-100 group-focus-within:border-black transition-all py-2">
                                <Lock size={16} className="text-gray-300 mr-3" />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    placeholder="••••••••"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="w-full bg-transparent focus:outline-none text-sm placeholder:text-gray-200"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="text-gray-300 hover:text-black transition-colors cursor-pointer"
                                >
                                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                </button>
                            </div>
                        </div>

                        {/* Confirm Password */}
                        <div className="relative group">
                            <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400 group-focus-within:text-black transition-colors">
                                Xác nhận mật khẩu
                            </label>
                            <div className="flex items-center border-b border-gray-100 group-focus-within:border-black transition-all py-2">
                                <ShieldCheck size={16} className="text-gray-300 mr-3" />
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    name="confirmPassword"
                                    placeholder="••••••••"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    className="w-full bg-transparent focus:outline-none text-sm placeholder:text-gray-200"

                                />
                                <button
                                    type="button"
                                    onClick={() => setshowConfirmPassword(!showConfirmPassword)}
                                    className="text-gray-300 hover:text-black transition-colors cursor-pointer"
                                >
                                    {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                </button>


                            </div>
                        </div>
                    </div>


                    <label className="flex items-center gap-3 cursor-pointer group py-2">
                        <input type="checkbox" className="w-4 h-4 accent-black border-gray-200" />
                        <span className="text-[11px] text-gray-500 group-hover:text-black transition-colors">
                            Nhận bản tin và ưu đãi đặc biệt từ PureScent qua Email
                        </span>
                    </label>
                    {error && <p className="text-red-500 text-[11px] text-center mb-4 italic">{error}</p>}

                    {/* Submit Button */}
                    <button className="w-full bg-black text-white py-5 text-[10px] font-bold uppercase tracking-[0.4em] hover:bg-gray-800 transition-all flex items-center justify-center gap-3 group mt-4 cursor-pointer shadow-xl shadow-black/5">
                        Đăng ký ngay
                        <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                </form>


                <p className="text-center text-sm text-gray-500">
                    Đã có tài khoản? {' '}
                    <Link to="/login" className="text-black font-bold hover:underline underline-offset-4"> Đăng nhập</Link>
                </p>

                {/* Terms */}
                <p className="text-[9px] text-center text-gray-400 leading-relaxed max-w-xs mx-auto">
                    Bằng cách đăng ký, bạn đồng ý với <span className="underline"> Điều khoản dịch vụ</span> và <span className="underline">
                        Chính sách bảo mật</span> của chúng tôi.
                </p>

            </div>
        </main >
    )
}

export default RegisterPage
