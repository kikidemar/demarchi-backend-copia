import {Router} from "express";
import prod_manager from '../../dao/managers/productos.js'

const products_router = Router()

products_router.get('/', async (req, res, next) =>{
  try { 
    let products = prod_manager.getProducts()
    if(Number(req.query.limit)){
      let limit = req.query.limit
      let productsLimit = products.slice(0, limit)
      return res.send({
        status: 200,
        'products': productsLimit
      })
    } else {
      return res.send({
        status: 200,
        'products': products
      })
    } 
  } catch (error){
    next(error)
  }
  })

  products_router.post('/', async (req, res, next) =>{
    try {

      let title = req.body.title
      let description = req.body.description
      let price = Number(req.body.price)
      let thumbnail = req.body.thumbnail
      let stock = Number(req.body.stock)
      let code = req.body.code

      let response = await prod_manager.addProduct({title, description, price, thumbnail, stock, code})
      if (response===201) {
        return res.json({ status:201, message: `product ${title} created`})
      }
      return res.json({ status: 400, message: 'not created'})
    } catch(error){
      next(error)
    }
  })

products_router.get('/:pid', async (req, res, next) =>{
  try {
    let id = Number(req.params.pid)
    let product = prod_manager.getProductById(id)

    if (product) {
    return res.send({
      status: 200,
      'product': product
    })
    } else {
      return res.send({
        status: 404,
        'product': 'not found'
      })
    }}
     catch(error){
      next(error)
    }
  })


  products_router.put('/:pid', async (req, res, next) =>{
    try{
      let id = Number(req.params.pid)
      let data = req.body
      let response = await prod_manager.updateProduct(id,data)
      if (response===200) {
        return res.json({status: 200, message:'product updated'})
      } else{
        return res.json({ status:404, message:'not found'})
      }
    } catch(error){
      next(error)
    }
  })


  products_router.delete('/:pid', async(req, res, next)=> {
    try{
      let id = Number(req.params.pid)
      let response = await prod_manager.deleteProduct(id)
      if (response===200) {
        return res.json({status: 200, message:'product deleted'})
      } 
      return res.json({status:404, message:'not found'})
    } catch(error){
      next(error)
    }
  })

export default products_router