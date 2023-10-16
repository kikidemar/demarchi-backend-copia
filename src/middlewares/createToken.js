import jwt from "jsonwebtoken"

export default (req,res,next)=> {
    const payload = {
        email: req.body.email,
        cid: req.body.cid,
        role: req.body.role,
        _id: req.body._id
    }
    let token = jwt.sign(
        payload,
        process.env.SECRET_JWT,
        { expiresIn:60*60*24*7 }
    )
    console.log(payload)
    req.token = token
    return next()
}