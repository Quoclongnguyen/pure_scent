import React, { createContext, useEffect, useState } from 'react'


const CartContext = createContext()

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState(() => {
        const saveCart = localStorage.getItem('pure_scrent_cart')
        return saveCart ? JSON.parse(saveCart) : []

    })

    useEffect(() => {
        localStorage.setItem('pure_scent_cart', JSON.stringify(cartItems))

    }, [cartItems])

    const addToCart = (product, variant, quantity) => {
        setCartItems(prev => {
            // Kiểm tra xem đã có sản phẩm này với dung tích này chưa
            const existingItemIndex = prev.findIndex(item =>
                item.id === product._id && item.size === variant.size)
            if (existingItemIndex > -1) {
                const newItems = [...prev]
                newItems[existingItemIndex].quantity += quantity
                return newItems
            } else {
                //Nếu chưa có thêm mới (lưu giá đã giảm)

                return [...prev, {
                    id: product._id,
                    name: product.name,
                    brand: product.brand?.name || product.brand || "PureScent",
                    image: product.images[0],
                    price: variant.discountPrice, // Lưu giá khuyến mãi tại thời điểm thêm
                    size: variant.size,
                    quantity: quantity
                }]
            }
        })
    }


    const removeFromCart = (id, size) => {
        setCartItems(prev =>
            prev.filter(item =>
                !(item.id === id && item.size === size)
            )

        )
    }


    const updateQuantity = (id, size, delta) => {
        setCartItems(prev => prev.map(item =>
            (item.id === id && item.size === size)
                ? { ...item, quantity: Math.max(1, item.quantity + delta) }
                : item
        ))
    }

    const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0) // tính tổng sản phẩm
    const cartTotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0)





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