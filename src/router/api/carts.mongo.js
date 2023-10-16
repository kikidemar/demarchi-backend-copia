import { Router } from "express"
// import Cart from '../../dao/Mongo/models/Cart.js'
// import Product from "../../dao/Mongo/models/Product.js"
import CartController from "../../controllers/cart.controller.js"

const cart_router = Router()

cart_router.post('/', CartController.createCart)

cart_router.get('/', CartController.getCarts)

cart_router.get('/:cid', CartController.getCart)

cart_router.put('/:cid', CartController.updateCart)

cart_router.put("/:cid/product/:pid/:units", CartController.updateCartInfo)

cart_router.delete('/:cid', CartController.deleteCart)

cart_router.delete("/:cid/product/:pid/:units", CartController.deleteCartInfo)


export default cart_router