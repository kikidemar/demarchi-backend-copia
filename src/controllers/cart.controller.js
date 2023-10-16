import Cart from '../dao/Mongo/models/Cart.js'
import Product from "../dao/Mongo/models/Product.js"

class CartController {

  createCart = async(req,res,next)=> {
    try {
        let response = await Cart.create({products: []})
        if (response) {
            console.log("Carrito creado:", response)
          return res.status(201).json({ id: response._id.toJSON(), cart: response, message: 'cart created' })
      }
      return res.status(400).json({ message: 'not created' })
  } catch (error) {
      next(error)
  }
}

  getCarts = async (req, res, next) => {
    try {
        const all = await Cart.find().exec()
        res.status(200).json(all)
    } catch (error) {
        next(error)
    }
  }

  getCart = async (req, res, next) => {
    try {
        let id = req.params.cid
        let one = await Cart.findById(id).exec()
        return res.status(200).json(one)
    } catch (error) {
        next(error)
    }
  }

  updateCart = async (req, res, next) => {
    try {
        let id = req.params.cid
        let data = req.body
  
        let response = await Cart.findByIdAndUpdate(id, data)
        if (response) {
            return res.status(200).json({ message: 'cart updated' })
        }
        return res.status(404).json({ message: 'not found' })
    } catch (error) {
        next(error)
    }
  }

  updateCartInfo = async (req, res, next) => {
    try {
        let id = req.params.pid;
        let cid = req.params.cid;
        let units = Number(req.params.units);
  
        let cart = await Cart.findById(cid)
        let product = await Product.findById(id)
  
        console.log(cart)
        console.log(product)
  
        if (cart && product) {
            if (product.stock >= units) {
                product.stock -= units
                const index = cart.products.findIndex(e=>e.product == id)
                if ( index == -1) {
                    cart.products.push({product: id, units: units})
                } else {
                    cart.products[index].units += units
                    cart.markModified('products');
                }
  
                await cart.save()
                await product.save()
  
                return res.status(200).json({ message: "Cart updated" });
            } else {
                return res
                    .status(400)
                    .json({ message: "Not enough stock available" });
            }
        } else {
            return res.status(404).json({ message: "Not found" });
        }
    } catch (error) {
        next(error);
    }
  }

  deleteCart = async (req, res, next) => {
    try {
        let id = req.params.cid
        let response = await Cart.findByIdAndDelete(id)
          if (response) {
            return res.json({ status: 200, message: 'cart deleted' })
          }
          return res.json({ status: 404, message: 'not found' })
        } catch (error) {
            next(error)
        }
    }

  deleteCartInfo = async (req, res, next) => {
    try {
        const cid = req.params.cid;
        const pid = req.params.pid;
        const units = Number(req.params.units);

        if (Number.isNaN(units)) { 
            return res.status(400).json({ message: "Invalid units parameter" });
        }

        const cart = await Cart.findById(cid)
        const product = await Product.findById(pid)
        if (cart == null || product == null) { return res.status(400).json({message: "product or cart null"})}

        const index = cart.products.findIndex(e => e.product == pid)
        if (index == -1) { return res.status(400).json({message: "product not in cart"})}
        if (units > cart.products[index].units) { return res.status(400).json({message: "invalid units"})}

        cart.products[index].units -= units
        if (cart.products[index].units <= 0) {
            cart.products.splice(index, 1)
        }
        product.stock += units
        cart.markModified('products');

        await cart.save()
        await product.save()

        return res.status(200).json({message: "Cart updated"})

    } catch (error) {
        next(error);
    }
}

}

export default new CartController()