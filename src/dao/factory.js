import config from "../config/config.js"

let ProductDao
let CartDao
let UserDao

switch (config.persistence) {
    case 'MONGO':
      ProductDao = require('../Mongo/productDao.mongo.js')
      CartDao = require('../Mongo/cartDao.mongo.js')
      UserDao = require('../Mongo/authDao.mongo.js')

    break

    // case 'MEMORY':
    //   ProductDao = require('../dao/Memory/product.memory.js') 
    //   CartDao = require('../dao/Memory/cart.memory.js')
    //   UserDao = require('../dao/Memory/user.memory.js')
    // break

    case 'FILE':
      ProductDao = require('../dao/File/productDao.file.js') 
      CartDao = require('../dao/File/cartDao.file.js')
      UserDao = require('../dao/File/authDao.file.js')
    break
}

export default {ProductDao, CartDao, UserDao}