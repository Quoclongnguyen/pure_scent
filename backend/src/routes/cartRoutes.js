import express from 'express'
import { addItemToCart, getCart, removeFromCart, syncCart, updateCartItem } from '../controllers/cartController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()


router.use(protect)

router.route('/').get(getCart)
router.post('/add', addItemToCart)
router.put('/update', updateCartItem)
router.post('/remove', removeFromCart)// Dùng POST để dễ dàng gửi body (product id, size)
//DELETE không tiện gửi body => backend khó lấy data
router.post('/sync', syncCart)

export default router