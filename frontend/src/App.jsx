
import { Link, Navigate, Outlet, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import Navbar from './components/navbar/Navbar'
import Footer from './components/footer/Footer'
import ShopPage from './pages/ShopPage'
import BrandPage from './pages/BrandPage'
import ProductDetailPage from './pages/ProductDetailPage'
import CartPage from './pages/CartPage'
import CheckoutPage from './pages/CheckoutPage'
import RegisterPage from './pages/RegisterPage'
import AdminLayout from './pages/admin/AdminLayout'
import AdminProductPage from './pages/admin/AdminProductPage'
import AdminOrderPage from './pages/admin/AdminOrderPage'
import AdminCategoryPage from './pages/admin/AdminCategoryPage'
import { useContext } from 'react'
import AuthContext from './context/AuthContext'
import AdminRoute from './components/auth/AdminRoute'

function App() {

  const { userInfo } = useContext(AuthContext);

  return (
    <>
      <Routes>
        <Route element={
          <>
            <Navbar />
            <Outlet />
            <Footer />
          </>
        } >

          <Route path='/' element={<HomePage />} />

          <Route path='/shop' element={<ShopPage />} />

          <Route path='/brand' element={<BrandPage />} />

          <Route path='/product/:id' element={<ProductDetailPage />} />

          <Route path='/cart' element={<CartPage />} />

          <Route path='/checkout' element={<CheckoutPage />} />

          <Route path='/login' element={<LoginPage />} />

          <Route path='/register' element={<RegisterPage />} />

          <Route path='/profile' element={<div className="p-20 text-center font-serif text-2xl">Đang tiến hành</div>} />

          <Route path='/unauthorized' element={
            <div className="min-h-[60vh] flex flex-col items-center justify-center p-10 text-center space-y-6">
              <h1 className="font-serif text-4xl text-red-500 uppercase tracking-widest">Truy cập bị từ chối</h1>
              <p className="text-gray-400 text-sm max-w-md uppercase tracking-wider leading-relaxed">
                Tài khoản của bạn không có quyền quản trị để truy cập khu vực này. <br />Vui lòng liên hệ bộ phận kỹ thuật nếu đây là một sự nhầm lẫn.
              </p>
              <p className='text-white bg-gray-400  px-10 py-4 text-[10px] uppercase font-bold tracking-[0.3em] hover:bg-gray-800 transition-all'>
                <Link to="/" >
                  Quay lại trang chủ
                </Link></p>

            </div>
          } />

        </Route>


        {/* Admin Routes */}
        <Route
          path='/admin'
          element={<AdminRoute />} >
          <Route element={<AdminLayout />}>
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
            <Route
              path='dashboard'
              element={<div className="text-xl font-serif">Chào mừng quay lại, Admin</div>} />
            <Route
              path='products'
              element={<AdminProductPage />} />
            <Route
              path='orders'
              element={<AdminOrderPage />} />
            <Route
              path='categories'
              element={<AdminCategoryPage />} />
          </Route>


        </Route>
      </Routes>




    </>
  )
}

export default App
