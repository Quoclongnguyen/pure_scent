import React, { createContext, useContext, useEffect, useState } from 'react'
import AuthContext from './AuthContext'
import api from '../utils/Axios'

const CartContext = createContext()

export const CartProvider = ({ children }) => {
    const { userInfo } = useContext(AuthContext) // lấy thông tin login
    const [cartItems, setCartItems] = useState(() => {
        const saveCart = localStorage.getItem('pure_scent_cart')
        return saveCart ? JSON.parse(saveCart) : []

    })

    // Khi giỏ hàng thay đổi=> lưu vào localstorage 
    useEffect(() => {
        localStorage.setItem('pure_scent_cart', JSON.stringify(cartItems))

    }, [cartItems])

    // fetch giỏ hàng từ DB hoặc Sync khi đăng nhập
    useEffect(() => {
        const fetchOrSyncCart = async () => {
            if (userInfo) {
                try {
                    let backendItems = []
                    // Kiểm tra xem giỏ hàng hiện tại có phải là giỏ hàng của "Khách" vừa đăng nhập không
                    const isGuestCart = localStorage.getItem('pure_scent_cart_is_guest') === 'true'

                    if (cartItems.length > 0 && isGuestCart) {
                        // Nếu là khách vừa đăng nhập -> Gọi SYNC để hợp nhất (Dồn thêm)
                        const { data } = await api.post('/api/cart/sync', {
                            localItems: cartItems
                        })
                        backendItems = data.cartItems
                        // Sau khi sync xong, xóa cờ guest đi để lần sau refresh chỉ fetch
                        localStorage.removeItem('pure_scent_cart_is_guest')
                    } else {
                        // Nếu đã đăng nhập từ trước (refresh trang) -> Chỉ FETCH từ DB (Source of truth)
                        const { data } = await api.get('/api/cart')
                        backendItems = data.cartItems || []
                    }

                    const formattedItems = backendItems.map(item => ({
                        ...item,
                        id: item.product,
                        price: Number(item.price) || 0,
                        quantity: Number(item.quantity) || 0
                    }))
                    setCartItems(formattedItems)
                } catch (error) {
                    console.error('Lỗi khi đồng bộ giỏ hàng ', error)
                }
            } else {
                // Nếu chưa đăng nhập, đánh dấu giỏ hàng hiện tại là của khách
                if (cartItems.length > 0) {
                    localStorage.setItem('pure_scent_cart_is_guest', 'true')
                }
            }
        }
        fetchOrSyncCart()
    }, [userInfo])  // Chạy lại mỗi khi trạng thái đăng nhập thay đổi

    const addToCart = async (product, variant, quantity) => {
        const isGuest = !userInfo;
        const newItem = {
            id: product._id,
            name: product.name,
            brand: product.brand?.name || product.brand || "PureScent",
            image: product.images[0],
            price: Number(variant.discountPrice || variant.originalPrice), // ép kiểu số
            size: variant.size,
            quantity: Number(quantity)
        }

        if (isGuest) {
            localStorage.setItem('pure_scent_cart_is_guest', 'true')
        }
        setCartItems(prev => {
            const existItem = prev.find(x =>
                x.id === newItem.id && x.size === newItem.size
            )
            if (existItem) {
                return prev.map(x =>
                    x.id === newItem.id && x.size === newItem.size
                        ? { ...x, quantity: (Number(x.quantity) || 0) + Number(quantity) }
                        : x
                )
            }
            return [...prev, newItem]

            // Nếu đã login báo cho server biết

        })
        if (userInfo) {
            try {
                await api.post('/api/cart/add', {
                    product: newItem.id,
                    name: newItem.name,
                    image: newItem.image,
                    price: newItem.price,
                    size: newItem.size,
                    quantity: newItem.quantity
                })
            } catch (error) {
                console.error('Lỗi gửi giỏ hàng lên server', error)
            }
        }
    }


    const removeFromCart = async (productId, size) => {
        setCartItems(prev =>
            prev.filter(x =>
                !(x.id === productId && x.size === size)
            )
        )
        if (userInfo) {
            try {
                await api.post('/api/cart/remove', {
                    productId: productId, size
                })
            } catch (error) {
                console.error("Lỗi xóa sản phẩm trên server:", error)
            }
        }
    }


    const updateQuantity = async (productId, size, amout) => {
        let newQty = 0
        setCartItems(prev => prev.map(item => {
            if (item.id === productId && item.size === size) {
                newQty = Math.max(1, (Number(item.quantity) || 0) + amout)
                return { ...item, quantity: newQty }
            }
            return item
        }
        ))

        if (userInfo && newQty > 0) {
            try {
                await api.put('/api/cart/update', {
                    product: productId,
                    size,
                    quantity: newQty
                })
            } catch (error) {
                console.error('Lỗi khi cập nhật số lượng trên server', error)
            }
        }
    }

    const cartCount = cartItems.reduce((acc, item) => acc + (Number(item.quantity) || 0), 0) // tính tổng sản phẩm
    const cartTotal = cartItems.reduce((acc, item) => acc + ((Number(item.price) || 0) * (Number(item.quantity) || 0)), 0)





    return (
        <CartContext.Provider value={{
            cartItems,
            addToCart,
            removeFromCart,
            updateQuantity,
            cartCount,
            cartTotal
        }}>
            {children}
        </CartContext.Provider>
    )
}

export default CartContext