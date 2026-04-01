
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import Navbar from './components/navbar/Navbar'
import Footer from './components/footer/Footer'
import ShopPage from './pages/ShopPage'
import BrandPage from './pages/BrandPage'
import ProductDetailPage from './pages/ProductDetailPage'
import CartPage from './pages/CartPage'
import CheckoutPage from './pages/CheckoutPage'

function App() {


  return (
    <>
      <Navbar />
      <Routes>

        <Route
          path='/'
          element={<HomePage />} />

        <Route
          path='/shop'
          element={<ShopPage />} />

        <Route
          path='/brand'
          element={<BrandPage />} />

        <Route
          path='/product/:id'
          element={<ProductDetailPage />} />

        <Route
          path='/cart'
          element={<CartPage />} />

        <Route
          path='/checkout'
          element={<CheckoutPage />} />

        <Route
          path='/login'
          element={<LoginPage />} />
      </Routes>
      <Footer />



    </>
  )
}

export default App
