import {Router} from "express";
// import prod_manager from '../../dao/productos.js'
import auth from '../../middlewares/auth.js'
import passport from 'passport'
import passport_call from "../../middlewares/passport_call.js"
import ProductController from '../../controllers/product.controller.js'
import isPremium from "../../middlewares/isPremium.js";

const product_router = Router()

product_router.get('/', passport_call('jwt'), ProductController.getProducts)

product_router.post('/', passport_call('jwt'), isPremium, ProductController.createProduct)

product_router.get('/:pid', ProductController.getProduct)

product_router.put('/:pid', passport_call('jwt'), isPremium, ProductController.updateProduct)

product_router.delete('/:pid', passport_call('jwt'), isPremium, ProductController.deleteProduct)

export default product_router



// product_router.get('/', async (req, res, next) => {
//   try {
//       const productsPerPage = 6

//       const defaultPage = 1
//       const page = req.query.page ? parseInt(req.query.page) : defaultPage
//       const filter = req.query.filter ? req.query.filter : ''

//       const query = {}
//       if (filter) {
//           query.title = { $regex: new RegExp(filter, 'i') }
//       }

      
//       const products = await Product.paginate(query, {
//           page: page,
//           limit: productsPerPage
//       })

//       console.log(products)

//       return res.status(200).json(products)
//   } catch (error) {
//       next(error)
//   }
// })