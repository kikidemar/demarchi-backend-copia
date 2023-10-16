import { Router } from "express"
import cart_manager from '../../dao/managers/cart.js'

const cart_router = Router()

cart_router.post('/', async(req,res,next)=> {
    try {
        let response = await cart_manager.addCart(req.body)
        if (response===201) {
            return res.json({ status:201,message:'Cart created'})
        }
        return res.json({ status:400,message:'not created'})
    } catch(error) {
        next(error)
    }
})
cart_router.get('/', async(req,res,next)=> {
    try {
        let all = cart_manager.read_carts()
        if (all.length>0) {
            return res.json({ status:200,all })
        }
        let message = 'not found'
        return res.json({ status:404,message })
    } catch(error) {
        next(error)
    }
})
cart_router.get('/:cid', async(req,res,next)=> {
    try {
        let id = Number(req.params.cid)
        let one = cart_manager.read_cart(id)
        if (one) {
            return res.json({ status:200,one })
        }
        let message = 'not found'
        return res.json({ status:404,message })
    } catch(error) {
        next(error)
    }
})
cart_router.put('/:cid', async(req,res,next)=> {
    try {
        let id = Number(req.params.cid)
        let data = req.body
        let response = await cart_manager.update_cart(id,data)
        if (response===200) {
            return res.json({ status:200,message:'Cart updated'})
        }
        return res.json({ status:404,message:'not found'})
    } catch(error) {
        next(error)
    }
})

cart_router.put("/:cid/product/:pid/:units", async (req, res, next) => {
    try {
        let id = Number(req.params.pid);
        let cid = Number(req.params.cid);
        let units = Number(req.params.units);
    
        let response = await cart_manager.update_cart(cid, id, units);
        if (response === 200) {
            return res.json({ status: 200, message: "Cart updated" });
        }
        return res.json({ status: 404, message: "not found" });
        } catch (error) {
        next(error);
        }
    })

cart_router.delete('/:cid', async(req,res,next)=> {
    try {
        let id = Number(req.params.cid)
        let response = await cart_manager.destroy_cart(id)
        if (response===200) {
            return res.json({ status:200,message:'Cart deleted'})
        }
        return res.json({ status:404,message:'not found'})
    } catch(error) {
        next(error)
    }
})

cart_router.delete("/:cid/product/:pid/:units", async (req, res, next) => {
    try {
    let id = Number(req.params.pid);
    let cid = Number(req.params.cid);
    let units = Number(req.params.units);

    let response = await cart_manager.delete_cart(cid, id, units);
    if (response === 200) {
        return res.json({ status: 200, message: "Units Delete" });
    }
    return res.json({ status: 404, message: "not found" });
    } catch (error) {
    next(error);
    }
})


export default cart_router