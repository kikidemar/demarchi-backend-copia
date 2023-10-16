import Product from "./models/Product.js"

class ProductDaoMongo {
  constructor(){
    this.model = Product
  }

  get = async() => {
    return await this.model.find()
  }

  getBy = async(id) => {
    return await this.model.findById(id)
  }

  create = async({title, description, price, thumbnail, stock, owner}) => {
    return await this.model.create({title, description, price, thumbnail, stock, owner})
  }

  update = async(id,data) => {
    return await this.model.findByIdAndUpdate(id,data,{new:true})
  }

  delete = async(id) => {
    return await this.model.findByIdAndDelete(id)
  }
}

export default ProductDaoMongo