
import { Outlet, Route, Routes } from 'react-router-dom'
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

function App() {


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

        </Route>


        {/* Admin Routes */}
        <Route
          path='/admin'
          element={<AdminLayout />}>
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
            element={<div>Quản lý danh mục</div>} />
        </Route>
      </Routes>




    </>
  )
}

export default App
