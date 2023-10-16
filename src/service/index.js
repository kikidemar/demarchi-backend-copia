import  ProductDaoMongo  from '../dao/Mongo/productDao.mongo.js'
import ProductRepository from "../repositories/product.repository.js"

const productService = new ProductRepository(new ProductDaoMongo())

export default productService 