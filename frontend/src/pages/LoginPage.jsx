import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff, Mail, Lock, ArrowRight } from 'lucide-react'
import AuthContext from '../context/AuthContext';
import api from '../utils/Axios.js'
import { toast } from 'sonner';

const LoginPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('')
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const { login } = useContext(AuthContext)
    const navigate = useNavigate()
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {

            const res = await api.post('/api/users/login', {

                email: formData.email,
                password: formData.password
            });


            login(res.data);
            toast.success("Đăng nhập thành công!");
            navigate('/');

        } catch (error) {
            console.log("lỗi khi đăng nhập".error)
            setError(error.response?.data?.message || "Đã có lỗi xảy ra!");
            toast.error("Đăng nhập không thành công!");

        }
    };

    return (
        <main className="min-h-screen flex items-center justify-center bg-[#fcfcfc] px-6 py-20">


            <div className="w-full max-w-md bg-white p-10 md:p-16 shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-gray-50 rounded-sm space-y-12 animate-in fade-in zoom-in-95 duration-700">


                <div className="space-y-4 text-center">
                    <h1 className="font-serif text-4xl tracking-tight text-black">Chào mừng trở lại</h1>
                    <p className="text-gray-400 text-[10px] uppercase tracking-[0.3em] font-medium leading-relaxed">
                        Đăng nhập vào tài khoản <br /> tinh hoa của bạn
                    </p>
                </div>


                {/* Form */}
                <form className="space-y-8" onSubmit={handleSubmit}>
                    <div className="space-y-6">

                        <div className="relative group">
                            <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400 group-focus-within:text-black transition-colors">Địa chỉ Email</label>
                            <div className="flex items-center border-b border-gray-100 group-focus-within:border-black transition-all py-2">
                                <Mail size={16} className="text-gray-300 mr-3" />
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="your@email.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full bg-transparent focus:outline-none text-sm placeholder:text-gray-200"
                                />
                            </div>
                        </div>

                        <div className="relative group">
                            <div className="flex justify-between items-end">
                                <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400 group-focus-within:text-black transition-colors">Mật khẩu</label>
                                <Link to="/forgot-password" size="sm" className="text-[10px] text-gray-400 hover:text-black transition-colors underline underline-offset-4 capitalize">Quên mật khẩu?</Link>
                            </div>
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
                    </div>
                    {error && <p className="text-red-500 text-[11px] text-center mb-4 italic">{error}</p>}

                    {/* Submit Button */}
                    <button className="w-full bg-black text-white py-5 text-[10px] font-bold uppercase tracking-[0.4em] hover:bg-gray-800 transition-all flex items-center justify-center gap-3 group cursor-pointer shadow-xl shadow-black/5">
                        Đăng nhập
                        <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                </form>

                {/* Social Login (Placeholders) */}
                <div className="space-y-6">
                    <div className="relative flex items-center justify-center">
                        <div className="w-full border-t border-gray-100"></div>
                        <span className="absolute bg-white px-4 text-[10px] text-gray-300 uppercase tracking-widest">
                            Hoặc đăng nhập với
                        </span>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <button className="flex items-center justify-center gap-3 border border-gray-100 py-3 hover:border-black transition-all text-[10px] font-bold uppercase tracking-widest cursor-pointer">
                            <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-4 h-4" alt="Google" />
                            Google
                        </button>
                        <button className="flex items-center justify-center gap-3 border border-gray-100 py-3 hover:border-black transition-all text-[10px] font-bold uppercase tracking-widest cursor-pointer">
                            <img src="https://www.svgrepo.com/show/475647/facebook-color.svg" className="w-4 h-4" alt="Facebook" />
                            Facebook
                        </button>
                    </div>
                </div>

                <p className="text-center text-sm text-gray-500">
                    Chưa có tài khoản?{' '}
                    <Link to="/register" className="text-black font-bold hover:underline underline-offset-4">Đăng ký ngay</Link>
                </p>
            </div>


        </main >
    )
}

export default LoginPage