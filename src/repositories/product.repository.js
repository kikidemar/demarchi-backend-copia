class ProductRepository {
  constructor(dao){
    this.dao = dao
  }

  getProducts = async() => {
    let result = await this.dao.get()
    return result
  }

  getProduct = async(id) => {
    let result = await this.dao.getBy(id)
    return result
  }

  createProduct = async({title, description, price, thumbnail, stock, owner}) => {
    let result = await this.dao.create({title, description, price, thumbnail, stock, owner})
    return result
  }

  updateProduct = async(id,data) => {
    let result = await this.dao.update(id,data,{new:true})
    return result
  }

  deleteProduct = async(id) => {
    let result = await this.dao.delete(id)
    return result
  }

}

export default ProductRepository